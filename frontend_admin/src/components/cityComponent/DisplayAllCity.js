import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useMemo, useState } from "react";
import { useStyles } from "./DisplayAllCss";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CityEdit from "./CityEdit";
import CityIconEdit from "./CityIconEdit";
import Swal from "sweetalert2";



export default function DisplayAllCity() {
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [rowData, setRowData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [iconOpenStatus, setIconOpenStatus] = useState(false);

  useEffect(() => {
    fetchCityData();
  }, []);

  useEffect(() => {
    fetchCityData();
  }, [refresh]);



  const fetchCityData = async () => {
    var res = await getData("cities/fetch_all_city");
    if (res.status) {
      setCityList(res.data);
    } else {
      alert(res.message);
    }
  };

  const handleEdit = (row) => {
    // alert(JSON.stringify(row))
    setRowData(row.original)
    setOpenStatus(true)
    // setIconOpenStatus(true)
  }

  const handleDelete = async (row) => {
    // 1. Show the confirmation dialog FIRST
    Swal.fire({
      title: `Are you sure to delete the seleceted city ${row.original.cityname}`,
      icon: 'warning',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',

      showCancelButton: true,

      confirmButtonText: "Delete",
    }).then(async (result) => {
      // 2. Only if the user clicked "Yes, delete it!"
      if (result.isConfirmed) {
        var body = { cityid: row.original.cityid };

        // 3. Make the API call inside this block
        var res = await postData("cities/delete_city", body);

        if (res.status) {
          Swal.fire("Deleted!", `${row.original.cityname} has been deleted.`, "success");
          setRefresh(!refresh); // Trigger list refresh
        } else {
          Swal.fire("Error!", "Failed to delete the city.", "error");
        }
      }
    });
  };

  const handleEditIcon = (row) => {
    // alert(JSON.stringify(row))
    setRowData(row.original)
    // setOpenStatus(true)
    setIconOpenStatus(true)
  }


  const showCity = () => {
    return <MaterialReactTable
      columns={[
        { accessorKey: "cityid", header: "CityId", size: 100 },
        { header: "City Name", accessorKey: "cityname" },
        { header: "Image", Cell: ({ renderedCellValue, row }) => <div><img src={`${serverURL}/images/${row.original.cityicon}`} style={{ width: 40 }} /></div> },
      ]}
      data={cityList}
      renderTopToolbarCustomActions={() => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}>
            <img src="/logo.png" className={classes.imageStyle} />
            <span className={classes.haedingText}>City List</span>

          </div>
        )
      }}
      enableRowActions
      positionActionsColumn="last"

      renderRowActions={({ row, table }) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <Tooltip title="Edit Icon">
              <IconButton onClick={() => handleEditIcon(row)}>
                <img src="image-editing.png" style={{ width: 25 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
              <IconButton onClick={() => handleEdit(row)}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(row)}>
                < DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </div>
        );
      }}
    />;
  };
  return (
    <div className={classes.root}>
      <div className={classes.box}>{showCity()}</div>
      <CityEdit
        refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
        openStatus={openStatus}
        setOpenStatus={setOpenStatus} />
      <CityIconEdit
        refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
        // openStatus={openStatus}
        //  setOpenStatus={setOpenStatus}
        openStatus={iconOpenStatus}
        setOpenStatus={setIconOpenStatus}
      />

    </div>
  );
}


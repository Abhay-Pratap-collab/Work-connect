import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useMemo, useState } from "react";
import { useStyles } from "./DisplayCss";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PlaceEdit from "./PlaceEdit";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import AddIcon from '@mui/icons-material/Add';






export default function DisplayAllCity() {
  const classes = useStyles();
  const [placeList, setPlaceList] = useState([])
  const [openStatus, setOpenStatus] = useState(false);
  
  const [rowData, setRowData] = useState([])
  const [refresh, setRefresh] = useState(false)
    const [cityList,setCityList]= useState([])
    const navigate = useNavigate();
  
      const fetchAllCity = async () => {
          var res = await getData("cities/fetch_all_city")
          setCityList(res.data)
  
      }
  useEffect(()=>{
  fetchAllCity()
  },[])






  useEffect(() => {
    fetchPlaceData()
  }, [])

  const fetchPlaceData = async () => {
    var res = await getData("places/fetch_all_place")
    if (res.status) {
      setPlaceList(res.data)
    }
    else {
      alert(res.message)
    }

  }
  useEffect(() => {
    fetchPlaceData();
  }, [refresh]);



  const handleEdit = (row) => {
    // alert(JSON.stringify(row))
    setRowData(row.original)
    setOpenStatus(true)
    // setIconOpenStatus(true)
  }


  const handleDelete = async (row) => {
    // 1. Show the confirmation dialog FIRST
    Swal.fire({
      title: `Are you sure to delete the seleceted city ${row.original.placename}`,
icon: 'warning',
   confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
      showCancelButton: true,

      confirmButtonText: "Delete",
    }).then(async (result) => {
      // 2. Only if the user clicked "Yes, delete it!"
      if (result.isConfirmed) {
        var body = { placeid: row.original.placeid };

        // 3. Make the API call inside this block
        var res = await postData("places/delete_place", body);

        if (res.status) {
          Swal.fire("Deleted!", `${row.original.placename} has been deleted.`, "success");
          setRefresh(!refresh); // Trigger list refresh
        } else {
          Swal.fire("Error!", "Failed to delete the city.", "error");
        }
      }
    });
  };


  const showPlace = () => {
    return <MaterialReactTable
      columns={[
        { accessorKey: "placeid", header: "PlaceId", size: 100 },
        { accessorKey: "cityname", header: "CityName", size: 100 },
        { header: "Place Name", accessorKey: "placename" },
        { header: "PinCode", accessorKey: "pincode" },

      ]}
      data={placeList}
      renderTopToolbarCustomActions={() => {
        return (
                      <div style={{display:"flex",justifyContent:'space-between',width:'100%',alignItems:'center',marginTop:'-1px'}}>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}>
            {/* <img src="/logo.png" className={classes.imageStyle} /> */}
            <span className={classes.haedingText}>Place List</span>

          </div>
             <IconButton  
                    
                     onClick={() => {
                    // Logic to open a modal or add a row
                      navigate('/dashboard/place')
                  }}
                    >
                       <Tooltip title="Add New Place">
                              <AddIcon />
                              </Tooltip>
          
                    </IconButton>
          </div>
        )
      }}
      enableRowActions
      positionActionsColumn="last"

      renderRowActions={({ row, table }) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <Tooltip title="Edit">
              <IconButton onClick={() => handleEdit(row)}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(row)} >
                < DeleteIcon color="error" />
              </IconButton>
            </Tooltip>


          </div>
        );
      }}
    />;
  };


  return (<div className={classes.placeRoot}>
    <div className={classes.box}>{showPlace()}</div>
    <PlaceEdit
      openStatus={openStatus}
      refresh={refresh}
      setRefresh={setRefresh}
      setOpenStatus={setOpenStatus}
      rowData={rowData}
    />


  </div>)
}
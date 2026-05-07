import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useMemo, useState } from "react";
import { useStyles } from "./DisplayAllCategoryCss";

import { IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryEdit from "./CategoryEdit";
import CategoryIconEdit from "./CategoryIconEdit";
import { useNavigate } from "react-router";
import AddIcon from '@mui/icons-material/Add';


import Swal from "sweetalert2";



export default function DisplayAllCategory() {
  var classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [rowData, setRowData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [iconOpenStatus, setIconOpenStatus] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryData();
  }, []);

  useEffect(() => {
    fetchCategoryData();
  }, [refresh]);



  const fetchCategoryData = async () => {
    var res = await getData("category/fetch_all_category");
    if (res.status) {
      setCategoryList(res.data);
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
      title: `Are you sure to delete the seleceted category ${row.original.categoryname}`,
      icon: 'warning',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',

      showCancelButton: true,

      confirmButtonText: "Delete",
    }).then(async (result) => {
      // 2. Only if the user clicked "Yes, delete it!"
      if (result.isConfirmed) {
        var body = { categoryid: row.original.categoryid };

        // 3. Make the API call inside this block
        var res = await postData("category/delete_category", body);

        if (res.status) {
          Swal.fire("Deleted!", `${row.original.categoryname} has been deleted.`, "success");
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


  const showCategory = () => {
    return <MaterialReactTable
      columns={[
        { accessorKey: "categoryid", header: "CategoryId", size: 100 },
        { header: "CategoryName", accessorKey: "categoryname" },
        { header: "Image", Cell: ({ renderedCellValue, row }) => <div><img src={`${serverURL}/images/${row.original.icon}`} style={{ width: 40 }} /></div> },
      ]}
      data={categoryList}
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
            <span className={classes.haedingText}>Category List</span>

          </div>
           <IconButton  
                    
                     onClick={() => {
                    // Logic to open a modal or add a row
                      navigate('/dashboard/category')
                  }}
                    >
                       <Tooltip title="Add New category">
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
            <Tooltip title="Edit Icon">
              <IconButton onClick={() => handleEditIcon(row)}>
                <img src="/image-editing.png" style={{ width: 25 }} />
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
      <div className={classes.box}>{showCategory()}</div>
      <CategoryEdit
        refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
        openStatus={openStatus}
        setOpenStatus={setOpenStatus} />
      <CategoryIconEdit
        refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
        openStatus={iconOpenStatus}
        setOpenStatus={setIconOpenStatus}
      />

    </div>
  );
}


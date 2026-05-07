import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useMemo, useState } from "react";
import { useStyles } from "./DisplaySubCss";

import { IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SubcategoryEdit from "./SubcategoryEdit";
import SubCategoryIconEdit from "./SubCategoryIconEdit";

import Swal from "sweetalert2";
import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from "react-router";



export default function DisplayAllSubcategory() {
  var classes = useStyles();
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [rowData, setRowData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [iconOpenStatus, setIconOpenStatus] = useState(false);
  const [categoryList, setCategoryList] = useState([])
     const navigate=useNavigate();
  
  const fetchAllCategory = async () => {
    var res = await getData("category/fetch_all_category")
    setCategoryList(res.data)
  }
  useEffect(() => {
    fetchAllCategory()
  }, [])

  useEffect(() => {
    fetchSubcategoryData();
  }, []);

  useEffect(() => {
    fetchSubcategoryData();
  }, [refresh]);



  const fetchSubcategoryData = async () => {
    var res = await getData("subcategory/fetch_all_subcategory");
    if (res.status) {
      setSubcategoryList(res.data);
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
      title: `Are you sure to delete the seleceted subcategory ${row.original.subcategoryname}`,
      icon: 'warning',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',

      showCancelButton: true,

      confirmButtonText: "Delete",
    }).then(async (result) => {
      // 2. Only if the user clicked "Yes, delete it!"
      if (result.isConfirmed) {
        var body = { subcategoryid: row.original.subcategoryid };

        // 3. Make the API call inside this block
        var res = await postData("subcategory/delete_subcategory", body);

        if (res.status) {
          Swal.fire("Deleted!", `${row.original.subcategoryname} has been deleted.`, "success");
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


  const showSubcategory = () => {
    return <MaterialReactTable
      columns={[
        { accessorKey: "subcategoryid", header: "Subid", size: 100 },
        { accessorKey: "categoryname", header: "CategoryName", size: 100 },
        { header: "SubCategoryName", accessorKey: "subcategoryname" },
        { header: "Image", Cell: ({ renderedCellValue, row }) => <div><img src={`${serverURL}/images/${row.original.icon}`} style={{ width: 40 }} /></div> },
      ]}
      data={subcategoryList}
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
            <span className={classes.haedingText}>SubCategory List</span>

          </div>
          <IconButton  
                    
                     onClick={() => {
                    // Logic to open a modal or add a row
                      navigate('/dashboard/subcategory')
                  }}
                    >
                       <Tooltip title="Add New Subcategory">
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
      <div className={classes.box}>{showSubcategory()}</div>
      <SubcategoryEdit
        refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
        openStatus={openStatus}
        setOpenStatus={setOpenStatus}
      />
      <SubCategoryIconEdit
        refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
        openStatus={iconOpenStatus}
        setOpenStatus={setIconOpenStatus}
      />




    </div>
  );
}


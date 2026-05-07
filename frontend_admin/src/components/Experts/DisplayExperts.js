import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useMemo, useState } from "react";
import { useStyle } from "./DisplayExpertsCss";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import ExpertEdit from "./ExpertsEdit";
import ExpertIconEdit from "./ExpertsIconEdit";
// import PanExperts from "./PanExperts";
import DocumentEdit from "./DocumentEdit";
import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from "react-router";
export default function DisplayExpert() {
  var classes = useStyle();
  const [openStatus, setOpenStatus] = useState(false);
  // const [panStatus, setPanOpenStatus] = useState(false);
  // const [adharstatus,setAdharOpenStatus]=useState(false)
  const [document, setDocumentOpenStatus] = useState(false)
  const [rowData, setRowData] = useState([])
  // const [adharData, setAdharData] = useState([])

  const [refresh, setRefresh] = useState(false)
  const [iconOpenStatus, setIconOpenStatus] = useState(false);
  const [expertsList, setExpertsList] = useState([])
     const navigate=useNavigate();
  
  useEffect(() => {
    fetchExpertsData()
  }, []);
  useEffect(() => {
    fetchExpertsData()
  }, [refresh]);



  const fetchExpertsData = async () => {
    const res = await getData("experts/fetch_experts");
    if (res && res.status) { // Check if res exists before checking .status
      setExpertsList(res.data);
    } else {
      console.error("Fetch failed or server down");
      setExpertsList([]); // Keep list empty instead of crashing
    }
  };
  const handleEdit = (row) => {
    // alert(JSON.stringify(row))
    setRowData(row.original)
    setOpenStatus(true)
    // setIconOpenStatus(true)
  }
  const handleEditIcon = (row) => {
    // alert(JSON.stringify(ro  w))
    setRowData(row.original)
    setIconOpenStatus(true)

  }

  const handleEditDocument = (row) => {
    setRowData(row.original);
    setDocumentOpenStatus(true); // Opens only the Pan dialog
  };



  const handleDelete = async (row) => {
    // 1. Show the confirmation dialog FIRST
    Swal.fire({
      title: `Are you sure to delete the seleceted name ${row.original.firstname} ${row.original.lastname}`,
      icon: 'warning',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',

      showCancelButton: true,

      confirmButtonText: "Delete",
    }).then(async (result) => {
      // 2. Only if the user clicked "Yes, delete it!"
      if (result.isConfirmed) {
        var body = { expertsid: row.original.expertid };

        // 3. Make the API call inside this block
        var res = await postData("experts/delete_experts", body);

        if (res.status) {
          Swal.fire("Deleted!", `${row.original.firstname} has been deleted.`, "success");
          setRefresh(!refresh); // Trigger list refresh
        } else {
          Swal.fire("Error!", "Failed to delete the city.", "error");
        }
      }
    });
  };


  const showExperts = () => {
    return <MaterialReactTable
      columns={[
        { accessorKey: "expertid", header: "expertsId", size: 10 },
        {
          header: "Category/Subcategory",
          accessorFn: (row) => `${row.categoryname} / ${row.subcategoryname}`,
          id: "category", size: 30
        },

        {
          header: "Full Name",
          accessorFn: (row) => `${row.firstname}  ${row.lastname}`,
          id: "name", size: 30
        },


        {
          header: "Contact",
          accessorFn: (row) => `${row.mobileno} ${row.emailid}`,

          id: "contact"
        },
        // { header: "fathername", accessorKey: "fathername" },
        { header: "Gender", accessorKey: "gender",size: 10 },
        // { header: "AdharID", accessorKey: "adharid" },
        // { header: "PanID", accessorKey: "panid" },
        // { header: "vehicleid", accessorKey: "vehicleid" },
        // { header: "vehicleType", accessorKey: "vehicletype" },
        // { header: "licenseid", accessorKey: "licenseid" },
        // { header: "Current State", accessorKey: "currentstatename" },
        // { header: "Current City", accessorKey: "currentcityname" },
        // { header: "Permanent State", accessorKey: "permanentstatename" },
        // { header: "Permanent City", accessorKey: "permanentcityname" },

        // { header: "Aadhar", Cell: ({ renderedCellValue, row }) => <div><img src={`${serverURL}/images/${row.original.adharicon}`} style={{ width: 40 }} /></div> },
        {
          header: "Photograpgh",size: 10,
          Cell: ({ row }) => (
            <Tooltip title="Click to Change Photo">
              <IconButton onClick={() => handleEditIcon(row)}>
                <img
                  src={`${serverURL}/images/${row.original.photograph}`}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%', // Optional: makes it a circle
                    cursor: 'pointer',
                    border: '1px solid #ddd'
                  }}
                  alt="Expert"
                />
              </IconButton>
            </Tooltip>
          )
        },


      ]
      }


      data={expertsList}
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
            <span className={classes.haedingText}>Experts List</span>

          </div>
           <IconButton  
                    
                     onClick={() => {
                    // Logic to open a modal or add a row
                      navigate('/dashboard/expert')
                  }}
                    >
                       <Tooltip title="Add New Experts">
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
          <div style={{ display: "flex", gap: "2px" }}>
            <Tooltip title="Edit Icon" onClick={() => handleEditDocument(row)}>
              <IconButton >
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
      <div className={classes.box}>{showExperts()}</div>
      <ExpertEdit
        refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
        openStatus={openStatus}
        setOpenStatus={setOpenStatus}
      />



      <DocumentEdit
        refresh={refresh}
        setRefresh={setRefresh}
        openStatus={document}
        setOpenStatus={setDocumentOpenStatus}
        rowData={rowData}


      />
      <ExpertIconEdit
        refresh={refresh}
        setRefresh={setRefresh}
        openStatus={iconOpenStatus}
        setOpenStatus={setIconOpenStatus}
        rowData={rowData}


      />





    </div>

  )
}
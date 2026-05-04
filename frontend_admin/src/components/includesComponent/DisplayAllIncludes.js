import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import { getData, postData } from '../../services/FetchNodeServices';
import { useEffect, useState } from "react";
import { useStyle } from './DisplayAllIncludesCss';
import {Box,Typography,IconButton,Tooltip} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIncludes from './EditInclude';
import Swal from 'sweetalert2';


export default function DisplayAllIncludes(){

    const [includeList,setIncludeList] = useState([])
    const [openStatus,setOpenStatus] = useState(false)
    const [rowData,setRowData] = useState({})
    const [refresh,setRefresh] = useState(false)
    const classes =useStyle(); 

    useEffect(()=>{
        fetchIncludeData()
    },[])

    useEffect(()=>{
        fetchIncludeData()
    },[refresh])

    const fetchIncludeData = async()=>{
        let res = await getData("includes/fetch_all_includes")
        if(res.status){
            setIncludeList(res.data)
            console.log(res.data)
        }
        else{
            alert(res.message)
            console.log(res.error)
        }
    }
    const handleEdit=(row)=>{
        setOpenStatus(true)
        setRowData(row.original)
        console.log(row.original)
    }
    const handleDelete= async(row)=>{
        var body = {"includeid": row.original.includeid}
        console.log("IncludeId:",body.includeid)

        
            Swal.fire({
                title: `Are you sure to delete ${row.original.includeid} `,
                showCancelButton: true,
                confirmButtonText: "Delete"
            }).then(async(result)=>{
                if(result.isConfirmed){
                    var res = await postData('includes/delete_includes', body)
                    Swal.fire(` deleted successfully`, "success")
                    setRefresh(!refresh)
                }
                
            }) 
        setRowData(row.original)
        
    }

const columns=[
  {accessorKey: "includeid", header:'Include Id',size:100 },
  {accessorKey: "categoryname", header:'Category Name',size:100 },
  {accessorKey: "subcategoryname", header:'SubCategory Name',size:100 },
  {accessorKey: "include", header:'Include',size:100 },
  {accessorKey: "exclude", header:'Exclude',size:100 },
]

const tabel = useMaterialReactTable({
    renderTopToolbarCustomActions:()=>{
        return(<Typography variant='h6' >
            <img className={classes.imageStyle} src="/logo.png" alt="logo" />
            <span className={classes.headingText}>Include List</span>
        </Typography>)
    },
    columns,
    data:includeList,
    enableRowActions:true,
    positionActionsColumn:'last',
    renderRowActions:({row,table})=>{
        return(<Box style={{display:'felx'}} >
            <Tooltip title="Edit">
                <IconButton onClick={()=>handleEdit(row)} >
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton color="error" onClick={()=>handleDelete(row)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Box>)
    }
})
 
const showInclude=()=>{
    return(
        <MaterialReactTable table={tabel} />
    )
}

return(<div className={classes.rootedit}>
    <div className={classes.boxedit} >{showInclude()}</div>
    <div><EditIncludes 
    refresh={refresh} 
     setRefresh={setRefresh} 
     rowData={rowData} 
     openStatus={openStatus} 
     setOpenStatus={setOpenStatus} 
     /></div>
</div>)





}
import { Dialog,DialogContent } from "@mui/material"
import { FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button } from "@mui/material";
import {useStyles} from './EditIncludeCss'
import { useEffect, useState } from "react";
import { getData,postData } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


export default function EditIncludes({refresh, setRefresh ,rowData, openStatus, setOpenStatus }) {

    const classes = useStyles()

    const [includeId,setIncludeId] = useState()
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [includes, setIncludes] = useState('')
    const [excludes, setExcludes] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [error, setError] = useState({})

    useEffect(() => {
        fetchAllCategory()
    }, [])
    // useEffect(() => {
    //     fetchAllSubCategory()
    // }, [categoryId])

    useEffect(()=>{
        setIncludeId(rowData.includeid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setIncludes(rowData.include)
        setExcludes(rowData.exclude)
       if(rowData.categoryid) {
            fetchAllSubCategory(rowData.categoryid)
        }
    },[rowData])

    const fetchAllCategory = async () => {
        var res = await getData('category/fetch_all_category');
        // console.log("API Response:", res?.data);
        setCategoryList(res.data)
    }

    // const fetchAllSubCategory = async (cid) => {
    //     var res = await getData(`includes/fetch_all_subcategory?categoryid=${cid?cid:categoryId}`);
    //     console.log("API Response:", res?.data);
    //     setSubCategoryList(res.data)
    // }
   const fetchAllSubCategory = async (cid) => {
       var res = await getData(`subcategory/fetch_all_subcategory_by_id?categoryid=${cid}`)
       setSubCategoryList(res.data)
     }

    const handleCategory=(e)=>{
         setCategoryId(e.target.value)
        fetchAllSubCategory(e.target.value)
        //  setSubCategoryId('');

    }

    const fillCategory = () => {
        return categoryList?.map((item) => {
            return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }


    const fillSubCategory = () => {
        return subCategoryList?.map((item) => {
            return <MenuItem key={item.subcategoryid} value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }


    const handleEdit = async () => {

        var status = validate();

        if (status === false) {

            var body = { "includeid":includeId,"categoryid": categoryId,"subcategoryid":subCategoryId, "include": includes, "exclude":excludes }

            var res = await postData('includes/edit_includes', body)
            console.log(res)

            if (res.status) {
                setOpenStatus(false)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                })
                setOpenStatus(false)
                setRefresh(!refresh)

            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            }
        }

    }

    const validate = () => {
        var error = false

        if (!categoryId) {
            handleError("categoryId", "Category Shouldn't be blank")
            error = true
        }
        if (!subCategoryId) {
            handleError("subcategory", "SubCategory Shouldn't be blank")
            error = true
        }
        if (!includes) {
            handleError("includes", "Includes Shouldn't be blank")
            error = true
        }
        if (!excludes) {
            handleError("exclude", "Exclude Shouldn't be blank")
            error = true
        }
        return error

    }

    const handleReset = () => {
        setCategoryId('')
        setSubCategoryId('')
        setIncludes('')
        setExcludes('')
    }

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))

    }

    const handleClose=()=>{
        setOpenStatus(false)
    }


return (
<Dialog open={openStatus} onClose={handleClose} >
<div className={classes.root}>
    <div className={classes.boxedit}>

        <div className={classes.headingedit}>
            <img className={classes.imageStyle} src="./logo.png" alt="logo" />
            <span className={classes.headingText}>Edit Include</span>
        </div>

        <div className={classes.grids} >
            <Grid spacing={2} container>

                <Grid size={12}> 
                    <FormControl fullWidth error={error.cityId}>
                        <InputLabel>Category Code</InputLabel>
                        <Select value={categoryId} label="Category Code" 
                        onChange={
                           handleCategory
                        } 
                        onFocus={() => handleError('categoryid', '')}
                        >
                            <MenuItem >-Select Category-</MenuItem>
                            {fillCategory()}
                        </Select>
                        <span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 14, marginTop: 5 }}>
                            {error.categoryid}
                        </span>
                    </FormControl>
                </Grid>

                <Grid size={12}> 
                    <FormControl fullWidth error={error.cityId}>
                        <InputLabel>SubCategory Code</InputLabel>
                        <Select value={subCategoryId} label="SubCategory Code" onChange={(e) => setSubCategoryId(e.target.value)} onFocus={() => handleError('subcategoryid', '')}
                        >
                            <MenuItem >-Select SubCategory-</MenuItem>
                            {fillSubCategory()}
                        </Select>
                        <span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 14, marginTop: 5 }}>
                            {error.categoryid}
                        </span>
                    </FormControl>
                </Grid>

                <Grid size={12}>
                    <TextField
                        onFocus={() => handleError('includes', '')}
                        helperText={error.includes}
                        error={error.includes}
                        value={includes}
                        label="Includes"
                        variant="outlined"
                        onChange={(e) => setIncludes(e.target.value)}
                        fullWidth>
                    </TextField>
                </Grid>

                <Grid size={12}>
                    <TextField
                        onFocus={() => handleError('excludes', '')}
                        helperText={error.excludes}
                        error={error.excludes}
                        value={excludes}
                        label="excludes"
                        variant="outlined"
                        onChange={(e) => setExcludes(e.target.value)}
                        fullWidth>
                    </TextField>
                </Grid>

                <Grid className={classes.btns} size={6}>
                    <Button className={classes.btgrid} variant="contained" onClick={handleEdit}>Edit</Button>
                </Grid>
                <Grid className={classes.btns} size={6}>
                    <Button className={classes.btgrid} variant="contained" onClick={handleClose}>Close</Button>
                </Grid>

            </Grid>
        </div>
    </div>
</div>
</Dialog>
)
}
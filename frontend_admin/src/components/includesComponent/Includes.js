import { useStyle } from "../includesComponent/IncludesCss";
import { useState, useEffect, useDebugValue } from "react";
import { TextField, Button, Grid, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { getData, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill-new';
import { useNavigate } from "react-router";

import 'react-quill-new/dist/quill.snow.css';


export default function Includes() {
    const classes = useStyle();


    const [categoryid, setCategoryId] = useState('')
    const [subcategoryid, setSubCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryList, setSubcategoryList] = useState([])
    const [includes, setIncludes] = useState('')
    const [excludes, setExcludes] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
        var navigate = useNavigate()
    




    // fetch category 
    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_all_category")
        setCategoryList(res.data)
    }
    const fetchAllSubcategory = async (cid) => {
        var res = await getData(`subcategory/fetch_all_subcategory_by_id?categoryid=${cid}`)
        setSubcategoryList(res.data)
    }

    useEffect(() => {
        fetchAllCategory()
    }, [])


    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

        })
    }
    const fillSubcategory = () => {
        return subcategoryList.map((item) => {
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const handleCategory = (e) => {
        setCategoryId(e.target.value)
        fetchAllSubcategory(e.target.value)

    }
    //end 

    const handleReset = () => {
        setCategoryId('')
        setSubCategoryId('')
        setIncludes('')
        setExcludes('')


    }
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))



    }
    const validate = () => {
        var error = true
        if (!categoryid) {
            handleError('categoryid', 'not empty')
            error = false

        }
        if (!subcategoryid) {
            handleError('subcategoryid', 'not empty')
            error = false

        }
        if (includes.trim().length == 0) {
            handleError('include', 'not empty')
            error = false

        }
        if (excludes.trim().length == 0) {
            handleError('exclude', 'not empty')
            error = false

        }
        return error
    }
    const handleSubmit = async () => {
        var status = validate()
        if (status == true) {
            setLoading(true)   // show loading

            var body = { categoryid, subcategoryid, includes, excludes }
            var res = await postData("includes/fetch_include", body)
            if (res.status) {
                Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                })

                setLoading(false)
            }


            else {
                // If error
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }

        handleReset()
    }



    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <div className={classes.heading}>
                    <div className={classes.headingGroupStyle}>

                        {/* Logo */}
                        <img src="/logo.png" className={classes.imageStyle} />

                        {/* Title */}
                        <span className={classes.haedingText}>Includes</span>
                                   <img onClick={() => navigate('/dashboard/displayallincludes')} src="/report.png" className={classes.imageStyle} />


                        {/* Navigate to display page */}
                        {/* <img onClick={() => navigate('/displayallcity')} src="/report.png" className={classes.imageStyle} /> */}

                    </div>
                </div>
                <div style={{ margin: 10, width: "96.5%" }}>
                    <Grid spacing={2} container>
                        <Grid size={12}>
                            <FormControl fullWidth>
                                <InputLabel>Category Code</InputLabel>
                                <Select label="Category Code" onChange={handleCategory} value={categoryid}>
                                    <MenuItem>--select category --</MenuItem>
                                    {fillCategory()}
                                </Select>
                                <span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 14, marginTop: 5 }}>
                            {error.categoryid}
                        </span>
                            </FormControl>


                        </Grid>
                        <Grid size={12}>
                            <FormControl fullWidth>
                                <InputLabel>SubCategory Code</InputLabel>
                                <Select label="SubCategory Code" value={subcategoryid} onChange={(e) => setSubCategoryId(e.target.value)}>
                                    <MenuItem>--select subcategory --</MenuItem>
                                    {fillSubcategory()}
                                </Select>
                                  <span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 14, marginTop: 5 }}>
                            {error.subcategoryid}
                        </span>
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                          <ReactQuill theme="snow" value={includes} onChange={(e)=>setIncludes(e)} />
                            
                           
                        </Grid>
                        <Grid size={12}>
                                                <ReactQuill theme="snow" value={excludes} onChange={(e)=>setExcludes(e)} />
                          
                        </Grid>

                        <Grid size={6} className={classes.centerStyle}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit}

                                loading={loading}
                            >
                                Save

                            </Button>

                        </Grid>

                        <Grid size={6} className={classes.centerStyle}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleReset}


                            >
                                Reset

                            </Button>
                        </Grid>

                    </Grid>



                </div>
            </div>
        </div>


    )
}
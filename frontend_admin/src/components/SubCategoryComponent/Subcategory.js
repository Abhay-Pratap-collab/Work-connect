import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import { SubcategoryCss } from "./SubcategoryCss";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router";
export default function Subcategory() {
    const classes = SubcategoryCss()
    const [categoryid, setCategoryId] = useState('')
    const [subcategoryname, setSubcategoryname] = useState('')
    const [subcategoryIcon, setSubategoryIcon] = useState({ file: 'image-editing.png', bytes: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ subcategoryIcon: '', subcategoryname: '' })
    var navigate = useNavigate()
    const [categoryList, setCategoryList] = useState([])
    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_all_category")
        setCategoryList(res.data)
    }
    useEffect(() => {
        fetchAllCategory()
    }, [])

    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleImage = (e) => {
        setSubategoryIcon({
            file: URL.createObjectURL(e.target.files[0]),
            bytes: e.target.files[0]
        })
        handleError('subcategoryIcon', '')
    }


    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
        console.log('Error', error) // debugging
    }

    const resetData = () => {
        setCategoryId('')
        setSubategoryIcon({ file: 'image-editing.png', bytes: "" })
        setSubcategoryname('')
    }


    const validate = () => {
        var error = true
        if (categoryid == 0) {
            handleError('categoryid', "Category nmae should not blank...")
            error = false
        }
        else if (subcategoryname.trim().length == 0) {
            handleError('subcategoryname', "Oops! We need a city name to move forward.")
            error = false
        }
        else if (!subcategoryIcon.bytes) {
            handleError("subcategoryIcon", "Choose subCategory image...")
            error = false
        }
        return error
    }

    const submitData = async () => {
        var status = validate()
        if (status == true) {
            setLoading(true);
            var body = new FormData()
            body.append("categoryid", categoryid)
            body.append("subcategoryname", subcategoryname)
            body.append("icon", subcategoryIcon.bytes)
            var res = await postData('subcategory/add_new_subcategory', body)
            if (res && res.status) {
                Swal.fire({
                    icon: "success",
                    title: "your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                })
                setLoading(false);
                resetData();
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Server error or connection failed"
                });
                setLoading(false);
            }
        }

    }



    return (<div className={classes.root}>
        <div className={classes.box}>
            <div className={classes.heading}>
                <div className={classes.headingGroupStyle}>
                    <img src="/logo.png" className={classes.imageStyle} />
                    <span className={classes.haedingText}>SubCategory Interface</span>
                    <img onClick={() => navigate('/displaysubcategory')} src="/report.png" className={classes.imageStyle} />
                </div>
            </div>
            <div style={{ margin: 10, width: "96.5%" }}>
                <Grid spacing={2} container>
                    <Grid size={12} >
                        <FormControl fullWidth error={!!error.categoryid}>
                            <InputLabel>Category Code</InputLabel>
                            <Select label="City Code" value={categoryid} onChange={(e) => { setCategoryId(e.target.value); handleError('categoryid', '') }}>
                                <MenuItem>--Select SubCategory--</MenuItem>
                                {fillCategory()}
                            </Select>
                        </FormControl>



                    </Grid>

                    <Grid size={12} >
                        <TextField
                            fullWidth
                            onFocus={() => handleError('subcategoryname')}
                            helperText={error.subcategoryname}
                            error={error.subcategoryname}
                            value={subcategoryname}
                            onChange={(e) => setSubcategoryname(e.target.value)}
                            label="subcategoryname"
                            variant="outlined"
                        >

                        </TextField>

                    </Grid>

                    <Grid size={6} className={classes.centerStyle}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} >
                            Upload SubCategory Image
                            <input
                                multiple
                                onChange={handleImage}
                                type="file"
                                hidden
                                accept="image/png"
                            >
                            </input>
                        </Button>
                        <span className={classes.errorTextStyle}>
                            {error.subcategoryIcon}
                        </span>

                    </Grid>
                    <Grid size={6} className={classes.centerStyle}>
                        <img src={subcategoryIcon.file} className={classes.imageStyle} />

                    </Grid>

                    <Grid size={6} className={classes.centerStyle}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={submitData}
                            loading={loading}
                        >
                            Save

                        </Button>

                    </Grid>

                    <Grid size={6} className={classes.centerStyle}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={resetData}

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

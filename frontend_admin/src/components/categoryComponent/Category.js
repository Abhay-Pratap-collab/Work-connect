import { Grid, TextField, Button } from "@mui/material";
import { CategoryCss } from "./CategoryCss";
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import { postData } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router";
export default function Category() {
    const classes = CategoryCss();
    const [categoryname, setCategoryname] = useState('')
    const [categoryIcon, setCategoryIcon] = useState({ file: '/image-editing.png', bytes: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ categoryIcon: '', categoryname: '' })
    var navigate = useNavigate()


    const handleImage = (e) => {
        setCategoryIcon({
            file: URL.createObjectURL(e.target.files[0]),
            bytes: e.target.files[0]
        })
        handleError('categoryIcon', '')
    }


    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
        console.log('Error', error)
    }

    const resetData = () => {
        setCategoryIcon({ file: "image-editing.png", bytes: "" })
        setCategoryname('')
    }


    const validate = () => {
        var error = true
        if (categoryname.trim().length == 0) {
            handleError('categoryname', "Oops! We need a city name to move forward.")
            error = false
        }
        if (!categoryIcon.bytes) {
            handleError("categoryIcon", "Choose Category image...")
            error = false
        }
        return error
    }

    const submitData = async () => {
        var status = validate()
        if (status == true) {
            setLoading(true);
            var body = new FormData()
            body.append("categoryname", categoryname)
            body.append("icon", categoryIcon.bytes)
            var res = await postData('category/add_new_category', body)
            if (res.status) {
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
                    <span className={classes.haedingText}>Category Interface</span>
                    <img onClick={() => navigate('/dashboard/displayallcategory')} src="/report.png" className={classes.imageStyle} />
                </div>
            </div>
            <div style={{ margin: 10, width: "96.5%" }}>
                <Grid spacing={2} container>

                    <Grid size={12} >
                        <TextField
                            fullWidth
                            onFocus={() => handleError('categoryname', '')}
                            helperText={error.categoryname}
                            error={error.categoryname}
                            value={categoryname}
                            onChange={(e) => setCategoryname(e.target.value)}
                            label="category name"
                            variant="outlined"
                        >

                        </TextField>

                    </Grid>

                    <Grid size={6} className={classes.centerStyle}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} >
                            Upload Category Image
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
                            {error.cityIcon}
                        </span>

                    </Grid>
                    <Grid size={6} className={classes.centerStyle}>
                        <img src={categoryIcon.file} className={classes.imageStyle} />

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

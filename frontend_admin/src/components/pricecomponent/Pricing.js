import { PriceCss } from "./PriceCss"
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Swal from "sweetalert2";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router";
export default function Pricing() {
    const classes = PriceCss()
    var navigate = useNavigate()
    const [categoryid, setCategoryId] = useState('')
    const [subCategoryid, setSubCategoryid] = useState('')
    const [subcategoryList, setSubCategoryList] = useState([])
    const [typeofservuce, setTypeOfService] = useState('')
    const [timeservice, setTimeService] = useState('')
    const [picture, setPicture] = useState({ file: '/image-editing.png', bytes: '' })
    const [amount, setAmount] = useState('')
    const [offer, setOffer] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
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

    const fetchAllSubCategory = async (cid) => {
        var res = await getData(`subcategory/fetch_all_subcategory_by_id?categoryid=${cid}`)
        setSubCategoryList(res.data)


    }


    const fillSubCategory = () => {
        return subcategoryList.map((item) => {
            return <MenuItem value={item.subcategoryid}>
                {item.subcategoryname}
            </MenuItem>
        })
    }
    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value)
        fetchAllSubCategory(e.target.value)
    }


    const resetData = () => {
        setCategoryId('')
        setSubCategoryid('')
        setAmount('')
        setOffer('')
        setTypeOfService('')
        setTimeService('')
        setPicture({ file: 'image-editing.png', bytes: "" })
    }

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
        console.log('Error', error) // debugging
    }

    const handleImage = (e) => {
        setPicture({
            file: URL.createObjectURL(e.target.files[0]),
            bytes: e.target.files[0]
        })
        handleError('picture', '')
    }


    const validate = () => {
        var error = true
        if (categoryid == 0) {
            handleError('categoryid', "Category nmae should not blank...")
            error = false
        }
        else if (subCategoryid == 0) {
            handleError('subcategoryid', "Oops! We need a city name to move forward.")
            error = false
        }
        else if (!picture.bytes) {
            handleError("picture", "Choose subCategory image...")
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
            body.append("subcategoryid", subCategoryid)
            body.append("typeofservice", typeofservuce)
            body.append("amount", amount)
            body.append("offer", offer)
            body.append("picture", picture.bytes)
            var res = await postData('price/add_new_price', body)
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





    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <div className={classes.heading}>
                    <div className={classes.headingGroupStyle} >
                        <img src="/logo.png" className={classes.imageStyle} />
                        <span className={classes.haedingText}>Price Interface</span>
                        <img onClick={() => navigate('/dashboard/displayprice')} src="/report.png" className={classes.imageStyle} />
                    </div>
                </div>
                <div style={{ margin: 10, width: "96.5%" }}>
                    <Grid spacing={2} container>
                        <Grid size={12} >
                            <FormControl fullWidth >
                                <InputLabel>Category Code</InputLabel>
                                <Select label="City Code" value={categoryid} onChange={handleCategoryChange}>
                                    <MenuItem>--Select Category--</MenuItem>
                                    {fillCategory()}
                                </Select>

                            </FormControl>

                        </Grid>
                        <Grid size={12} >
                            <FormControl fullWidth>
                                <InputLabel>SubCategory Code</InputLabel>
                                <Select label="subcategory Code" value={subCategoryid} onChange={(e) => { setSubCategoryid(e.target.value); }}>
                                    <MenuItem>--Select SubCategory--</MenuItem>
                                    {fillSubCategory()}
                                </Select>
                            </FormControl>



                        </Grid>
                        <Grid size={12} >
                            <TextField variant="outlined"
                                fullWidth
                                label="typeofservice"
                                value={typeofservuce}
                                onChange={(e) => setTypeOfService(e.target.value)}
                            >
                            </TextField>
                        </Grid>
                        <Grid size={6} >
                            <TextField variant="outlined"
                                fullWidth
                                label="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}

                            >

                            </TextField>
                        </Grid>
                        <Grid size={6} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Offers"
                                value={offer}
                                onChange={(e) => setOffer(e.target.value)}

                            >


                            </TextField>
                        </Grid>
                        <Grid size={12} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="time"
                                value={timeservice}
                                onChange={(e) => setTimeService(e.target.value)}

                            >
                            </TextField>
                        </Grid>
                        <Grid size={6} className={classes.centerStyle}>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} >
                                Upload Image
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
                            <img src={picture.file} className={classes.imageStyle} />

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
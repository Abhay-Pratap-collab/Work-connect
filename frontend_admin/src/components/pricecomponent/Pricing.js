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
    const [typeofservice, setTypeOfService] = useState('')
    const [timeservice, setTimeService] = useState('')
    const [picture, setPicture] = useState({ file: '/image-editing.png', bytes: '' })
    const [amount, setAmount] = useState('')
    const [offer, setOffer] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        categoryid: '',
        subcategoryid: '',
        typeofservice: '',
        amount: '',
        offer: '',
        timeservice: '',
        picture: ''
    })
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
        handleError('categoryid', '')
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

        if (!categoryid) {
            handleError('categoryid', "Category name should not be blank...")
            error = false
        }
        if (!subCategoryid) {
            handleError('subcategoryid', "Oops! We need a subcategory name to move forward.")
            error = false
        }
        if (!typeofservice.trim()) {
            handleError('typeofservice', "Type of service is required.")
            error = false
        }
        if (!amount.trim()) {
            handleError('amount', "Amount field cannot be blank.")
            error = false
        }
        if (!timeservice.trim()) {
            handleError('timeservice', "Service time frame is required.")
            error = false
        }
        if (!picture.bytes) {
            handleError("picture", "Please choose a pricing interface image...")
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
            body.append("typeofservice", typeofservice)
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
                        <img src="/wt.jpg" className={classes.imageStyle} />
                        <span className={classes.haedingText}>Price Interface</span>
                        <img onClick={() => navigate('/dashboard/displayprice')} src="/report.png" className={classes.imageStyle} />
                    </div>
                </div>
                <div style={{ margin: 10, width: "96.5%" }}>
                    <Grid spacing={2} container>
                        <Grid size={12} >
                            <FormControl fullWidth error={!!error.categoryid}>
                                <InputLabel>Category Code</InputLabel>
                                <Select label="City Code" value={categoryid} onChange={handleCategoryChange} >
                                    <MenuItem>--Select Category--</MenuItem>
                                    {fillCategory()}
                                </Select>

                            </FormControl>

                        </Grid>
                        <Grid size={12} >
                            <FormControl fullWidth error={!!error.subcategoryid}>
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
                                helperText={error.typeofservice} // show error text
                                error={error.typeofservice} // highlight error
                                value={typeofservice}
                                label="typeofservice"
                                value={typeofservice}
                                onFocus={() => handleError('typeofservice', '')}
                                onChange={(e) => setTypeOfService(e.target.value)}
                            >
                            </TextField>
                        </Grid>
                        <Grid size={6} >
                            <TextField variant="outlined"
                                fullWidth
                                label="Amount"
                                value={amount}
                                error={!!error.amount}
                                helperText={error.amount}
                                onFocus={() => handleError('amount', '')}
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
                                error={!!error.timeservice}
                                helperText={error.timeservice}
                                value={timeservice}
                                onFocus={() => handleError('timeservice', '')}
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
                                {error.picture}
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
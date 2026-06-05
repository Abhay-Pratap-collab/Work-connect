

import { PriceCss } from "./PriceCss"
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import Swal from "sweetalert2";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

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
    const [discription, setDiscription] = useState('')
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({})

    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_all_category")
        setCategoryList(res.data)
    }

    useEffect(() => {
        fetchAllCategory()
    }, [])

    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const fetchAllSubCategory = async (cid) => {
        var res = await getData(`subcategory/fetch_all_subcategory_by_id?categoryid=${cid}`)
        setSubCategoryList(res.data)
    }

    const fillSubCategory = () => {
        return subcategoryList.map((item) => {
            return <MenuItem key={item.subcategoryid} value={item.subcategoryid}>
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
        setDiscription('')
        setPicture({ file: '/image-editing.png', bytes: "" })
        setError({})
    }

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPicture({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0]
            })
            handleError('picture', '')
        }
    }


    const validate = () => {
        let isValid = true
        let currentErrors = {}

        if (!categoryid) {
            currentErrors.categoryid = "Category name should not be blank..."
            isValid = false
        }
        if (!subCategoryid) {
            currentErrors.subcategoryid = "Oops! We need a subcategory name to move forward."
            isValid = false
        }
        if (!typeofservice.trim()) {
            currentErrors.typeofservice = "Type of service is required."
            isValid = false
        }
        if (!amount.trim()) {
            currentErrors.amount = "Amount field cannot be blank."
            isValid = false
        }
        if (!timeservice.trim()) {
            currentErrors.timeservice = "Service time frame is required."
            isValid = false
        }

        // Clean HTML tags check for ReactQuill content
        const cleanDescription = discription ? discription.replace(/<(.|\n)*?>/g, '').trim() : '';
        if (!cleanDescription || discription === '<p><br></p>') {
            currentErrors.discription = "Please fill out the description."
            isValid = false
        }

        if (!picture.bytes) {
            currentErrors.picture = "Please choose a pricing interface image..."
            isValid = false
        }

        setError(currentErrors)
        return isValid
    }

    const submitData = async () => {
        var status = validate()
        if (status === true) {
            setLoading(true);
            var body = new FormData()
            body.append("categoryid", categoryid)
            body.append("subcategoryid", subCategoryid)
            body.append("typeosfservices", typeofservice)
            body.append("amount", amount)
            body.append("offer", offer)
            body.append("time_services", timeservice)
            body.append('discription', discription)
            body.append("picture", picture.bytes)

            var res = await postData('pricing/add_new_price', body)
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
            } else {
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
                        <img src="/wt.jpg" className={classes.imageStyle} alt="icon" />
                        <span className={classes.haedingText}>Price Interface</span>
                        <img onClick={() => navigate('/dashboard/displayprice')} src="/report.png" className={classes.imageStyle} alt="report" style={{ cursor: 'pointer' }} />
                    </div>
                </div>
                <div style={{ margin: 10, width: "96.5%" }}>
                    <Grid spacing={2} container>
                        {/* Category Dropdown */}
                        <Grid size={12} >
                            <FormControl fullWidth error={!!error.categoryid}>
                                <InputLabel>Category Code</InputLabel>
                                <Select label="Category Code" value={categoryid} onChange={handleCategoryChange} >
                                    <MenuItem value="">--Select Category--</MenuItem>
                                    {fillCategory()}
                                </Select>
                                {error.categoryid && <FormHelperText>{error.categoryid}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        {/* SubCategory Dropdown */}
                        <Grid size={12} >
                            <FormControl fullWidth error={!!error.subcategoryid}>
                                <InputLabel>SubCategory Code</InputLabel>
                                <Select label="SubCategory Code" value={subCategoryid} onChange={(e) => { setSubCategoryid(e.target.value); handleError('subcategoryid', '') }}>
                                    <MenuItem value="">--Select SubCategory--</MenuItem>
                                    {fillSubCategory()}
                                </Select>
                                {error.subcategoryid && <FormHelperText>{error.subcategoryid}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        {/* Types of Services Input */}
                        <Grid size={12} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Types of Services"
                                value={typeofservice}
                                error={!!error.typeofservice}
                                helperText={error.typeofservice}
                                onFocus={() => handleError('typeofservice', '')}
                                onChange={(e) => setTypeOfService(e.target.value)}
                            />
                        </Grid>

                        {/* Amount Input */}
                        <Grid size={6} >
                            <TextField variant="outlined"
                                fullWidth
                                label="Amount"
                                value={amount}
                                error={!!error.amount}
                                helperText={error.amount}
                                onFocus={() => handleError('amount', '')}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Grid>

                        {/* Offers Input */}
                        <Grid size={6} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={offer}
                                error={!!error.offer}
                                helperText={error.offer}
                                label="Offers"
                                onFocus={() => handleError('offer', '')}
                                onChange={(e) => setOffer(e.target.value)}
                            />
                        </Grid>

                        {/* Time Input */}
                        <Grid size={12} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Time"
                                error={!!error.timeservice}
                                helperText={error.timeservice}
                                value={timeservice}
                                onFocus={() => handleError('timeservice', '')}
                                onChange={(e) => setTimeService(e.target.value)}
                            />
                        </Grid>

                        {/* ReactQuill Rich Text Editor */}
                        <Grid size={12}>
                            <FormControl
                                fullWidth
                                error={!!error.discription}
                                sx={{
                                    '& .ql-container': { borderColor: error.discription ? 'error.main' : 'inherit' },
                                    '& .ql-toolbar': { borderColor: error.discription ? 'error.main' : 'inherit' }
                                }}
                            >
                                <ReactQuill
                                    theme="snow"
                                    value={discription}
                                    onChange={(content) => { setDiscription(content); handleError('discription', '') }}
                                />
                                {error.discription && (
                                    <FormHelperText error>{error.discription}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        {/* Image Upload Button */}
                        <Grid size={6} className={classes.centerStyle}>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} >
                                Upload Image
                                <input
                                    onChange={handleImage}
                                    type="file"
                                    hidden
                                    accept="image/png, image/jpeg"
                                />
                            </Button>
                            {error.picture && (
                                <FormHelperText error style={{ textAlign: 'center', marginTop: '5px' }}>
                                    {error.picture}
                                </FormHelperText>
                            )}
                        </Grid>

                        {/* Image Preview Window */}
                        <Grid size={6} className={classes.centerStyle}>
                            <img src={picture.file} className={classes.imageStyle} alt="Preview" />
                        </Grid>

                        {/* Action Control Buttons */}
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
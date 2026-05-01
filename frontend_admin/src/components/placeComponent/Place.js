import { useStyles } from "./PlaceCss"
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function Place() {
    var navigate = useNavigate();
    const [cityid, setCityid] = useState('')
    const [placename, setPlaceName] = useState('')
    const [pincode, setPincode] = useState('')
    const classes = useStyles();
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const [cityList,setCityList]= useState([])

    const fetchAllCity = async () => {
        var res = await getData("cities/fetch_all_city")
        setCityList(res.data)

    }
useEffect(()=>{
fetchAllCity()
},[])


const fillCity=()=>{
    return cityList.map((item)=>{
        return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
    })
}

    const resetData = () => {


        setCityid('')
        setPlaceName('')
        setPincode('')

    }




    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    const validate = () => {
        var error = true

        // Check if city name is empty
        if (cityid.length==0) {
            handleError("cityid", "City name should not blank...")
            error = false
        }
        else if (placename.trim().length == 0) {
            handleError("placeName", "Place name should not blank...")
            error = false
        }
        else if (pincode.trim().length == 0) {
            handleError("pincode", "PinCode should not blank...")
            error = false
        }



        return error // returns true if error exists
    }


    const submitData = async () => {
        var status = validate()
        if (status == true) {
            setLoading(true)   // show loading

            const body = { cityid, placename, pincode };
            var res = await postData('places/add_new_place', body)
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
            else
                // If error
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error",
                    showConfirmButton: false,
                    timer: 1500
                });




        }

        resetData()
    }

    return (
        <div className={classes.placeRoot}>
            <div className={classes.box}>
                <div className={classes.heading}>
                    <div className={classes.headingGroupStyle}>

                        {/* Logo */}
                        <img src="/logo.png" className={classes.imageStyle} />

                        {/* Title */}
                        <span className={classes.haedingText}>Place Interface</span>

                        <img onClick={() => navigate('/displayallplace')} src="/report.png" className={classes.imageStyle} />


                    </div>

                </div>
                <div style={{ margin: 10, width: "96.5%" }}>

                    <Grid spacing={2} container >
                        <Grid size={12}>
                            <FormControl fullWidth>
                                <InputLabel>City Code</InputLabel>
                                <Select label="City Code" value={cityid} onChange={(e) => setCityid(e.target.value)}>
                                    <MenuItem>--Select City--</MenuItem>
                                    {fillCity()}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid size={12}>
                            <TextField fullWidth
                                onFocus={() => handleError('placeName')}
                                helperText={error.placeName}
                                error={error.placeName}
                                label="place Name"

                                variant="outlined"
                                value={placename}
                                onChange={(e) => setPlaceName(e.target.value)}
                            />

                        </Grid>
                        <Grid size={12}>
                            <TextField fullWidth
                                onFocus={() => handleError('pincode')}
                                helperText={error.pincode}
                                error={error.pincode}
                                label="pincode"

                                variant="outlined"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />

                        </Grid>
                        <Grid size={6}>
                            <Button fullWidth
                                onClick={submitData}
                                loading={loading}
                                variant="contained">
                                Save
                            </Button>
                        </Grid>
                        <Grid size={6}>
                            <Button fullWidth
                                variant="contained" onClick={resetData}>
                                Reset
                            </Button>
                        </Grid>

                    </Grid>
                </div>

            </div>

        </div>
    )
}
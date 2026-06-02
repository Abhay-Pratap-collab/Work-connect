import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useStyles } from "./PlaceCss";
import { useEffect, useState } from "react";
import { postData ,getData} from "../../services/FetchNodeServices";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import Swal from "sweetalert2";



export default function PlaceEdit({ openStatus, setOpenStatus, rowData, refresh, setRefresh, }) {
    const classes = useStyles();
    const [cityid, setCityid] = useState('')
    const [placename, setPlaceName] = useState('')
    const [placeid, setPlaceid] = useState('')
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
        const [pincode, setPincode] = useState('')
    
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



    useEffect(() => {
        setCityid(rowData.cityid)
        setPlaceid(rowData.placeid)
        setPlaceName(rowData.placename)
        setPincode(rowData.pincode)

    }, [rowData])



    const handleClose = () => {
        setOpenStatus(false)
        
    }
        const handleError = (label, message) => {
            setError((prev) => ({ ...prev, [label]: message }))
            console.log('Error', error)
        }
    const validate = () => {
        var error =false

        // Check if city name is empty
        if (!cityid) {
            handleError("cityid", "City name should not blank...")
            error = true
        }
        else if (placename.trim().length == 0) {
            handleError("placename", "Place name should not blank...")
            error = true
        }
         else if  ( String(pincode).trim().length == 0) {
            handleError("pincode", "Place name should not blank...")
            error = true
        }



        return error // returns true if error exists
    }


    const submitData = async () => {
        var status = validate()
        if (status == false) {
            setLoading(true)
            const body = { cityid, placename, placeid,pincode };
            var res = await postData('places/edit_place', body)
            setLoading(false);
            if (res.status) {
                Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                })
                setLoading(false)
                setOpenStatus(false)
                setRefresh(!refresh)
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

    }

    const placeForn = () => {
        return (
            <div className={classes.rootEdit}>
                <div className={classes.boxEdit}>
                    <div className={classes.heading}>
                        <div className={classes.headingGroupStyle}>
                            <img src="/wt.jpg" className={classes.imageStyle} />
                            <span className={classes.haedingText}>Edit Place</span>
                        </div>
                    </div>
                    <div style={{ margin: 10, width: "96.5%" }}>

                        <Grid spacing={2} container>
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
                                    helperText={error.placename}
                                    error={error.placename}
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
                                    label="PinCode"

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
                                    variant="contained" onClick={handleClose}>
                                    Close
                                </Button>
                            </Grid>

                        </Grid>
                    </div>


                </div>


            </div>
        )
    }




    return (<div>
        <Dialog open={openStatus} onClose={handleClose}>
            <DialogContent>
                {placeForn()}
            </DialogContent>

        </Dialog>

    </div>)
}
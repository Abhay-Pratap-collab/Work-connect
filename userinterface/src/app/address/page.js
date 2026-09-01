"use client"
import styles from "./address.module.css"
import { Button, Grid, Dialog, TextField, Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, } from "@mui/material"
import { useSelector } from "react-redux"
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Slide from "@mui/material/Slide";
import React from "react";
import CheckoutHeader from "./CheckoutHeader";
import { useEffect, useState } from "react"
import { serverURL, postData, getData } from '@/app/fetchserver/FetchServer'
import RightCard from "./Rightcard";
import Slot from "./Slot";
import { Radio, RadioGroup, FormControlLabel, Card, CardContent } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUser, updateuser } from "../store/slices/userSlicer";
import PaymentCard from "./PaymentCard";
export default function Address({ refresh, setRefresh,  }) {

    const [open, setOpen] = useState(false);
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [openAddressForm, setOpenAddressForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(null);
    const [showaddress, setShowAddress] = useState("");
    const [addressConfirmed, setAddressConfirmed] = useState(false);
    const [slotBooked, setSlotBooked] = useState(false);
   

    const dispatch = useDispatch()

    var product = useSelector((state) => state.product)
    var cartItems = Object.values(product)
    // alert(JSON.stringify(setSelectedAddress))

    var users = useSelector((state) => state.users)
    const user = Object.values(users)[0];
    // console.log(users);
    // console.log(user);

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const fetchAddress = async (mobileno) => {

        const response = await getData(`users/fetch_address/${mobileno}`);
        // console.log(response);
        // console.log(response.data);
        // console.log(Array.isArray(response.data));

        if (response.status) {
            setAddressList(response.data);
        }
    }
    useEffect(() => {
        if (user?.mobile) {
            fetchAddress(user.mobile);
        }
    }, [user]);

    // right side //


    const NewAddress = () => {
        const [address, setAddress] = useState({
            mobileno: "",
            typeaddress: "",
            houseno: "",
            area: "",
            landmark: "",
            city: "",
            state: "",
            pincode: "",
            latitude: "",
            longitude: "",
            fulladdress: "",
        });
        useEffect(() => {

            if (editMode && editData) {

                setAddress(editData);

            }

        }, [editMode, editData]);
        const handleChange = (e) => {
            setAddress({
                ...address,
                [e.target.name]: e.target.value,
            });
        };
        const handleSubmit = async () => {
            alert('hii')
            let response;

            if (editMode) {

                response = await postData(
                    "users/update_address",
                    address
                );

                if (response.status) {
                    await fetchAddress(user.mobile);   // Refresh updated addresses
                    setOpenAddressForm(false);
                    setEditMode(false);
                    setEditData(null);
                    // var payload={mobileno,body}
                    // dispatch(updateuser({payload}))
                }

            }
            else {

                response = await postData(

                    "users/create_address",

                    {
                        ...address,
                        mobileno: user.mobile
                    }

                );

            }
            ;
            if (response.status) {
                alert("Address saved successfully");

                setAddress({
                    typeaddress: "",
                    houseno: "",
                    area: "",
                    landmark: "",
                    city: "",
                    state: "",
                    pincode: "",
                    latitude: "",
                    longitude: "",
                    fulladdress: "",
                });
            }
            else {
                alert(response.message);
            }
        }
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 4,
                    bgcolor: "#f5f5f5",
                    minHeight: "100vh",

                }}
            >
                <Paper
                    elevation={2}
                    sx={{
                        width: 700,
                        p: 4,
                        borderRadius: 4,
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" mb={3}>
                        Add New Address
                    </Typography>

                    <Grid container spacing={2}>


                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Address Type</InputLabel>
                                <Select label="Address Type"
                                    name="typeaddress"
                                    value={address.typeaddress}
                                    onChange={handleChange}>

                                    <MenuItem value="Home">🏠 Home</MenuItem>
                                    <MenuItem value="Office">🏢 Office</MenuItem>
                                    <MenuItem value="Other">📍 Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="House / Flat No."
                                fullWidth
                                name="houseno"
                                value={address.houseno}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Area / Colony"
                                fullWidth
                                name="area"
                                value={address.area}
                                onChange={handleChange}
                            />
                        </Grid>



                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="City"
                                fullWidth
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="State"
                                fullWidth
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Pincode"
                                fullWidth
                                name="pincode"
                                value={address.pincode}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Latitude"
                                fullWidth
                                name="latitude"
                                value={address.latitude}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Longitude"
                                fullWidth
                                name="longitude"
                                value={address.longitude}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, }}>
                            <TextField
                                label="Landmark"
                                fullWidth
                                name="landmark"
                                value={address.landmark}
                                onChange={handleChange}

                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Full Address"
                                multiline
                                name="fulladdress"
                                rows={4}
                                fullWidth
                                value={address.fulladdress}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={handleSubmit}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}
                            >
                                {editMode ? "Update Address" : "Save Address"}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        )

    }
    const SavedAddress = () => {

        const handleDelete = async (addressid) => {

            const response = await postData(
                "users/delete_address",
                { addressid }
            );

            if (response.status) {
                alert(response.message);
                fetchAddress(user.mobile);
            } else {
                alert(response.message);
            }
        }
        const handleEdit = (item) => {
            alert("Edit API : " + item.addressid);
            setEditMode(true);

            setEditData(item);

            setOpen(false);

            setOpenAddressForm(true);
        }

        return (
            <div style={{ padding: 20 }}>

                <Typography variant="h5" fontWeight="bold">
                    Select Address
                </Typography>

                <RadioGroup>

                    {
                        Array.isArray(addressList) &&
                        addressList.map((item) => (

                            <Card
                                key={item.addressid}
                                sx={{
                                    mt: 2,
                                    borderRadius: 3
                                }}
                            >
                                <CardContent>
                                    <FormControlLabel
                                        value={item.addressid}
                                        control={
                                            <Radio
                                                checked={
                                                    selectedAddress?.addressid ==
                                                    item.addressid
                                                }

                                                onChange={() =>
                                                    setSelectedAddress(item)
                                                }

                                            />
                                        }
                                        label={
                                            <div>

                                                <p>{item.typeaddress}</p>

                                                <p>{item.fulladdress}</p>

                                                <p>

                                                    {item.city},

                                                    {item.state}

                                                    -

                                                    {item.pincode}

                                                </p>

                                            </div>
                                        }

                                    />

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: 10,
                                            marginTop: 10
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            color="error"
                                            variant="outlined"
                                            onClick={() =>
                                                handleDelete(item.addressid)
                                            }
                                        >
                                            Delete
                                        </Button>

                                    </div>

                                </CardContent>

                            </Card>

                        ))
                    }
                </RadioGroup>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3 }}
                    onClick={() => {
                        setEditMode(false);
                        setEditData(null);
                        setOpen(false);
                        setOpenAddressForm(true);
                    }}
                >
                    + Add New Address
                </Button>
                <Button

                    fullWidth

                    variant="contained"

                    sx={{ mt: 2 }}

                    disabled={!selectedAddress}

                    onClick={() => {

                        setShowAddress(
                            `${selectedAddress.houseno}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`
                        );

                        setAddressConfirmed(true);
                        setOpen(false)

                    }}

                >

                    Continue

                </Button>

            </div>
        )

    }

    const Account = () => {
        const totalSaving = cartItems.reduce(
            (sum, item) => sum + item.offer * item.qty,
            0
        );


        return (
            <div>
                {/* <div className={styles.saving}>
                    <p className={styles.tatalSaving}>💚 Saving ₹{totalSaving} on this order</p>
                </div> */}
                <div className={styles.bookingBox}>
                    <div className={styles.iconBox}>
                        <LocationOnIcon sx={{ color: "#6b6b6b", fontSize: 22 }} />
                    </div>

                    <div className={styles.textBox}>
                        <p className={styles.headingCss}>Send booking details to</p>
                        <p>+91 {user?.mobile}</p>
                    </div>
                </div>
                <div className={styles.addressCard}>
                    <div className={styles.addressHeader}>
                        <div className={styles.iconContainer}>
                            <LocationOnIcon sx={{ color: "#666", fontSize: 22 }} />
                        </div>

                        <p className={styles.headingCss}>Address</p>
                        <br></br>

                    </div>
                    <p>{showaddress}</p>


                    <Button
                        variant="contained"
                        fullWidth
                        // disabled
                        onClick={() => {

                            setOpen(true);
                        }}

                        sx={{
                            mt: 2,
                            height: 48,
                            background: "#6E42E5",
                            borderRadius: "8px",
                            textTransform: "none",
                            fontSize: "16px",

                            fontWeight: 600,

                        }}
                    >
                        Select address
                    </Button>
                    <Dialog
                        open={open}
                        sx={{
                            "& .MuiDialog-paper": {
                                width: "750px",
                                maxWidth: "90%",
                                borderRadius: "12px",
                            },
                        }}
                        onClose={() => {

                            setOpen(false)

                        }}

                    >


                        <SavedAddress />
                    </Dialog>
                    <Dialog

                        open={openAddressForm}

                        onClose={() => setOpenAddressForm(false)}

                        sx={{
                            "& .MuiDialog-paper": {
                                width: "750px",
                                maxWidth: "90%"
                            }
                        }}
                    >
                        <NewAddress />
                    </Dialog>
                </div>
            </div>
        )
    }


    return (

        <div>
            <CheckoutHeader />
            <div style={{ paddingLeft: '200px', paddingRight: '200px', paddingTop: '30px' }} >

                <Grid spacing={2} container>
                    <Grid size={6}>
                        <Account />
                        <Slot disabled={!addressConfirmed} setSlotBooked={setSlotBooked}  />
                        <PaymentCard slotBooked={slotBooked} />
                        <div style={{ marginTop: '20px', padding: '10px' }}>
                            <p className={styles.Cancellation}>  Cancellation policy</p>
                            <p style={{ color: '#666', paddingTop: '10px' }}>Free cancellations if done more than 12 hrs before the service. A fee will be charged otherwise.</p>
                        </div>
                    </Grid>


                    <Grid size={6}>
                        {/* <RightSide /> */}
                        <RightCard />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}


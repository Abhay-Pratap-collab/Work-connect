"use client"
import styles from "./address.module.css"
import { Button, Grid, Dialog, TextField, Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, } from "@mui/material"
import { useSelector } from "react-redux"
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Checkbox } from "@mui/material";
import PlusMinus from "../subcategorycomponents/subcategorycomponents/PlusMinus "
import Login from "../subcategorycomponents/subcategorycomponents/Login";
import Slide from "@mui/material/Slide";
import React from "react";
import Otp from "../subcategorycomponents/subcategorycomponents/Otp";
import { useEffect, useState } from "react"
import { serverURL, postData } from '@/app/fetchserver/FetchServer'
export default function Address({ refresh, setRefresh }) {

    var product = useSelector((state) => state.product)
    var cartItems = Object.values(product)

    var users = useSelector((state) => state.users)
    const user = Object.values(users)[0];
    console.log(user)
    const [open, setOpen] = useState(false);

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


    const Header = () => {
        return (
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <img
                        className={styles.headerImage}
                        src="W.png" ></img>
                    <h4 >Checkout</h4>
                </div>
            </div>
        )
    }
    // right side //

    const fillCart = () => {
        return cartItems.map((item, index) => {

            return (<div key={index} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <p className={styles.typeofservice}>{item.typesofservices}</p>
                <div className={styles.plusminus}>
                    <PlusMinus refresh={refresh} setRefresh={setRefresh} data={item} qty={item.qty} />
                </div>
                <div className={styles.amount}>
                    <p>₹{item.offer > 0 ? (item.amount - item.offer) * item.qty : (item.amount) * item.qty}</p>
                    <s style={{ color: 'grey' }} >₹{item.offer == 0 ? 0 : item.amount * item.qty}</s>
                </div>
            </div>)
        })
    }

    const RightSide = () => {

        const itemTotal = cartItems.reduce(
            (sum, item) => sum + item.amount * item.qty,
            0
        );

        const offerTotal = cartItems.reduce(
            (sum, item) => sum + item.offer * item.qty,
            0
        );

        const amountToPay = itemTotal - offerTotal;

        return (
            <div>

                <div className={styles.rightColumn}>

                    <div className={`${styles.card}`}>
                        <h4>AC Service and Repair</h4>

                        <div style={{ paddingTop: "10px" }}>
                            {fillCart()}
                        </div>
                        <div className={styles.checkboxRow}>

                            <Checkbox
                                sx={{
                                    color: "black",
                                    "&.Mui-checked": {
                                        color: "black",
                                    },
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                            />

                            <span className={styles.checkboxText}>
                                Avoid calling before reaching the location
                            </span>

                        </div>
                    </div>

                </div>

                <div className={styles.coupon}>
                    <p className={styles.couponTextFirst}>Coupons and Offers</p>
                    <p className={styles.couponSecond}>Login / Sign up to view offers</p>
                </div>

                <div className={styles.card}>

                    <h4 className={styles.paymentHeading}>Payment Summary</h4>

                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 20, padding: 10 }}>
                        <span>Item Total</span>
                        <span>₹{itemTotal}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
                        <span>Offer</span>
                        <span>-₹{offerTotal}</span>
                    </div>

                    <hr />

                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", padding: 10 }}>
                        <span>Amount to pay</span>
                        <span>₹{amountToPay}</span>
                    </div>

                </div>
                <div className={styles.card}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", padding: 10 }}>

                        <span>Amount to pay</span>
                        <span>₹{amountToPay}</span>
                    </div>


                </div>


            </div>
        );
    };
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
        const handleChange = (e) => {
            setAddress({
                ...address,
                [e.target.name]: e.target.value,
            });
        };
        const handleSubmit = async () => {
            alert('hii')
            const response = await postData("users/create_address", {
                ...address,
                mobileno: users.mobileno,
            });
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
                                Save Address
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        )

    }
    const SavedAddress = () => {
        return (<div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "10px", }}>
                <div style={{ width: '100%', background: '#fff', borderRadius: '10px', padding: '10px', gap: '20px', flexDirection: 'column', display: 'flex' }}>
                    <div>
                        <h3 className={styles.title}>Saved address</h3>
                    </div>
                    <TextField
                        placeholder="add another address "
                        fullWidth
                    >

                    </TextField>
                    <Button

                        sx={{
                            background: "#6E42E5",
                            borderRadius: "8px",
                            textTransform: "none",
                            height: 45
                        }}
                    >
                        <p className={styles.buttonText}>proceed</p>
                    </Button>
                </div>

            </div>

        </div>)
    }

    const Account = () => {
        const totalSaving = cartItems.reduce(
            (sum, item) => sum + item.offer * item.qty,
            0
        );


        return (
            <div>
                <div className={styles.saving}>
                    <p className={styles.tatalSaving}>💚 Saving ₹{totalSaving} on this order</p>
                </div>
                <div className={styles.bookingBox}>
                    <div className={styles.iconBox}>
                        <LocationOnIcon sx={{ color: "#6b6b6b", fontSize: 22 }} />
                    </div>

                    <div className={styles.textBox}>
                        <h4>Send booking details to</h4>
                        <p>+91 {user?.mobile}</p>
                    </div>
                </div>
                <div className={styles.addressCard}>
                    <div className={styles.addressHeader}>
                        <div className={styles.iconContainer}>
                            <LocationOnIcon sx={{ color: "#666", fontSize: 22 }} />
                        </div>

                        <h4>Address</h4>
                    </div>

                    <Button
                        variant="contained"
                        fullWidth
                        // disabled
                        onClick={() => setOpen(true)}
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
                        {/* <SavedAddress /> */}

                        <NewAddress />
                    </Dialog>
                </div>

            </div>





        )
    }


    return (

        <div>
            {Header()}
            <div style={{ paddingLeft: '200px', paddingRight: '200px', paddingTop: '30px' }} >

                <Grid spacing={2} container>
                    <Grid size={6}>
                        <Account />
                    </Grid>


                    <Grid size={6}>
                        <RightSide />

                    </Grid>
                </Grid>
            </div>
        </div>
    )
}


"use client"
import styles from "./payment.module.css"
import { Button, Grid, Dialog } from "@mui/material"
import { useSelector } from "react-redux"
import { Checkbox } from "@mui/material";
import PlusMinus from "../subcategorycomponents/subcategorycomponents/PlusMinus "
import Login from "../subcategorycomponents/subcategorycomponents/Login";
import Slide from "@mui/material/Slide";
import React from "react";
import Otp from "../subcategorycomponents/subcategorycomponents/Otp";
import { useEffect, useState } from "react"
export default function PaymentGetway({ refresh, setRefresh }) {
    var product = useSelector((state) => state.product)
    var cartItems = Object.values(product)
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState("login"); // login | otp
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

                    <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
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

                <div className={`${styles.card} ${styles.account}`}>

                    <p className={styles.accountText}>Account</p>

                    <p style={{
                        fontFamily: "os_regular",
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "rgb(84, 84, 84)",
                        textDecoration: "none",
                        textTransform: "none",
                        fontWeight: 400,
                        textAlign: "left",
                    }}>
                        To book the service, please login or sign up
                    </p>

                    <Button

                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{
                            background: "#6E42E5",
                            borderRadius: "8px",
                            textTransform: "none",
                            height: 45
                        }}
                    >
                        <p className={styles.buttonText}>Login</p>

                    </Button>

                    <Dialog
                        open={open}
                        onClose={() => {
                            setOpen(false);
                            setStep("login"); // Reset when dialog closes
                        }}
                        maxWidth="sm"

                        slots={{
                            transition: Transition,
                        }}
                        sx={{
                            "& .MuiDialog-paper": {
                                width: "550px",
                                maxWidth: "90%",
                                borderRadius: "12px",
                            },
                        }}
                    >
                        {step === "login" ? (
                            <Login onContinue={() => setStep("otp")} />
                        ) : (
                            <Otp
                                onBack={() => setStep("login")}
                                onVerify={() => {
                                    setOpen(false);
                                }}
                            />
                        )}
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


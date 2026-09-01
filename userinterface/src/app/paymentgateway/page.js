"use client"
import styles from "./payment.module.css"
import { Button, Grid, Dialog } from "@mui/material"
import { useSelector } from "react-redux"

import Login from "../subcategorycomponents/subcategorycomponents/Login";
import Slide from "@mui/material/Slide";
import React from "react";
import CheckoutHeader from "../address/CheckoutHeader";
import Otp from "../subcategorycomponents/subcategorycomponents/Otp";
import { useEffect, useState } from "react"
import RightCard from "../address/Rightcard";
export default function PaymentGetway({ refresh, setRefresh }) {
    var product = useSelector((state) => state.product)
    var cartItems = Object.values(product)
    const [open, setOpen] = useState(false);
    const [mobile, setMobile] = useState('')
    const [step, setStep] = useState("login"); // login | otp
    const [generatedOtp, setGeneratedOtp] = useState("");
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


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
                            <Login onContinue={(mobileNumber, otp) => {
                                setMobile(mobileNumber); // Save mobile number
                                setGeneratedOtp(otp);
                                setStep("otp")
                            }} />
                        ) : (
                            <Otp
                                mobile={mobile}
                                generatedOtp={generatedOtp}
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
            <CheckoutHeader />
            <div style={{ paddingLeft: '200px', paddingRight: '200px', paddingTop: '30px' }} >

                <Grid spacing={2} container>
                    <Grid size={6}>
                        <Account />
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


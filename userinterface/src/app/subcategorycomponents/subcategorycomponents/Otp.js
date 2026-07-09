

"use client";

import React, { useState, useRef } from "react";
import { Button, Box } from "@mui/material";
import styles from "./login.module.css";

import { useRouter } from "next/navigation";

export default function Otp() {
    const router = useRouter();
    const handleClick = () => {
        alert('hoi')
        router.push("/address");
    };

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const refs = useRef([]);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            refs.current[index + 1]?.focus();
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key !== "Backspace") return;

        const newOtp = [...otp];

        if (otp[index] !== "") {
            // Clear current digit
            newOtp[index] = "";
            setOtp(newOtp);
        } else if (index > 0) {
            // Move to previous input
            refs.current[index - 1]?.focus();
        }
    };
    const isComplete = otp.every((digit) => digit !== "");


    return (
        <div>
            <div style={{ display: "flex", paddingTop: "10px", width: '100%' }}>
                <div style={{ width: '100%', background: '#fff', borderRadius: '10px', padding: '10px', gap: '20px', flexDirection: 'column', display: 'flex' }}>

                    <div>
                        <img src="cellPhone.png" width={50} height={50} alt="Phone" />

                        <h3 className={styles.title}>Enter verification code</h3>

                        <p className={styles.description}>
                            A 6-digit verification code has been sent to +91 9888888888
                        </p>
                        <div style={{ display: 'flex', paddingTop: '10px' }}>

                            <Box display="flex"
                                justifyContent="center"
                                alignItems="center"

                                mt={3}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (refs.current[index] = el)}
                                        value={digit}
                                        maxLength={1}

                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            textAlign: "center",
                                            fontSize: "22px",
                                            borderRadius: "8px",
                                            border: "1px solid #ccc",
                                            marginRight: index !== 5 ? "12px" : "0",

                                        }}
                                    />
                                ))}
                            </Box>
                        </div>

                        <Button
                            onClick={handleClick}
                            variant="contained"
                            fullWidth
                            disabled={!isComplete}
                            sx={{
                                mt: 3,
                                background: "#6E42E5",
                                textTransform: "none",
                                height: 45,
                            }}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
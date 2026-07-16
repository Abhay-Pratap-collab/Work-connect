"use client"
import Paper from '@mui/material/Paper';
import styles from "./login.module.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@mui/material';
import { useState,useEffect } from 'react';
import { postData } from '@/app/fetchserver/FetchServer';
import { useDispatch } from "react-redux";
import { addUser } from '@/app/store/slices/userSlicer';



export default function Login({ onContinue }) {
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState('')
    const [otpg, setOtpg] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    
  
      

    const generateOtp = () => {
        var otps = parseInt(Math.random() * 899999) + 100000
        // alert('ott',otps)
        alert(`Your OTP is ${otps}`); // Only for testing

        setOtpg(otps)
        onContinue(mobile, otps);

    }
    const sendOTP = async () => {
        
        generateOtp()
        const payload = [mobile, { mobile }];
dispatch(addUser(payload));
        // setLoading(true)


    }

    return (

        <div>


            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "10px", }}>


                <div style={{ width: '100%', background: '#fff', borderRadius: '10px', padding: '10px', gap: '20px', flexDirection: 'column', display: 'flex' }}>
                    <div>
                        <img src="phone.png" width={50} height={50} ></img>

                    </div>
                    <div>
                        <h3 className={styles.title}>Enter your phone number</h3>
                    </div>
                    <div>
                        <p className={styles.description}>
                            We’ll send you a text with a verification code. Standard tariff may apply.
                        </p>
                    </div>


                    <div className={styles.phoneBox}>
                        <div className={styles.countryCode}>
                            <span className={styles.subText}>
                                +91 <KeyboardArrowDownIcon fontSize="small" />
                            </span>
                        </div>

                        <div className={styles.container}>
                            <input
                                className={styles.input}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                                type="tel"
                                maxLength={10}
                                placeholder="Enter your mobile number"
                            />
                        </div>
                    </div>
                    <div>

                        <Button
                            sx={{
                                background: "#6E42E5",
                                borderRadius: "8px",
                                textTransform: "none",
                                height: 45,
                                width: "100%",
                            }}
                            variant="contained"
                            disabled={mobile.length !== 10}
                            onClick={sendOTP}
                        >
                            continue
                        </Button>
                    </div>
                    <p className={styles.smallText}>By continuing, you agree to our T&C and Privacy policy.</p>
                </div>


            </div>

        </div>
    )
}
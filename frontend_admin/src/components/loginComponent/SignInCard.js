import { useStyles } from "./SignInCardCss";
import { Grid, TextField, Button, Checkbox, FormLabel } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router";
import { postData } from "../../services/FetchNodeServices";


export default function SignInCard() {

    const [emailId,setEmailId]=useState('')
    const [password,setPassword]=useState('')


    const classes = useStyles()

    const navigate = useNavigate()

    const handleChkPassword=async()=>{
        var res=await postData('admins/chk_admin_password',{emailid:emailId,password})
        alert(res.status)    
        

    }
    return (

        <div className={classes.container}>
            <div className={classes.headingText}>
                <h1>Sign in</h1>
            </div>

            <div className={classes.grids}>
                <Grid container spacing={1}>
                    <Grid size={12} >
                        <FormLabel htmlFor="email" style={{ color: "grey" }}>Email</FormLabel>
                    </Grid>
                    <Grid size={12} >
                        <TextField onChange={(e)=>setEmailId(e.target.value)} id="email" className={classes.input} variant="outlined" placeholder="abc@gmail.com" fullWidth />

                    </Grid>
                    <Grid size={12} >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                            <FormLabel htmlFor="password" style={{ color: "grey" }}>Password</FormLabel>
                            <FormLabel style={{ color: "white", textAlign: 'center', fontSize: 14 }}>Forgot your password?</FormLabel>
                        </div></Grid>
                    <Grid size={12} >
                        <div >
                            <TextField onChange={(e)=>setPassword(e.target.value)} id="password" className={classes.input} variant="outlined" placeholder="......" fullWidth />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <Checkbox className={classes.checkbox} />
                        <FormLabel style={{ color: "white" }}>Remember me</FormLabel>
                    </Grid>
                    <Grid size={12} >
                        <Button onClick={handleChkPassword} className={classes.button} variant="contained" fullWidth>Sign in</Button>
                    </Grid>
                    <Grid size={12} >
                        <p style={{ margin: "0 10px", color: "white", textAlign: "center" }}>
                            Don't have an account?
                            <span onClick={() => navigate("/signup")} style={{ cursor: 'pointer', color: 'white' }}> Sign up</span>
                        </p>
                    </Grid>
                    <Grid size={12}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <hr style={{ flex: 1, border: ".5px solid grey" }} />
                            <span style={{ margin: "0 10px", color: "grey" }}>or</span>
                            <hr style={{ flex: 1, border: ".5px solid grey" }} />
                        </div>
                    </Grid>

                    <Grid size={12}>
                        <Button className={classes.btns} variant="outlined" fullWidth><img className={classes.icons} src="google.png" alt="google" />Sign in with Google</Button>
                    </Grid>
                    <Grid size={12}>
                        <Button className={classes.btns} variant="outlined" fullWidth><img className={classes.icons} src="fb.png" alt="facebook" />Sign in with Facebook</Button>
                    </Grid>
                </Grid>
            </div>


        </div>
    )
}
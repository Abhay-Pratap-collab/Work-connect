import { Checkbox, FormControl, FormControlLabel,Button, Grid, InputLabel, TextField } from "@mui/material"
import { useStyles } from "./SignInCardCss"
import { useNavigate } from "react-router"
import { postData } from "../../services/FetchNodeServices"
import { useEffect, useState } from "react"

export default function SignInCard({rowdata})
{
    const Navigate=useNavigate()
    const classes=useStyles()
    const [emailid,setEmailId]=useState('')
    const [mobileno,setMobileNo]=useState('')
    const [password,setPassword] = useState('')
   useEffect(() => {
        if (rowdata) {
            setEmailId(rowdata.emailid || '');
            setMobileNo(rowdata.mobileno || '');
            setPassword(rowdata.password || '');
        }
    }, [rowdata]);
    const handleSubmit = async ()=>{
        var body = {emailid,password,mobileno}
        var res = await postData('admins/chk_admin_password',body)
       
            if(res.status)
            {
                alert('complete')
            }
           else{
            alert ('error')
           }
       
    }


    return(<div className={classes.box} >
        <Grid container spacing={2.5} >
            <Grid size={12} >
                <div className={classes.signinText} >Sign In</div>
            </Grid>
            <Grid size={12} style={{height:'8px'}}>
                <InputLabel>Email</InputLabel>
            </Grid>
            <Grid size={12} >
                <TextField color="primary" fullWidth placeholder="name@gmail.com" size="small" value={emailid} onChange={(e)=> setEmailId(e.target.value)}/>
            </Grid>
            <Grid size={12} style={{height:'8px'}} >
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:'20px'}}>
                <InputLabel>Password</InputLabel>
                <div className={classes.headingText}>Forgot your password?</div>
                </div>
            </Grid>
            <Grid size={12} >
                <TextField fullWidth placeholder="atleast 8 characters" size="small" value={password} onChange={(e)=> setPassword(e.target.value)} />
            </Grid>
            <Grid size={12} style={{height:'25px'}} >
                <FormControlLabel control={<Checkbox />} label="Remember me" />
             </Grid>
             <Grid size={12}>
                        <button className={classes.signinButton} onClick={handleSubmit} >Sign in</button>
                    </Grid>
                    <Grid size={12} >
                        <div style={{fontSize:'14.5px',textAlign:'center'}}>Don't have an account?<span style={{fontWeight:'600'}} onClick={()=>Navigate('/signupcard')} > Sign up</span></div>
                    </Grid>
                    <Grid size={12} style={{display:'flex',alignItems:'center',justifyContent:"space-between"}} >
                        <hr style={{width:'47%',height:'1px',border:'none',backgroundColor:'rgb(194, 199, 199)'}}/><span style={{marginBottom:"6px"}}> or </span><hr style={{width:'47%',height:'1px',border:'none',backgroundColor:'rgb(194, 199, 199)'}}/>
                    </Grid>
                    <Grid size={12} >
                        <button className={classes.gfButton} ><img src="google.png" className={classes.imageStyle} /><span  >Sign in with Google</span></button>
                    </Grid>

                    <Grid size={12} >
                        <button className={classes.gfButton} ><img src="facebook.png" className={classes.imageStyle} /><span>Sign in with Facebook</span></button>
                    </Grid>

        </Grid>

    </div>)
}
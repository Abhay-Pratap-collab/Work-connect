import { Checkbox, FormControl, FormControlLabel,Button, Grid, InputLabel, TextField } from "@mui/material"
import { useNavigate } from "react-router"
import { useStyles } from "./SignUpCardCss"
export default function SignUpCard()
{
    const Navigate=useNavigate()
    const classes=useStyles()
    return(<div className={classes.box} >
        <Grid container spacing={2.5} >
            <Grid size={12} >
                <div className={classes.signinText} >Sign up</div>
            </Grid>
            <Grid size={12} >
                <InputLabel>Full name</InputLabel>
                <TextField color="primary" fullWidth placeholder="Jon snow" size="small"/>
            </Grid>
            <Grid size={12} >
                <InputLabel>Email</InputLabel>
                <TextField color="primary" fullWidth placeholder="name@gmail.com" size="small"/>
            </Grid>
            <Grid size={12} >
                <InputLabel>Password</InputLabel>
                <TextField fullWidth placeholder="atleast 8 characters" size="small"/>
            </Grid>
            <Grid size={12} >
                <FormControlLabel control={<Checkbox />} label="I want to receive updates via email" />
             </Grid>
             <Grid size={12}>
                        <button className={classes.signinButton} >Sign up</button>
                    </Grid>
                    <Grid size={12} style={{display:'flex',alignItems:'center',justifyContent:"space-between"}} >
                        <hr style={{width:'47%',height:'1px',border:'none',backgroundColor:'rgb(194, 199, 199)'}}/><span style={{marginBottom:"6px"}}> or </span><hr style={{width:'47%',height:'1px',border:'none',backgroundColor:'rgb(194, 199, 199)'}}/>
                    </Grid>
                    <Grid size={12} >
                        <button className={classes.gfButton} ><img src="google.png" className={classes.imageStyle} /><span  >Sign up with Google</span></button>
                    </Grid>

                    <Grid size={12} >
                        <button className={classes.gfButton} ><img src="facebook.png" className={classes.imageStyle} /><span>Sign up with Facebook</span></button>
                    </Grid>
                    <Grid size={12} >
                        <div style={{fontSize:'14.5px',textAlign:'center'}}>Already have an account?<span style={{fontWeight:'600'}} onClick={()=>Navigate('/loginpage')} > Sign in</span></div>
                    </Grid>

        </Grid>

    </div>)
}
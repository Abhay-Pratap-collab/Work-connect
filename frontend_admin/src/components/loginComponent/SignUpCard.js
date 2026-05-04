import { useStyles } from "./SignUpCardCss";
import { Grid, TextField, Button, Checkbox, FormLabel } from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function SignUpCard() {


    const classes = useStyles()

    const navigate = useNavigate()

    return (
        <div className={classes.root}>
            <div className={classes.container}>

                <div className={classes.head}>
                    <img className={classes.imageStyle} src="/wcll.png" alt="logo" />
                    <span className={classes.headingText}>Work Connect</span>
                </div>

                <div className={classes.headingText}>
                    <h1>Sign up</h1>
                </div>

                <div className={classes.grids}>
                    <Grid container spacing={1}>
                        <Grid size={12} >
                            <FormLabel htmlFor="fn" style={{ color: "grey" }}>Full name</FormLabel>
                        </Grid>
                        <Grid size={12} >
                            <TextField id="fn" className={classes.input} variant="outlined" placeholder="Vin Disele" fullWidth />
                        </Grid>

                        <Grid size={12} >
                            <FormLabel htmlFor="email" style={{ color: "grey" }}>Email</FormLabel>
                        </Grid>
                        <Grid size={12} >
                            <TextField id="email" className={classes.input} variant="outlined" placeholder="xyz@gmail.com" fullWidth />
                        </Grid>

                        <Grid size={12} >
                            <FormLabel htmlFor="password" style={{ color: "grey" }}>Password</FormLabel>
                        </Grid>
                        <Grid size={12} >
                            <TextField id="password" className={classes.input} variant="outlined" placeholder="......" fullWidth />
                        </Grid>


                        <Grid size={12}>
                            <Checkbox className={classes.checkbox} />
                            <FormLabel style={{ color: "white" }}>I want to receive updates via email</FormLabel>
                        </Grid>
                        <Grid size={12} >
                            <Button className={classes.button} variant="contained" fullWidth>Sign up</Button>
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

                        <Grid size={12} >
                            <p style={{ margin: "0 10px", color: "white", textAlign: "center" }}>
                                Already have an account?
                                <span onClick={() => navigate("/login")} style={{ cursor: 'pointer', color: 'white' }}> Sign in</span>
                            </p>
                        </Grid>
                    </Grid>
                </div>


            </div>
        </div>
    )
}
import About from "./About"
import SignInCard from "./SignInCard"

import { useStyles } from "./LoginCss"

export default function Login() {
    
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <About/>
            <SignInCard/>
        </div>
    )
}















        
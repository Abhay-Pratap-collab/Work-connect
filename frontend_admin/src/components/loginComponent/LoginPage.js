import Feature from "./Feature"
import { useStyles } from "./LoginPageCss"
import SignInCard from "./SignInCard"

export default function LoginPage()
{
    const classes=useStyles()
    return(<div className={classes.root} >
        <div className={classes.box} >
            <Feature/>
            <SignInCard/>

        </div>

    </div>)

}
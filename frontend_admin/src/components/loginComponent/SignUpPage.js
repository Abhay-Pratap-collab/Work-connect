import { useStyles } from "./LoginPage.css"
import SignUpCard from "./SignUpCard"
export default function SignUpPage()
{
    const classes=useStyles()
    return(<div className={classes.root} >
        <SignUpCard/>
    </div>)
}
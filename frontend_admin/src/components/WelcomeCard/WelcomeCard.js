import { useStyles } from "./WelcomeCard.css";
export default function WelcomeCard()
{
    const classes=useStyles()
    return(<div className={classes.box} >
        <div className={classes.textBox} >
        <div className={classes.welcomeText} >Welcome back 👋 Jaydon Frankie</div>
        <p className={classes.para} >Everything is set and running smoothly. Manage users, track services, and stay updated with real-time activity.</p>
        <button className={classes.btn} >Go now</button>
        </div>
         <div style={{width:'300',height:'200px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}} >
            <img src="/plane.png" style={{position:'absolute',top:'36px',left:'35px'}} loading="lazy" />
            <img src="/card.png" style={{width:'160px'}} loading="lazy"/>
        <img src="/character-present.webp" loading="lazy" style={{width:'85px'}}/>
        </div>
       
    </div>)
}
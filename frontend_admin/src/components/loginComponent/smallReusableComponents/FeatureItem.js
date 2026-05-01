import { Grid } from "@mui/material";
import { useStyles } from "./FeatureItemCss";
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function FeatureItem({image,heading,text} )
{
    const classes=useStyles()
    return(<div className={classes.box} >
    <Grid container spacing={0.8} >
        <Grid size={1} style={{display:'flex',justifyContent:'center'}} >
            <img src={image} className={classes.imageStyle} />
        </Grid>
        <Grid size={11} >
            <div className={classes.headingText} >{heading}</div>
        </Grid>
         <Grid size={1} >

        </Grid>
        <Grid size={11} >
            <div className={classes.text} >{text}</div>   
        </Grid>
    </Grid>
    </div>)
}
import { makeStyles } from "@mui/styles";
export const useStyles=(makeStyles((theme)=>({
    root:{
        width:'100vw',
        height:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'rgb(245, 250, 253)'
    },
    box:{
        width:'70%',
        height:'85%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-evenly'
    }
})))
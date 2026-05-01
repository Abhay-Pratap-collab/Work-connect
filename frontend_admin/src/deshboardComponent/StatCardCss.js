import { makeStyles } from "@mui/styles";
export const useStyles=(makeStyles((theme)=>({
    box:(props)=>({
        width:'100%',
        height:'150px',
        borderRadius:'20px',
        padding:'20px',
        display:'flex',
        margin:10,
    //    marginLeft:'230px',
        flexDirection:'column',
        justifyContent:'space-between',
        boxSizing:'border-box',
        willChange:'transform',
        transform:'translateZ(0)',
        boxShadow:'0 0 2px #c5c3c3',
        background: props.darkMode ? "rgba(40, 47, 56, 0.96)" : "transparent",
          
    }),
    heading:(props)=>({
        fontSize:'15px',
        fontWeight:'600',
        color: props.darkMode ? "#c2c7c9" : '#84888aee'
    }),

    number:{
        fontSize:'27px',
        fontWeight:'bold',
    },
    chart:{
        width:'90px',
        marginBottom:'5px'
    },
    day:(props)=>({
        fontSize:'15px',
        color: props.darkMode ? "#c2c7c9" : '#84888aee'
    })
    
})))
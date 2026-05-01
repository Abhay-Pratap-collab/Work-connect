import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
    
    },
    box: {
        boxSizing: 'content-box',
        border: ".5px solid #19a25d",
        width: "55%",
        borderRadius: "10px",
        background: "white",
        margin: "10px"
    },
    boxEdit: {
        boxSizing: 'content-box',
        border: ".5px solid #19a25d",
        width: "100%",
        borderRadius: "10px",
        background: "white",
        margin: "10px"
    },
    heading: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        background: "#3eb746",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        marginBottom:10,
        
    },
    headingedit: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        background: "#3eb746",
        justifyContent: 'space-between',
        marginBottom:10,
        
    },
    headimage:{
        width:50,
        margin:10,
    },
    headingText: {
        display: "flex",
        alignItems: "center",
        fontFamily: "Raleway",
        fontSize: "28px",
        color: "white",
        fontWeight: "bold",
        marginRight: "10px"
    },
    imageStyle: {
        width: "auto",
        height: 60,
        padding: '10px',

    },
    grids:{
        margin: '10px',
    
    },
    btn:{
        width: '70%',
        display:"flex",
        justifyContent:"center",
    },
    btgrid:{
        width: '80%'
    },
    gridbtn:{
        width:'100%',
        display:'flex',
        justifyContent:'center'
    }


})
import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles({
    rootedit: {
        display: "flex",
        justifyContent: 'center',
        width:'80vw',
        height:'100vh',
        margin:0,
        padding:0
    },
    boxedit: {
        width: '90%',
        height:'auto',
        padding:'0px',
        marginTop:15
    },
    imageStyle:{width: "auto",
        height:50,
        objectFit: "contain",
        marginBottom:-2,
        marginTop:-2,
        padding:0,
    },
    headingText:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:'Raleway',
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold',
        letterSpacing:1,
        wordSpacing:1.5,
        marginBottom:-2,
        marginTop:-2,
        padding:0,
    },
})
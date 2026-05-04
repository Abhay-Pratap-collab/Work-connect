import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    
    content: {
        display: "flex",
        // justifyContent: "right",
        // marginLeft: "50px",
        width: "30%",
        padding:'5rem'

    },
    heading: {
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        width: "50%",
    },
    imageStyle: {
        width: 40,
        height: 40,
    },
    headingText: {
        display: "flex",
        alignItems: "center",
        fontFamily: "Raleway",
        fontSize: "28px",
        color: "#4876EF",
        fontWeight: "bold",
        marginRight: "10px"
    },
    icons: {
        // display: "flex",
        width: 30,
        fill: "grey",
        marginRight:10
    },
    paras: {
        display: "flex",
        marginTop: 20
    }


})
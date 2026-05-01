import { makeStyles } from "@mui/styles";
export const useStyle = makeStyles({
      heading: {
        height: "20%",
        width: "100%",
        background: '#78e08f',
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // paddingTop: 10,




    },
     box: {
        display: "flex",
        height: "100%",
        width: "100%",
        border: '0.3px solid black',
        padding: "20px",
        background: "#fff",
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        boxSizing: "border-box",
        // margin: 10,
          flexDirection: "column",
    },
       root: {
        display: "flex",
        justifyContent: "center",
        width: '100%',
        // height: '100%',
        alignItems: "center",
        padding: "10px",
        background: "#f9f9f9",
    },
    
     imageStyle:{
        width:60,
        paddingTop: 6,
    },
     headingGroupStyle: {
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "96%",
    //  background: 'red',
  },
     haedingText:{
        fontFamily:'Raleway',
        fontSize:24,
          fontWeight: "bold",
    // color: "#fff",
    },
     centerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
   errorTextStyle:{
    fontWeight: 400,
    color: "#d32f2f",
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    textAlign: "left",
    mt: "3px",
    mb: 0,
    mx: "14px"
  },

})
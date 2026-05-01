import { makeStyles } from "@mui/styles";
export const useStyle = makeStyles({

    root: {
        display: "flex",
        justifyContent: "center",
        width: '100vw',
        // height: '100vh',
    },
      Editroot: {
        display: "flex",
        justifyContent: "center",
        width: '100%',

        height: '100%',
    },
    Editbox: {
       display: "flex",
       height: "100%",
       width: "100%",
       border: '0.3px solid black',
       // padding: "5px",
       //  margin: 10,
       flexDirection: "column",
   },
    box: {
        display: "flex",
        height: "100%",
        width: "50%",
        border: '0.3px solid black',
        // padding: "5px",
        margin: 10,
          flexDirection: "column",
    },
    heading: {
        height: "12%",
        width: "100%",
        background: '#78e08f',
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // paddingTop: 10,
        
        
        
        
    }
    ,
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
}
})
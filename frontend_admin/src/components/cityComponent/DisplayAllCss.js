import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "80vw",
    height: "100vh",
    justifyContent: "center",
    // background:'red'

  },
  box: {
    display: "flex",
   
    width: "80%",
    height: 300,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "column",
   
    // background:'red'
  },
  heading: {
    width: "100%",
    height: 70,
    background: "#78e08f",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
  },
  imageStyle: {
    width: 40,
  },
  haedingText: {
    fontFamily: "Raleway",
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    padding:10
  },
  headingGroupStyle: {
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "96%",
  },
  centerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    display:'flex',
    flexDirection:'column'
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
});

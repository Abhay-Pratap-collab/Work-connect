import { makeStyles } from "@mui/styles";
export const SubcategoryCss = makeStyles({
  root: {
    display: 'flex',
    width: '80vw',
    height: '100vh',
    justifyContent: 'center',

  },
  box: {
    display: 'flex',
    border: '0.3px solid #bdc3c7',
    width: '50%',
    height: 400,
    borderRadius: 10,
    margin: 10,
    flexDirection: "column",

  },

  heading:
  {
    width: '100%',
    height: 70,
    background: '#78e08f',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
  },
  headingGroupStyle: {
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "96%",
  },

  imageStyle: {
    width: 60,
    cursor:'pointer'
  },
  haedingText: {
    fontFamily: 'Raleway',
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  centerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorTextStyle: {
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
import { makeStyles } from "@mui/styles";
export const CategoryCss = makeStyles({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',

  },
  box: {
    display: 'flex',
    border: '0.3px solid #bdc3c7',
    width: '40%',
    height: 300,
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
    width: 60
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
  },saveButton: {
    backgroundColor: '#636e72', // A neutral grey
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: 'green', // Darker grey on hover
        transform: 'translateY(-2px)', // Subtle lift effect
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
},



})
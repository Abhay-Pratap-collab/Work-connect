import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
  },
  box: {
    display: "flex",

    width: "60%",
    height: 300,
    borderRadius: 10,
    margin: 10,
    flexDirection: "column",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
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
    display: 'flex',
    flexDirection: 'column'
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
  },

// Inside your makeStyles or styled object in CategoryCss.js
saveButton: {
    backgroundColor: '#636e72', // A neutral grey
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: 'green', // Darker grey on hover
        transform: 'translateY(-2px)', // Subtle lift effect
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
},

  // Inside your makeStyles or styled object in CategoryCss.js
closeButton: {
    backgroundColor: '#636e72', // A neutral grey
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#2d3436', // Darker grey on hover
        transform: 'translateY(-2px)', // Subtle lift effect
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
},
});

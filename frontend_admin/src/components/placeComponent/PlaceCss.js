import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
  placeRoot: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
  }
  , box: {
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
  haedingText: {
    fontFamily: 'Raleway',
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
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


  rootEdit: {
    display: 'flex',

    justifyContent: 'center',
    width: "100%",
    height: "auto"
  },
  boxEdit: {
    display: 'flex',
    border: '0.3px solid #bdc3c7',
    width: '100%',
    height: "auto",
    borderRadius: 10,
    margin: 10,
    flexDirection: "column",

  },

});


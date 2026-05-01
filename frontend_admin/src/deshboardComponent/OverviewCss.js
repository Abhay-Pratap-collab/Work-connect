import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles ({
    box:{
        height: '100vh',
        width:'30%',
        display: 'flex',
        flexDirection: 'column',
        // marginTop:'20px',
       backgroundColor: '#F8F9FA',
    //    marginLeft:'10px'
    // background:'red'
        // background:'red'
    },
    image:
    {
        height:'30px',
        marginLeft:'25px',
        marginTop:'10px',
        // position:"fixed",
        
        width:'30px'
    },
    overview:{
        fontSize:'10px'
    }
    ,
   overviewButton: {
        backgroundColor: '#ffffff !important', // !important ensures MUI defaults are overridden
        color: '#444 !important',
        // textTransform: 'none', // Keeps it "Overview" not "OVERVIEW"
        borderRadius: '8px',
        padding: '10px 20px',
        border: '1px solid #eee',
        boxShadow: 'none',
        width: '90%', // Makes it fit nicely in the sidebar
        margin: '5px auto',
        display: 'flex',
        justifyContent: 'space-between', // Puts arrow on the right
        '&:hover': {
            backgroundColor: '#f1f1f1 !important',
        }
    },
    paperCss:{

        width: '270px', 
            // height: '100vh', // Set to full viewport height
            // position: 'fixed', // Keep it fixed on the screen
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column'
    }


})
import { makeStyles } from "@mui/styles";
export const useStyles = (makeStyles((theme) => ({
    box: {
        width: '100%',
        minHeight: '330px',
        borderRadius: '20px',
        background: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '30px',
        boxSizing: 'border-box',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backgroundImage: `
      linear-gradient(to right,rgba(20,26,33,0.88) 0%,#141a21 75%),
      url('welcome-background.webp')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        background: '',
        "@media (max-width: 900px)": {
            flexDirection: 'column',
            height: '520px'
        }

    },
    textBox: {
        display: 'flex',
        flexDirection: 'column',
        "@media (max-width: 900px)": {
            alignItems: 'center',
            textAlign: 'center'
        }

    },
    welcomeText: {
        color: 'white',
        fontSize: '25px',
        fontWeight: 600,
        width: '240px',

    },
    para: {
        color: '#dad6d6',
        width: '60%',
        fontSize: '18px',
        fontWeight: 600
    },
    btn: {
        width: '75px',
        height: '35px',
        color: 'white',
        fontSize: '16px',
        fontWeight: 700,
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#45ca7d'
    },
    character: {

    }

})))
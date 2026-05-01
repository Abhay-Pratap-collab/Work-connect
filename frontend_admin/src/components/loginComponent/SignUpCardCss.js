import { makeStyles } from "@mui/styles";
export const useStyles=(makeStyles((theme)=>({
    box:{
        width:'450px',
        height:'auto',
        boxSizing:'border-box',
        padding:'25px',
        display:'flex',
        background:'white',
        flexDirection:'column',
        alignItems:'center',
        border:'0.5px solid rgb(221, 223, 218)',
        borderRadius:'8px',
        boxShadow:'0px 0px 10px rgb(0,0,0,0.2) '
    },
    imageStyle:{
        width:"20px",
        marginRight:'8px'
    },
    centerStyle:{
                 display:'flex',
                 width:'450px',
                 
    },
    signinText:{
        fontSize:'35px',
        fontWeight:'700'

    },
    inputText:{
        marginBottom:'7px',
        color:'grey',
        fontSize:'15px'

    },
    input:{
        borderRadius: 10,
    backgroundColor: '#F3F6F9',
    border: '1px solid',
    borderColor: '#7e8185',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    boxSizing:'border-box',
    transition: 'border-color',
    transition:'background-color',
    transition:'box-shadow'

    },
    signinButton:{
        background:'rgb(22, 5, 99)',
        borderRadius: 10,
        color:'white',
        position: 'relative',
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 15,
    fontWeight:'600',
    width: '100%',
    padding: '10px 12px',

    },
    gfButton:{
         borderRadius: 10,
        position: 'relative',
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 15,
    fontWeight:'600',
    width: '100%',
    padding: '10px 12px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
    },
    headingText:{
        fontSize:'15px',
        fontWeight:'600',
    },
})))
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems:'center',
        background: `radial-gradient(
      circle at center,
      hsl(219, 37%, 16%) 0%,
      hsl(220, 35%, 3%) 70%
    )`,
        color: 'white',
        height:'100vh'
    },
})
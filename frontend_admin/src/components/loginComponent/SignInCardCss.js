import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({

    container: {
        justifyContent: "left",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        color: '#fff',
        borderRadius: 10,
        border: '1px solid hsla(220, 20%, 25%, 0.6)',
        height: 'auto',
        width: '28%',
        padding: "2rem",
        background: "hsla(220, 30%, 5%, 0.5)",
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
    },
    headingText: {
        color: 'white',
        fontStyle: "revert-layer",
        fontSize: 18
    },
    checkbox: {
        color: "grey !important",

        "&.Mui-checked": {
            color: "#1878ed !important"
        }
    },
    grids: {
        margin: "5px",
    },
    input: {
        "& .MuiOutlinedInput-root": {
            backgroundColor: "#05070a",
            borderRadius: 10,
            height: "2.5rem",
            margin: 0,
            padding: 0,

            // 🔥 Hover state
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4d5057"
            },

            // 🔥 Focus state
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1878ed",
                borderWidth: "2px"
            }
        },

        "& .MuiOutlinedInput-input": {
            color: "#fff",
            height: ".5rem",
            borderRadius: 10
        },

        // Default border
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "hsla(220, 20%, 25%, 0.6)"
        }
    },
    button: {
        backgroundColor: "#ffffff !important",
        color: "#000000 !important",
        borderRadius: "10px !important",

        "&:hover": {
            backgroundColor: "#808080 !important",
            color: "#000000 !important"
        }
    },
    btns: {
        backgroundColor: "#100f0f !important",
        color: "white !important",
        border: "1px solid rgba(255,255,255,0.3) !important",
        borderRadius: "10px !important",

        "&:hover": {
            backgroundColor: "black !important",
            border: "1px solid rgba(255,255,255,0.6) !important"
        }
    },
    icons: {
        width: 20,
        height: 20,
        marginRight: 5
    }

})
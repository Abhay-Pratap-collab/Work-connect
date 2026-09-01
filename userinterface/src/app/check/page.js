import { Box, Radio } from "@mui/material"
export default function Check() {
    return (<div>
        <h3>Select professional</h3>
        <div style={{
            display: 'flex',
            width: '50px',
            height: '50px',
            border: 'solid black 1px',
            boxShadow: '1px',
            borderRadius: '8px',
            justifyContent: "center",
            alignItems: "center",
        }}>
            <img src="abhayphoto.jpeg" height='45px' style={{ objectFit: 'cover', borderRadius: '8px' }} />
        </div>
    </div>)
}
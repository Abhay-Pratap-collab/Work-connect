"use client"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
export default function CardandUSer() {
    var product = useSelector((state) => state.product)
    var products = Object.values(product)
    var count = products.length
    return (<div style={{ display: 'flex', gap: '25px', margin: "5px", alignItems: 'center' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            // color: 'red',
            width: '40px',
            height: '40px',
            background: 'white',
            border: "2px solid #d4d4d4",
            // boxSizing: 'border-box',
            cursor: 'pointer',
            boxShadow: "none",
        }}>

            {/* <ShoppingCartIcon  style={{fontSize:23, color:"black", paddingLeft:2 }}/> */}
            <Badge color="secondary" badgeContent={count}>

                <ShoppingCartIcon style={{
                    alignItems: 'stretch',
                    backgroundColor: 'rgba(0, 0, 0, 0.00)',
                    border: '0 solid black',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexBasis: 'auto',
                    flexDirection: 'column',
                    flexShrink: 0,
                    listStyle: 'none',
                    margin: '0px',
                    minHeight: '0px',
                    minWidth: '0px',
                    padding: '0px',
                    position: 'relative',
                    textDecoration: 'none',
                    zIndex: 0,
                    color: 'black'
                }} />
            </Badge>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            // color: 'red',
            width: '20px',
            height: '20px',
            background: 'white',

            border: "2px solid black",
            // boxSizing: 'border-box',
            cursor: 'pointer',
            boxShadow: "none",
        }}>

            <PermIdentityRoundedIcon sx={{ fontSize: 18, color: "black", paddingLeft: 0 }} />
        </div>
    </div>)
}
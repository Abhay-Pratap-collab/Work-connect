import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from "sweetalert2";
import { postData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useStyle } from './DocumentCss';
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Button, backdropClasses, boxClasses } from "@mui/material"
import PanExperts from './PanExperts';
import DocumentEdit from './DocumentEdit';
import { useNavigate } from "react-router-dom";

export default function All()
{
    var navigate = useNavigate()
    
    const classes =  useStyle()
const handleChange = (event) => {
  const value = event.target.value;

  if (value === 'adhar') {
    navigate('/aaa');
  }
  else if (value === 'pan') {
    navigate('/pan');
  }
  else if (value === 'photo') {
    navigate('/document');
  }
}


    return(<div className={classes.root}>
        <div className={classes.box}>
            <div className={classes.heading}>
                <div className={classes.headingGroupStyle}>
                   <img src="/logo.png" className={classes.imageStyle} />
                   <span className={classes.haedingText}>Experts</span>

                </div>

            </div>
 <div style={{ margin: 10, width: "96.5%" }}>
     <Grid container spacing={2}>
        <Grid size={12}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>Document</InputLabel>
                                        <Select label="Document"  onChange={handleChange}>
                                         <MenuItem>--select document--</MenuItem>
                                         <MenuItem value="adhar"> AadharCard</MenuItem>
                                         <MenuItem>PanCard</MenuItem>
                                         <MenuItem>LicenseCard</MenuItem>
                                         <MenuItem>Photograpgh</MenuItem>
                                        </Select>
                                    </FormControl>
        
                                </Grid>

     </Grid>
 </div>
            


           
        </div>

    </div>
    )
}
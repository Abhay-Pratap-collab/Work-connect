import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, Grid, Button, IconButton } from "@mui/material";
// import { useStyles } from "./CityCss";
import { useStyle } from "./ExpertsCss";
import { postData, serverURL } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';




export default function PanExperts({ refresh, setRefresh, rowData, openStatus, setOpenStatus }) {
  const classes = useStyle();
//   const [photo, setPhoto] = useState({ file: 'india-gate.png', bytes: '' })
  const [panicon, setPanicon] = useState({ file: 'india-gate.png', bytes: '' })
  
  const handleImage = (e) => {
    setPanicon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    setsaveBTnStatus(true)

  }
  const [saveBTnStatus, setsaveBTnStatus] = useState(false)
//   const [cityId, setcityId] = useState('')
  const [expertsid, setExpertsId] = useState('')
  // const [error, setError] = useState({ cityIcon: '' })
  const [loading, setLoading] = useState(false)
  const handleCancel = () => {
    setPanicon({ file: `${serverURL}/images/${rowData.panicon}`, bytes: '' })
    setsaveBTnStatus(false)
  }

  const saveCancelBtn = () => {
    return (<div style={{ display: "flex", width: "70%", justifyContent: "space-between" }}>
      <Button onClick={handleSubmit} variant="contained">Save</Button>
      <Button onClick={handleCancel} variant="contained" color="secondary">Cancel</Button>
    </div>)
  }


  useEffect(() => {
    setPanicon({ file: `${serverURL}/images/${rowData.panicon}`, bytes: '' })
    setExpertsId(rowData.expertsid)


  }, [rowData])

  const handleClose = () => {
    setOpenStatus(false)
    setsaveBTnStatus(false)



  }



  const handleSubmit = async () => {


    setLoading(true)


    var body = new FormData()
    body.append("expertsid", expertsid)
    body.append("panicon", panicon.bytes)
    var res = await postData('experts/edit_pan', body)
    setLoading(false);
    if (res.status) {
      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
        , toast: true
      });
      setLoading(false)
      setOpenStatus(false)
      setRefresh(!refresh)
    }
    else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });

    }
    setsaveBTnStatus(false)
  }
  //error handling////

  const PanExperts = () => {
    return (
      <div className={classes.rootEdit}>
        <div className={classes.boxEdit}>
          <div className={classes.heading}>
            <div className={classes.headingGroupStyle}>
              <img src="/logo.png" className={classes.imageStyle} />
              <span className={classes.haedingText}>Edit Pancard</span>
            </div>
          </div>
          <div style={{ margin: 10, width: "96.5%" }}>
            <Grid spacing={2} container>
              <Grid size={12} className={classes.centerStyle}>
                <img src={`${panicon.file}`} style={{ width: 300 }} />
              </Grid>

              <Grid size={6} className={classes.centerStyle}>
                {saveBTnStatus ? saveCancelBtn() :
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>Upload adhar Image
                    <input multiple onChange={handleImage} type="file" hidden accept="image/png" />

                  </Button>}
              </Grid>
              <Grid size={6} className={classes.centerStyle}>
                <Button fullWidth variant="contained" onClick={handleClose}>Close</Button>
              </Grid>

            </Grid>
          </div>
        </div>
      </div>
    );

  }
  /////// end error handling////



  return (
    <Dialog open={openStatus} onClose={handleClose}>
      <DialogContent>
       {PanExperts()}
      </DialogContent>

    </Dialog>
  )
}

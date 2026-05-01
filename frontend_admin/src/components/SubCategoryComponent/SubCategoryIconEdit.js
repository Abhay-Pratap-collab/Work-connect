import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, Grid, Button, IconButton } from "@mui/material";
import { SubcategoryCss } from "./SubcategoryCss";

import { postData, serverURL } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



export default function SubCategoryIconEdit({ refresh, setRefresh, rowData, openStatus, setOpenStatus }) {
  const classes = SubcategoryCss();
  const [image, setSubcategoryIcon] = useState({ file: 'image-editing.png', bytes: '' })
  const handleImage = (e) => {
    setSubcategoryIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    setsaveBTnStatus(true)

  }
  const [saveBTnStatus, setsaveBTnStatus] = useState(false)
  const [subcategoryid, setSubcategoryid] = useState('')
  const [error, setError] = useState({ image: '' })
  const [loading, setLoading] = useState(false)
  const handleCancel = () => {
    setSubcategoryIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: '' })
    setsaveBTnStatus(false)
  }

  const saveCancelBtn = () => {
    return (<div style={{ display: "flex", width: "70%", justifyContent: "space-between" }}>
      <Button onClick={handleSubmit} variant="contained">Save</Button>
      <Button onClick={handleCancel} variant="contained" color="secondary">Cancel</Button>
    </div>)
  }


  useEffect(() => {
    setSubcategoryIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: '' })
    setSubcategoryid(rowData.subcategoryid)


  }, [rowData])

  const handleClose = () => {
    setOpenStatus(false)
    setsaveBTnStatus(false)



  }



  const handleSubmit = async () => {


    setLoading(true)


    var body = new FormData()
    body.append("subcategoryid", subcategoryid)
    body.append("icon", image.bytes)
    var res = await postData('subcategory/edit_subcategory_icon', body)
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

  const SubcategoryForm = () => {
    return (
      <div className={classes.rootEdit}>
        <div className={classes.boxEdit}>
          <div className={classes.heading}>
            <div className={classes.headingGroupStyle}>
              <img src="/logo.png" className={classes.imageStyle} />
              <span className={classes.haedingText}>Edit subcategory Icon</span>
            </div>
          </div>
          <div style={{ margin: 10, width: "96.5%" }}>
            <Grid spacing={2} container>
              <Grid size={12} className={classes.centerStyle}>
                <img src={`${image.file}`} style={{ width: 300 }} />
              </Grid>

              <Grid size={6} className={classes.centerStyle}>
                {saveBTnStatus ? saveCancelBtn() :
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>Upload New subcategory Image
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
        {SubcategoryForm()}
      </DialogContent>

    </Dialog>
  )
}

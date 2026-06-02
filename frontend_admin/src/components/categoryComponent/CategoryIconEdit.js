import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, Grid, Button, IconButton } from "@mui/material";
import { CategoryCss } from "./CategoryCss";

import { postData, serverURL } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



export default function CategoryIconEdit({ refresh, setRefresh, rowData, openStatus, setOpenStatus }) {
  const classes = CategoryCss();
  const [categoryIcon, setCategoryIcon] = useState({ file: 'image-editing.png', bytes: '' })
  const handleImage = (e) => {
    setCategoryIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    setsaveBTnStatus(true)

  }
  const [saveBTnStatus, setsaveBTnStatus] = useState(false)
  const [categoryid, setCategoryid] = useState('')
  const [error, setError] = useState({ categoryIcon: '' })
  const [loading, setLoading] = useState(false)
  const handleCancel = () => {
    setCategoryIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: '' })
    setsaveBTnStatus(false)
  }

  const saveCancelBtn = () => {
    return (<div style={{ display: "flex", width: "70%", justifyContent: "space-between" }}>
      <Button className={classes.saveButton} onClick={handleSubmit} variant="contained">Save</Button>
      <Button onClick={handleCancel} variant="contained" color="secondary">Cancel</Button>
    </div>)
  }


  useEffect(() => {
    setCategoryIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: '' })
    setCategoryid(rowData.categoryid)


  }, [rowData])

  const handleClose = () => {
    setOpenStatus(false)
    setsaveBTnStatus(false)



  }



  const handleSubmit = async () => {


    setLoading(true)


    var body = new FormData()
    body.append("categoryid", categoryid)
    body.append("icon", categoryIcon.bytes)
    var res = await postData('category/edit_category_icon', body)
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

  const categoryForm = () => {
    return (
      <div className={classes.rootEdit}>
        <div className={classes.boxEdit}>
          <div className={classes.heading}>
            <div className={classes.headingGroupStyle}>
              <img src="/wt.jpg" className={classes.imageStyle} />
              <span className={classes.haedingText}>Edit category Icon</span>
            </div>
          </div>
          <div style={{ margin: 10, width: "96.5%" }}>
            <Grid spacing={2} container>
              <Grid size={12} className={classes.centerStyle}>
                <img src={`${categoryIcon.file}`} style={{ width: 300 }} />
              </Grid>

              <Grid size={6} className={classes.centerStyle}>
                {saveBTnStatus ? saveCancelBtn() :
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>Upload New category Image
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
        {categoryForm()}
      </DialogContent>

    </Dialog>
  )
}

import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, Grid, Button, IconButton } from "@mui/material";
import { useStyles } from "./DisplayAllCategoryCss";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";



export default function CategoryEdit({ refresh, setRefresh, rowData, openStatus, setOpenStatus }) {
  const classes = useStyles();
  const [categoryname, setCategoryName] = useState('')
  const [categoryid, setCategoryId] = useState('')
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCategoryName(rowData.categoryname)
    setCategoryId(rowData.categoryid)

  }, [rowData])

  const handleClose = () => {
    setOpenStatus(false)
  }


  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }))
    console.log('Error', error)
  }

  const validate = () => {
    var error = false
    if (categoryname.trim().length == 0) {
      handleError("categoryname", "Category name should not blank...")
      error = true
    }
    return error
  }



  const handleSubmit = async () => {
    var status = validate()

    if (status == false)
      setLoading(true)
    {
      var body = { categoryid, categoryname }

      var res = await postData('category/edit_category', body)
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
    }
  }
  //error handling////

  const categoryForm = () => {
    return (
      <div className={classes.rootEdit}>
        <div className={classes.boxEdit}>
          <div className={classes.heading}>
            <div className={classes.headingGroupStyle}>
              <img src="/wt.jpg" className={classes.imageStyle} />
              <span className={classes.haedingText}>Edit Category</span>
            </div>
          </div>
          <div style={{ margin: 10, width: "96.5%" }}>
            <Grid spacing={2} container>
              <Grid size={12}>
                <TextField
                  value={categoryname}
                  onFocus={() => handleError('categoryname', '')}
                  helperText={error.categoryname}
                  error={error.categoryname}
                  onChange={(e) => setCategoryName(e.target.value)}
                  fullWidth label="Category Name"
                  variant="outlined" />
              </Grid>

              <Grid size={6} className={classes.centerStyle}>
                <Button loading={loading} className={classes.saveButton} onClick={handleSubmit} fullWidth variant="contained">Save</Button>

              </Grid>
              <Grid size={6} className={classes.centerStyle}>
                <Button fullWidth  className={classes.closeButton} variant="contained" onClick={handleClose}>Close</Button>
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

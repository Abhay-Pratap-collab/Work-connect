import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, Grid, Button, IconButton } from "@mui/material";
import { useStyles } from "./DisplaySubCss";
import { getData, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";





export default function SubcategoryEdit({ refresh, setRefresh, rowData, openStatus, setOpenStatus }) {
  const classes = useStyles();
  const [subcategoryname, setsubCategoryName] = useState('')
  const [subcategoryid, setsSubcategoryId] = useState('')
  const [error, setError] = useState({ cityIcon: '' })
  const [loading, setLoading] = useState(false)
  const [categoryid, setCategoryid] = useState('')
  const [categorylist, setCategoryList] = useState([])

  const fetchAllCategory = async () => {
    var res = await getData("category/fetch_all_category")
    setCategoryList(res.data)
  }
  useEffect(() => {
    fetchAllCategory()
  }, [])
  
  const fillCategory = () => {
    return categorylist.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
  }


  useEffect(() => {
    setsubCategoryName(rowData.subcategoryname)
    setsSubcategoryId(rowData.subcategoryid)
    setCategoryid(rowData.categoryid)

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
    if (subcategoryname.length == 0) {
      handleError("subcategory", "SubCategory name should not blank...")
      error = true
    }
    return error
  }



  const handleSubmit = async () => {
    var status = validate()

    if (status == false)
      setLoading(true)
    {
      var body = { subcategoryid, subcategoryname,categoryid }

      var res = await postData('subcategory/edit_subcategory', body)
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

  const SubcategoryForm = () => {
    return (
      <div className={classes.rootEdit}>
        <div className={classes.boxEdit}>
          <div className={classes.heading}>
            <div className={classes.headingGroupStyle}>
              <img src="/logo.png" className={classes.imageStyle} />
              <span className={classes.haedingText}>Edit SubCategory</span>
            </div>
          </div>
          <div style={{ margin: 10, width: "96.5%" }}>
            <Grid spacing={2} container>
              <Grid size={12}>
                <FormControl fullWidth>
                  <InputLabel>Category Code</InputLabel>
                  <Select label="Category Code" value={categoryid} onChange={(e) => setCategoryid(e.target.value)}>
                    <MenuItem>--Select category--</MenuItem>
                   {fillCategory()}
                  </Select>
                </FormControl>

              </Grid>
              <Grid size={12}>
                <TextField
                  value={subcategoryname}
                  onFocus={() => handleError('subcategoryname', '')}
                  helperText={error.subcategoryname}
                  error={error.subcategoryname}
                  onChange={(e) => setsubCategoryName(e.target.value)}
                  fullWidth label="subcategory Name"
                  variant="outlined" />
              </Grid>

              <Grid size={6} className={classes.centerStyle}>
                <Button loading={loading} onClick={handleSubmit} fullWidth variant="contained">Save</Button>

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

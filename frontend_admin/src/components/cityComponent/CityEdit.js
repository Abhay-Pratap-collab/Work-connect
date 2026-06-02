import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, Grid, Button, IconButton } from "@mui/material";
import { useStyles } from "./CityCss";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";


export default function CityEdit({ refresh, setRefresh, rowData, openStatus, setOpenStatus }) {
  const classes = useStyles();
  const [cityName, setCityName] = useState('')
  const [cityId, setcityId] = useState('')
  const [error, setError] = useState({ cityIcon: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCityName(rowData.cityname)
    setcityId(rowData.cityid)

  }, [rowData])

  const handleClose = () => {
    setOpenStatus(false)
  }


  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }))
    console.log('Error', error)
  }
  const validate = () => {
    var isValid = true

    if (!cityName || cityName.trim().length === 0) {
      handleError("cityName", "City name should not be blank...")
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async () => {
    var status = validate()

    // Bug Fix: Enclosed the API request properly inside the validation block
    if (status === true) {
      setLoading(true)
      var body = { cityname: cityName, cityid: cityId }

      var res = await postData('cities/edit_city', body)
      setLoading(false);

      if (res && res.status) {
        Swal.fire({
          icon: "success",
          title: res.message || "City updated successfully",
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
        setOpenStatus(false)
        setRefresh(!refresh)
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: res?.message || "Server error occurred",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  }
  //error handling////

  const cityForm = () => {
    return (
      <div className={classes.rootEdit}>
        <div className={classes.boxEdit}>
          <div className={classes.heading}>
            <div className={classes.headingGroupStyle}>
              <img src="/wt.jpg" className={classes.imageStyle} />
              <span className={classes.haedingText}>Edit City</span>
            </div>
          </div>
          <div style={{ margin: 10, width: "96.5%" }}>
            <Grid spacing={2} container>
              <Grid size={12}>
                <TextField
                  value={cityName}
                  onFocus={() => handleError('cityName', '')}
                  helperText={error.cityName}
                  error={error.cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  fullWidth label="City Name"
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
        {cityForm()}
      </DialogContent>

    </Dialog>
  )
}

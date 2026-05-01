import { useStyle } from "./DocumentCss";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { postData, getData, serverURL } from "../../services/FetchNodeServices";
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Button, backdropClasses, boxClasses, Dialog, DialogContent } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function DocumentEdit({ refresh, setRefresh, rowData, openStatus, setOpenStatus }) {
  const classes = useStyle();
  const [image, setImage] = useState({ file: '', bytes: '' });
  const [imagename, setImageName] = useState('')
  const [fieldname, setFieldName] = useState('')
  const [api, setApi] = useState('')
  const [selectvalue, setSelectValue] = useState('')
  const [saveBTnStatus, setsaveBTnStatus] = useState(false);
  const [expertid, setExpertsId] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (rowData && rowData.expertid) {
      setExpertsId(rowData.expertid)
    }

  }, [rowData])

  const changeImage = (item) => {
    setSelectValue(item)
    setsaveBTnStatus(false)
    if (item === 'user') {
      setImage({ file: `${serverURL}/images/${rowData.photograph}`, bytes: '' });
      setImageName('photograph'); // Matches upload.single('photo')
      setApi('experts/edit_photo');
    }
    else if (item == 'aadhar') {
      setImage({ file: `${serverURL}/images/${rowData.aadharfile}`, bytes: '' });
      setImageName('aadharfile'); // Matches upload.single('photo')
      setApi('experts/edit_adhar');

    }
    else if (item == 'pan') {
      setImage({ file: `${serverURL}/images/${rowData.panfile}`, bytes: '' });
      setImageName('panfile'); // Matches upload.single('photo')
      setApi('experts/edit_pan');

    }
    else if (item == 'license') {
      setImage({ file: `${serverURL}/images/${rowData.licensefile}`, bytes: '' });
      setImageName('licensefile'); // Matches upload.single('photo')
      setApi('experts/edit_license');

    }
  }

  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0]


      })
      setsaveBTnStatus(true);
    }
    {

    }
  }
  const handleCancel = () => {
    // Reverts to the original image using the dynamic imageName key
    setImage({ file: `${serverURL}/images/${rowData[imagename]}`, bytes: '' });
    setsaveBTnStatus(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const body = new FormData();
    body.append("expertid", expertid);
    body.append(imagename, image.bytes); // Correctly appends the file with the expected key

    const res = await postData(api, body);

    setLoading(false);
    if (res.status) {
      Swal.fire({
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
      setOpenStatus(false);
      setRefresh(!refresh);
      setSelectValue('')
    } else {
      Swal.fire({ icon: "error", title: "Update Failed", text: res.message });
    }
    setsaveBTnStatus(false);
  };
  const handleClose = () => {
    setOpenStatus(false);
    setsaveBTnStatus(false);
    setSelectValue('');
  };

  const saveCancelBtn = () => (
    <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly", marginTop: '10px' }}>
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
        {loading ? 'Updating...' : 'Save Changes'}
      </Button>
      <Button onClick={handleCancel} variant="contained" color="secondary">
        Cancel
      </Button>
    </div>
  );

  const UploadSection = () => {
    if (!selectvalue) return null
    return (
      <Grid container spacing={2}>


        <Grid size={12} style={{ textAlign: 'center' }}>
          <span>Preview</span>
          <img src={image.file}
            style={{ width: '100%', maxHeight: 250 }}
            alt="Preview"
          ></img>
        </Grid>
        <Grid size={12} style={{ display: 'flex', justifyContent: 'center' }}>
          {saveBTnStatus ? saveCancelBtn() : (
            <Button component="label" variant="contained" fullWidth>Upload New {selectvalue.toUpperCase()} Picture
              <input onChange={handleImage} type="file" hidden accept="image/png" />
            </Button>
          )}

        </Grid>
      </Grid>
    )
  }




  return (
    <Dialog open={openStatus} fullWidth maxWidth="sm" onClose={handleClose}>
      <DialogContent>
        <div className={classes.root}>
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
                    <InputLabel>Select Document</InputLabel>
                    <Select
                      value={selectvalue}
                      onChange={(e) => changeImage(e.target.value)}
                    >
                      <MenuItem value=""><em>-- Choose a document --</em></MenuItem>
                      <MenuItem value="user">Profile Photograph</MenuItem>
                      <MenuItem value="aadhar">Aadhar Card</MenuItem>
                      <MenuItem value="pan">PAN Card</MenuItem>
                      <MenuItem value="license">Driving License</MenuItem>



                    </Select>
                  </FormControl>

                </Grid>
                <UploadSection /> {/* This simple tag replaces the whole block! */}
                <Grid item xs={12}>
                  <Button onClick={handleClose}>Close</Button>
                </Grid>
              </Grid>

            </div>


          </div>

        </div>
      </DialogContent>
    </Dialog>
  )

}
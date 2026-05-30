// Importing UI components from Material UI
import { TextField, Grid, Button, IconButton } from "@mui/material";

// Importing custom CSS styles
import { useStyles } from "./CityCss";

// Importing upload icon
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// React hook for state management
import { useState } from "react";

// Function to send API request
import { postData } from "../../services/FetchNodeServices";

// SweetAlert for popup messages
import Swal from "sweetalert2";



// Hook for navigation (React Router)
import { useNavigate } from "react-router";

// Main component
export default function City() {

  // Using custom styles
  const classes = useStyles();

  // Navigation function
  var navigate = useNavigate()

  // State for city name input
  const [cityName, setCityName] = useState('')

  // State for city image (file preview + actual file)
  const [cityIcon, setCityIcon] = useState({ file: '/image-editing.png', bytes: '' })

  // State for error messages
  const [error, setError] = useState({ cityIcon: '', cityName: '' })

  // State for loading button
  const [loading, setLoading] = useState(false)

  // Function to handle image upload
  const handleImage = (e) => {
    // Creating preview URL + storing file
    setCityIcon({
      file: URL.createObjectURL(e.target.files[0]),
      bytes: e.target.files[0]
    })

    // Remove error when image selected
    handleError('cityIcon', '')
  }

  // Function to set error messages dynamically
  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }))
    console.log('Error', error) // debugging
  }

  // Validation function

  // Reset form data
  const resetData = () => {
    setCityIcon({ file: "india-gate.png", bytes: "" })
    setCityName('')
  }

  // Validation function
  const validate = () => {
    var error = true; // Start assuming "True" (No errors)

    // Check if city name is empty
    if (cityName.trim().length === 0) {
      handleError("cityName", "City name should not blank...");
      error = false; // Set to false because there IS an error
    }

    // Check if image is not selected
    // Using .length == 0 matches your cityName logic
    if (!cityIcon.bytes) {
      handleError("cityIcon", "Choose city image...");
      error = false; // Set to false because there IS an error
    }

    return error; // returns true if everything is OK, false if error exists
  };

  // Submit form
  const handleSubmit = async () => {
    // Run validation
    var status = validate();

    // If status is true (No errors) → proceed
    if (status == true) {
      setLoading(true);

      var body = new FormData();
      body.append("cityname", cityName);
      body.append("cityicon", cityIcon.bytes);

      // API call (Wrap the logic inside the IF block)
      var res = await postData('cities/add_new_city', body);

      // Safety check for 'res' before reading '.status'
      if (res && res.status) {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
        setLoading(false);
        resetData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Server error or connection failed"
        });
        setLoading(false);
      }
    }
    // Note: If status was false, the code does nothing here except show errors.
  };




  return (
    <div className={classes.root}> {/* Main container */}

      <div className={classes.box}> {/* Box container */}

        <div className={classes.heading}> {/* Heading section */}

          <div className={classes.headingGroupStyle}>
            <div>


              {/* Logo */}
              <img src="/Wt.jpg" className={classes.imageStyle} style={{ width: '90px' }} />
            </div>

            {/* Title */}
            <span className={classes.haedingText}>City Interface</span>

            {/* Navigate to display page */}
            <img onClick={() => navigate('/dashboard/displayallcity')} src="/report.png" className={classes.imageStyle} />

          </div>

        </div>

        {/* Form container */}
        <div style={{ margin: 10, width: "96.5%" }}>

          <Grid spacing={2} container>

            {/* City Name Input */}
            <Grid size={12}>
              <TextField
                onFocus={() => handleError('cityName', '')} // clear error
                helperText={error.cityName} // show error text
                error={error.cityName} // highlight error
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                fullWidth
                label="City Name"
                variant="outlined"
              />
            </Grid>
            {/* Upload Button */}
            <Grid size={6} className={classes.centerStyle}>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload City Image
                {/* Hidden file input */}
                <input
                  multiple
                  onChange={handleImage}
                  type="file"
                  hidden
                  accept="image/png"
                />
              </Button>
              {/* Error text */}
              <span className={classes.errorTextStyle}>
                {error.cityIcon}
              </span>
            </Grid>
            {/* Image Preview */}
            <Grid size={6} className={classes.centerStyle}>
              <img src={cityIcon.file} className={classes.imageStyle} />
            </Grid>
            {/* Save Button */}
            <Grid size={6} className={classes.centerStyle}>
              <Button
                loading={loading} // ❌ MUI Button doesn’t support this directly
                onClick={handleSubmit}
                fullWidth
                variant="contained"
              >
                Save
              </Button>
            </Grid>
            {/* Reset Button */}
            <Grid size={6} className={classes.centerStyle}>
              <Button
                fullWidth
                variant="contained"
                onClick={resetData}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
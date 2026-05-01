import { useStyle } from "./ExpertsCss"
import { use, useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { postData, getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Button, backdropClasses, boxClasses , Paper,Typography} from "@mui/material"

export default function Experts() {
    const classes = useStyle()
    var navigate = useNavigate()
    // icons

    const [aadharfile, setAadharFile] = useState({ file: "image-editing.png", bytes: '' })
    const [panfile, setPanFile] = useState({ file: "image-editing.png", bytes: '' })
    const [licensefile, setLicenseFile] = useState({ file: "image-editing.png", bytes: '' });
    const [photograph, setPhotograph] = useState({ file: "image-editing.png", bytes: '' });
    const defaultIcon = { file: "image-editing.png", bytes: '' };

    // id's category or subcategory
    const [categoryid, setCategoryId] = useState('')
    const [subcategoryid, setSubCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    // current address
    const [currentstateid, setCurrentStateId] = useState('')
    const [currentcityid, setCurrentCityId] = useState('')
    const [currentCityList, setCurrentCityList] = useState([]);
    const [currentpincode, setCurrentPincode] = useState('')
    const[currentaddress,setCurrentAddress]=useState('')
// permanent address

    const [permanetstateid, setPermanentStateId] = useState('')
    const [permanentcityid, setPermanentCityId] = useState('')
    const [permanentCityList, setPermanentCityList] = useState([]);
    const [permanentpincode, setPermanentPincode] = useState('')
        const[permanentaddress,setPermanentAddress]=useState('')

    // fetch 
    // const [currentstateList, setCurrentStateList] = useState([])
    // const [permanentstateList, setPermanentStateList] = useState([])
    const [statelist, setStateList] = useState([])
    const [cityList, setCityList] = useState([])

    // inputs
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [fathername, setFatherName] = useState('')
    const [dob, setDob] = useState('')

    // const [dob, setDob] = useS   tate(new Date().toISOString().split('T')[0])
    const [gender, setGender] = useState('')
    const [emailid, setEmailId] = useState('')
    const [mobileno, setMobileNo] = useState('')
    const [aadharid, setAadharId] = useState('')
    const [panid, setPanId] = useState('')
    const [vehicleno, setVehicleNo] = useState('')
    const [vehicletype, setVehicleType] = useState('')
    const [license, setLicense] = useState('')

    // const [permanentstate, setPermanentState] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value)
        fetchAllSubCategory(e.target.value)

    }



    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
        console.log('Error', error) // debugging
    }

    const validate = () => {
        var error = true; // true means "Form is Valid"

        // 1. Category & SubCategory
        if (!categoryid) {
            handleError("categoryid", "Please select a category");
            error = false;
        }
        if (!subcategoryid) {
            handleError("subcategoryid", "Please select a subcategory");
            error = false;
        }

        // // 2. Personal Details
        if (firstname.trim().length === 0) {
            handleError("firstname", "First name is required");
            error = false;
        }
        if (lastname.trim().length === 0) {
            handleError("lastname", "Last name is required");
            error = false;

        }

        if (fathername.trim().length === 0) {
            handleError("fathername", "father name is required");
            error = false;
        }
        if (!dob) {
            handleError("dob", "Please select date of birth");
            error = false;
        }
        if (!gender) {
            handleError("gender", "Please select gender");
            error = false;
        }

        // 3. Contact Info
        // Simple regex for email validation

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailid) {
            handleError("emailid", "Invalid email format");
            error = false;
        }
        if (mobileno.length !== 10) {
            handleError("mobileno", "Phone number must be 10 digits");
            error = false;
        }

        // // 4. Address & IDs
        // if (!currentstateid) {
        //     handleError("stateid", "Select current state");
        //     error = false;
        // }
        // if (!cityid) {
        //     handleError("cityid", "Select current city");
        //     error = false;
        // }
        if (currentpincode.length !== 6) {
            handleError("currentpincode", "Invalid current pincode");
            error = false;

        }
        // if (currentpincode.length !== 6) {
        //     handleError("permanentpincode", "Invalid current pincode");
        //     error = false;

        // }

        if (aadharid.length !== 12) {
            handleError("adharid", "Aadhar must be 12 digits");
            error = false;
        }
        if (panid.trim().length !== 10) {
            handleError("panid", "PAN number is required");
            error = false;
        }
        if (vehicleno.trim().length === 0) {
            handleError("vehicleid", "vehiclenumber is required");
            error = false;
        }
        if (vehicletype.trim().length === 0) {
            handleError("vehicletype", "type is required");
            error = false;
        }

        if (license.trim().length === 0) {
            handleError("licenseid", "id is required");
            error = false;
        }
        // 5. Image Validations (Checking .bytes)
        if (!aadharfile.bytes) {
            handleError("adharfile", "Please upload Aadhar photo");
            error = false;
        }
        if (!panfile.bytes) {
            handleError("panicon", "Please upload PAN photo");
            error = false;
        }
        if (!photograph.bytes) {
            handleError("photograph", "Please upload expert photograph");
            error = false;
        }
        if (!licensefile.bytes) {
            handleError("licensefile", "Please upload license photo");
            error = false;
        }

        return error; // returns true if no errors found
    };
    // fetch all category start 
    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_all_category")
        setCategoryList(res.data)

    }
    useEffect(() => {

        fetchAllCategory()
    }, [])

    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }
    // end fetch category 


    // start fetch subcategory 

    const fetchAllSubCategory = async (cid) => {
        var res = await getData(`subcategory/fetch_all_subcategory_by_id?categoryid=${cid}`)
        setSubCategoryList(res.data)


    }


    const fillSubCategory = () => {
        return subCategoryList.map((item) => {
            return <MenuItem value={item.subcategoryid}>
                {item.subcategoryname}
            </MenuItem>
        })
    }


    const fetchAllState = async () => {
        var res = await getData("experts/fetch_all_state")
        setStateList(res.data)
    }
    useEffect(() => {

        fetchAllState()
    }, [])
    const fillAllState = () => {
        return statelist.map((item) => {
            return <MenuItem value={item.stateid}>
                {item.statename}
            </MenuItem>
        })
    }



    const fetchAllCity = async (cid) => {
        // Check if cid exists to avoid unnecessary calls
        if (!cid) {
            setCityList([]);
            return;
        }

        var res = await getData(`experts/fetch_all_city?stateid=${cid}`);

        if (res && res.data) {
            setCityList(res.data);
        } else {
            // If no cities found or server error, reset the list to empty
            setCityList([]);
        }
    }
    const handleCurrentStateChange = async (e) => {
        const cid = e.target.value;
        setCurrentStateId(cid);
        fetchAllCity(cid); // Fetches cities for the current address dropdown
        var res = await getData(`experts/fetch_all_city?stateid=${cid}`);
        if (res && res.status) {
            setCurrentCityList(res.data);
        }
    };


    const handlePermanentStateChange = async (e) => {
        const cid = e.target.value;
        setPermanentStateId(cid);
        fetchAllCity(cid); // Note: This will overwrite cityList. 
        var res = await getData(`experts/fetch_all_city?stateid=${cid}`);
        if (res && res.status) {
            setPermanentCityList(res.data);
        }
    };

    const fillAllCity = () => {
        return cityList.map((item) => {
            return <MenuItem value={item.cityid}>
                {item.cityname}
            </MenuItem>
        })
    }

    // image handiling 
    const handleImage = (e) => {
        const name = e.target.name
        const file = e.target.files[0]
        const fileData = {
            file: URL.createObjectURL(file),
            bytes: file
        };
        if (name === "aadhar") {
            setAadharFile(fileData);
        }
        else if (name === "pan") {
            setPanFile(fileData);

        }
        else if (name === "license") {
            setLicenseFile(fileData);
        }
        else if (name === "photograph") {
            setPhotograph(fileData);
        }

    }
    const handleReset = () => {
        setCategoryId('');
        setSubCategoryId('');
        setFirstName('');
        setLastName('');
        setFatherName('');
        setDob('');
        setGender('');
       setEmailId('')
        setMobileNo('')
        setAadharId('')
        setPanId('');
      setVehicleNo('')
        setVehicleType('');
       setLicense('')
        setCurrentStateId('');
        setCurrentCityId('')
        setPermanentStateId('')
        setPermanentCityId('')
        setCurrentPincode('');
        setPermanentPincode('');
        setCurrentAddress('')
        setPermanentAddress('')

        // Reset Icons
        setAadharFile(defaultIcon);
        setPanFile(defaultIcon);
        setLicenseFile(defaultIcon);
        setPhotograph(defaultIcon);
    };



    const handleSubmit = async () => {

        var status = validate();
        if (status == true) {

            setLoading(true);

            var body = new FormData();
            body.append("categoryid", categoryid);
            body.append("subcategoryid", subcategoryid);
            body.append("firstname", firstname);
            body.append("lastname", lastname);
            body.append("fathername", fathername);
            body.append("dob", dob);
            body.append("gender", gender);
            body.append("emailid", emailid);
            body.append("mobileno", mobileno);
            body.append('aadharid', aadharid);
            body.append("panid", panid);
            body.append("vehicleno", vehicleno);
            body.append("vehicletype", vehicletype);
            body.append("license", license);
            body.append("currentstate", currentstateid);
            // body.append("currentcity", cityid);
            body.append("currentcity", currentcityid)
            body.append("currentpincode", currentpincode);
            body.append('currentaddress',currentaddress)
            body.append("permanentstate", permanetstateid)
            body.append("permanentcity", permanentcityid);
            body.append("permanentpincode", permanentpincode);
            body.append('permanentaddress',permanentaddress)

            // 2. Append the actual file 'bytes'
           body.append("aadharfile",aadharfile.bytes)
            body.append("panfile", panfile.bytes);
            body.append("photograph", photograph.bytes);
            body.append("licensefile", licensefile.bytes);

            var res = await postData("experts/add_experts", body);
            if (res && res.status) {
                Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
                setLoading(false);
                handleReset()
            }
            else {
                // alert("error")
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Server error or connection failed"
                });
                setLoading(false);
            }

        }
    };





    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <div className={classes.heading}>
                    <div className={classes.headingGroupStyle}>
                        <img src="/logo.png" className={classes.imageStyle} />
                        <span className={classes.haedingText}>Experts</span>
                        <img onClick={() => navigate('/displayexperts')} src="/report.png" className={classes.imageStyle} />

                    </div>

                </div>
                <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
            User Information Form
        </Typography>
                <div style={{ margin: 10, width: "96.5%" }}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel>Category</InputLabel>
                                <Select label="Category" value={categoryid} onChange={handleCategoryChange} >
                                    <MenuItem>--select Category--</MenuItem>
                                    {fillCategory()}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel>SubCategory</InputLabel>
                                <Select label="SubCategory" value={subcategoryid} onChange={(e) => setSubCategoryId(e.target.value)}>
                                    <MenuItem>--select SubCategory--</MenuItem>
                                    {fillSubCategory()}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={12}>
                            
                        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '15px' }}>Personal Information</Typography>
                        </Grid>

                       
                        <Grid size={4}>
                            <TextField
                                onFocus={() => handleError('firstname', '')}
                                helperText={error.firstname}
                                error={error.firstname}
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                variant="standard"
                                fullWidth
                                label="FirstName"
                            />
                        </Grid>

                        <Grid size={4}>
                            <TextField
                                onFocus={() => handleError('lastname', '')}
                                helperText={error.lastname}
                                error={error.lastname}
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                variant="standard"
                                fullWidth
                                label="LastName"
                            />
                        </Grid>

                        <Grid size={4}>
                            <TextField
                                onFocus={() => handleError('fathername', '')}
                                helperText={error.fathername}
                                error={error.fathername}
                                variant="standard"
                                fullWidth
                                label="FatherName"
                                value={fathername}
                                onChange={(e) => setFatherName(e.target.value)}
                            />
                        </Grid >
                        <Grid size={6}>
                            <TextField
                                fullWidth
                                onFocus={() => handleError('dob', '')}
                                helperText={error.dob}
                                error={error.dob}

                                type="date"
                                defaultValue="2000-01-01"
                                variant="standard"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}

                            />

                        </Grid>
                        <Grid size={6}>
                            <FormControl component="fieldset" variant="outlined" style={{border: '1px solid #ccc', borderRadius: '4px', padding: '10px', width: '100%'}} >
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}
                                    onFocus={() => handleError('gender', '')}
                                    helperText={error.gender}
                                    error={error.gender}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />

                                </RadioGroup>
                            </FormControl>
                        </Grid>
                      
                        <Grid size={6}>
                            <TextField
                                onFocus={() => handleError('emailid', '')}
                                helperText={error.emailid}
                                error={error.emailid}
                                value={emailid}
                                onChange={(e) => setEmailId(e.target.value)}
                                label="email"
                                type="email"
                                variant="standard"

                            />

                        </Grid>
                        <Grid size={6}>
                            <TextField label="Phone Number"
                                variant="standard"
                                type="tel"
                                value={mobileno}
                                onChange={(e) => setMobileNo(e.target.value)}
                                onFocus={() => handleError('mobileno', '')}
                                helperText={error.mobileno}
                                error={error.mobileno} />
                        </Grid>
                        <Grid size={12} >
                            <span style={{ justifyContent: "center", display: "flex" }}>Current Address</span>
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>State</InputLabel>
                                <Select value={currentstateid} onChange={handleCurrentStateChange}>
                                    <MenuItem>--select state--</MenuItem>
                                    {/* {fillAllCurrentState()} */}
                                    {fillAllState()}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>City</InputLabel>
                                <Select value={currentcityid} onChange={(e) => setCurrentCityId(e.target.value)}>
                                    <MenuItem value="">--select City--</MenuItem>
                                    {currentCityList.map((item) => (
                                        <MenuItem key={item.cityid} value={item.cityid}>{item.cityname}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>



                        </Grid>
                        <Grid size={4}>
                            <TextField
                                onFocus={() => handleError('currentpincode', '')}
                                helperText={error.currentpincode}
                                error={error.currentpincode}
                                variant="outlined"
                                value={currentpincode}
                                onChange={(e) => setCurrentPincode(e.target.value)}
                                fullWidth
                                label="PinCode"
                            />
                        </Grid>
                        <Grid size={12}>
                                    <TextField
                                      value={currentaddress}
                                      onChange={(e) => setCurrentAddress(e.target.value)}
                                      variant="standard"
                                      fullWidth
                                      label="currentaddress"
                                    />
                                  </Grid>
                        <Grid size={12} >
                            <span style={{ justifyContent: "center", display: "flex" }}>Permanent Address</span>
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>State</InputLabel>
                                <Select value={permanetstateid} onChange={handlePermanentStateChange} >
                                    <MenuItem>--select state--</MenuItem>
                                    {/* {fillPermanenttState()} */}
                                    {fillAllState()}
                                </Select>
                            </FormControl>


                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>City</InputLabel>
                                <Select value={permanentcityid} onChange={(e) => setPermanentCityId(e.target.value)}>
                                    <MenuItem value="">--select City--</MenuItem>
                                    {permanentCityList.map((item) => (
                                        <MenuItem key={item.cityid} value={item.cityid}>{item.cityname}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


                        </Grid>
                        <Grid size={4}>
                            <TextField
                                onFocus={() => handleError('permanentpincode', '')}
                                helperText={error.permanentpincode}
                                error={error.permanentpincode}
                                variant="outlined"
                                fullWidth
                                label="PinCode"
                                value={permanentpincode}
                                onChange={(e) => setPermanentPincode(e.target.value)}
                            />
                        </Grid>
                          <Grid size={12}>
                                    <TextField
                                      value={permanentaddress}
                                      onChange={(e) => setPermanentAddress(e.target.value)}
                                      variant="standard"
                                      fullWidth
                                      label="permanentaddress"
                                    />
                                  </Grid>




                        <Grid size={12}>
                            <span style={{ justifyContent: "center", display: "flex" }}>
                                Document
                            </span>
                        </Grid>

                        <Grid size={4}>
                            <TextField label="Aadhar Number" variant="outlined"
                                value={aadharid} onChange={(e) => setAadharId(e.target.value)}
                                onFocus={() => handleError('aadharid', '')}
                                helperText={error.aadharid}
                                error={error.aadharid} />
                        </Grid>
                        <Grid size={4} className={classes.centerStyle}>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                upload Adhar
                                <input
                                    multiple
                                    type="file"
                                    hidden
                                    onChange={handleImage}
                                    name="aadhar"
                                    accept="image/png"
                                // value={adharicon}
                                >
                                </input>
                            </Button>
                            {/* Error text */}
                            <span className={classes.errorTextStyle}>
                                {error.adharicon}
                            </span>
                        </Grid>
                        <Grid size={4} className={classes.centerStyle}>
                            <img
                                src={aadharfile.file}
                                className={classes.imageStyle}
                            />
                        </Grid>



                        <Grid size={4}>
                            <TextField label="Pan Number" variant="outlined" value={panid} onChange={(e) => setPanId(e.target.value)}
                                onFocus={() => handleError('panid', '')}
                                helperText={error.panid}
                                error={error.panid} />
                        </Grid>
                        <Grid size={4} className={classes.centerStyle}>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                upload Pan
                                <input
                                    multiple
                                    type="file"
                                    hidden
                                    onChange={handleImage}
                                    accept="image/png"
                                    name="pan"
                                // value={panicon}
                                >
                                </input>
                            </Button>
                            {/* Error text */}
                            <span className={classes.errorTextStyle}>
                                {error.panicon}
                            </span>
                        </Grid>
                        <Grid size={4} className={classes.centerStyle}>
                            <img
                                src={panfile.file}
                                className={classes.imageStyle}
                            />
                        </Grid>
                        <Grid size={6} className={classes.centerStyle}>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                              Photograph
                                <input
                                    multiple
                                    type="file"
                                    hidden
                                    name="photograph"
                                    accept="image/png"
                                    onChange={handleImage}
                                // value={photo}
                                >
                                </input>
                            </Button>
                            {/* Error text */}
                            <span className={classes.errorTextStyle}>
                                {error.photo}
                            </span>
                        </Grid>
                        <Grid size={6} className={classes.centerStyle}>
                            <img
                                src={photograph.file}
                                className={classes.imageStyle}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField label="Vehicle number " variant="outlined"
                                value={vehicleno} onChange={(e) => setVehicleNo(e.target.value)}
                                onFocus={() => handleError('vehicleno', '')}
                                helperText={error.vehicleno}
                                error={error.vehicleno}

                            />
                        </Grid>
                                 <Grid size={6}> {/* Added Grid wrapper */}
                         <FormControl fullWidth variant="outlined">
                           <InputLabel>Vehicle Type</InputLabel>
                           <Select 
                             label="Vehicle Type" // Added label prop for correct border rendering
                             value={vehicletype} 
                             onChange={(e) => setVehicleType(e.target.value)} 
                           >
                             <MenuItem value="">--select--</MenuItem>
                             <MenuItem value="Two Wheeler">Two Wheeler</MenuItem>
                             {/* Fixed typo: changed "Wheller" to "Wheeler" */}
                             <MenuItem value="Four Wheeler">Four Wheeler</MenuItem> 
                           </Select>
                         </FormControl>
                       </Grid>
                        <Grid size={4}>
                            <TextField label="License Number " variant="outlined"
                                value={license}
                                onChange={(e) => setLicense(e.target.value)}
                                onFocus={() => handleError('license', '')}
                                helperText={error.license}
                                error={error.license} />
                        </Grid>
                        <Grid size={4} className={classes.centerStyle}>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload License
                                <input
                                    multiple
                                    type="file"
                                    hidden
                                    name="license"
                                    accept="image/png"
                                    onChange={handleImage}
                                // value={licenseicon}
                                >
                                </input>
                            </Button>
                            {/* Error text */}
                            <span className={classes.errorTextStyle}>
                                {error.licenseicon}
                            </span>
                        </Grid>
                        <Grid size={4} className={classes.centerStyle}>
                            <img
                                src={licensefile.file}
                                className={classes.imageStyle}
                            />
                        </Grid>
                        <Grid size={6} className={classes.centerStyle}>
                            <Button

                                fullWidth
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Grid>

                        <Grid size={6} className={classes.centerStyle}>
                            <Button

                                fullWidth
                                variant="contained"
                                onClick={handleReset}
                            >
                                reset
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            
        </div>

    )
}
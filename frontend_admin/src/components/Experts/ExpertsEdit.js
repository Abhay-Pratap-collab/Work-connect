import { Dialog, DialogContent, Grid, TextField, Button, InputLabel, FormControl, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, } from "@mui/material";
import { useEffect, useState } from "react";
import { postData, getData } from "../../services/FetchNodeServices";
import { useStyle } from "./DisplayExpertsCss";
import Swal from "sweetalert2";

export default function ExpertEdit({ refresh, setRefresh, rowData, openStatus, setOpenStatus }) {
  const classes = useStyle();
  const [expertid, setExpertsId] = useState('');
  const [categoryid, setCategoryId] = useState('');
  const [subcategoryid, setSubCategoryId] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [fathername, setFatherName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [emailid, setEmail] = useState('');
  const [mobileno, setMobile] = useState('');
  const [aadharid, setAdharId] = useState('');
  const [panno, setPanId] = useState('');
  const [vehicleno, setVehicleId] = useState('');
  const [vehicletype, setVehicleType] = useState('');
  const [license, setLicenseId] = useState('');

  const [currentpincode, setCurrentPincode] = useState('');
  const [currentaddress,setCurrentAddress]=useState('')

  const [permanentpincode, setPermanentPincode] = useState('');
  const [permanentaddress,setPermanentAddress]=useState('')
  const [categoryList, setCategoryList] = useState([])
  const [subcategoryList, setSubCategoryList] = useState([])
  const [statelist, setStateList] = useState([])
 const [currentCityList, setCurrentCityList] = useState([]);
 const [permanentCityList, setPermanentCityList] = useState([]);
 const [cityList, setCityList] = useState([])
     const [currentstateid, setCurrentStateId] = useState('')
     const [permanetstateid, setPermanentStateId] = useState('')
   const [currentcityid, setCurrentCityId] = useState('')
      const [permanentcityid, setPermanentCityId] = useState('')
      // const [vehcile,setVehicleType]=useState('')
  
  

  const [error, setError] = useState({})



  const [loading, setLoading] = useState(false);
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

        const fetchCitiesForCurrent = async (sid) => {
    var res = await getData(`experts/fetch_all_city?stateid=${sid}`);
    if (res.status) setCurrentCityList(res.data);
}

const fetchCitiesForPermanent = async (sid) => {
    var res = await getData(`experts/fetch_all_city?stateid=${sid}`);
    if (res.status) setPermanentCityList(res.data);
}
const fetchSubcategoryForCategory = async (sid)=>{
  var res  = await getData(`subcategory/fetch_all_subcategory_by_id=${sid}`)
  if(res.status) setSubCategoryList(res.data)
}
    
  
  // fetch all category from database 
  const fetchAllCategory = async () => {
    var res = await getData("category/fetch_all_category")
    setCategoryList(res.data)
  }

  useEffect(() => {
    fetchAllCategory()
  }, [])

  const fillCategory = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem key={item.categoryid} value={item.categoryid}>
        {item.categoryname}
      </MenuItem>
      )

    })
  }


  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value)
    fetchAllSubCategory(e.target.value)
    setSubCategoryId('');

  }


  const fetchAllSubCategory = async (cid) => {
    var res = await getData(`subcategory/fetch_all_subcategory_by_id?categoryid=${cid}`)
    setSubCategoryList(res.data)
  }

  //  useEffect(() => {
  //     fetchAllSubCategory()
  //   }, [])
  const fillSubCategory = () => {
    return subcategoryList.map((item) => {
      return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    })
  }










  useEffect(() => {
    setExpertsId(rowData.expertid || '');
    setCategoryId(rowData.categoryid || '');
if (rowData.categoryid) {
    fetchAllSubCategory(rowData.categoryid); 
  }
    setSubCategoryId(rowData.subcategoryid || '');
    setFirstName(rowData.firstname || '');
    setLastName(rowData.lastname || '');
    setFatherName(rowData.fathername || '');
    // setDob(rowData.dob || '');
    if (rowData.dob) {
      setDob(rowData.dob.split('T')[0]);
    } else {
      setDob('');
    }
    setGender(rowData.gender || '');
    setEmail(rowData.emailid || '');
    setMobile(rowData.mobileno || '');
    setAdharId(rowData.aadharid || '');
    setPanId(rowData.panno || '');
    setVehicleId(rowData.vehicleno || '');
    setVehicleType(rowData.vehicletype || '');
    setLicenseId(rowData.license || '');
    // address section 
    setCurrentStateId(rowData.currentstate || '');
    if (rowData.currentstate) fetchCitiesForCurrent(rowData.currentstate);
    setCurrentCityId(rowData.currentcity || '');
    setCurrentPincode(rowData.currentpincode || '');
    setCurrentAddress(rowData.currentaddress || '')
    setPermanentAddress(rowData.permanentaddress || '')
    // permanet address
    setPermanentStateId(rowData.permanentstate || '');
    if (rowData.permanentstate) fetchCitiesForPermanent(rowData.permanentstate);
    setPermanentCityId(rowData.permanentcity || '');
    setPermanentPincode(rowData.permanentpincode || '');

  }, [rowData]);

  const handleClose = () => {
    setOpenStatus(false);
  };

  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  const validate = () => {
    let isValid = true;
    if (!firstname || firstname.trim().length === 0) {
      handleError("firstname", "First name is required");
      // error = false
      isValid = false;
    }
    if (!categoryid) {
      handleError("categoryid", "City name should not blank...")
      isValid = false
    }
    return isValid
  };

  const handleSubmit = async () => {
    // alert('hi')
    var status = validate()
    if (status == true) {

      setLoading(true);
      const body = {
        expertid, firstname, lastname, fathername, mobileno, emailid, aadharid, panno, vehicleno, vehicletype, license, currentpincode, permanentpincode, categoryid, subcategoryid, gender,
        dob,currentstate: currentstateid,
  currentcity: currentcityid,
  permanentstate: permanetstateid,
  permanentcity: permanentcityid,currentaddress
      };
      const res = await postData('experts/edit_experts', body);
      setLoading(false);

      if (res.status) {
        Swal.fire({
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
        setLoading(false)
        setOpenStatus(false);
        setRefresh(!refresh);
      } else {
        Swal.fire({
          icon: "error",
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };


  const expertForm = () => (
    <div className={classes.rootEdit}>
      <div className={classes.boxEdit}>
        <Grid spacing={2} container>
          {/* Identity Info */}
          <Grid size={6}>
            <FormControl fullWidth >
              <InputLabel>Category</InputLabel>
              <Select label="Category" value={categoryid} onChange={handleCategoryChange}>
                <MenuItem value="">--select Category--</MenuItem>
                {fillCategory()}
              </Select>
            </FormControl>

          </Grid>
          <Grid size={6}>
            <FormControl fullWidth >
              <InputLabel>subcategorysCategory</InputLabel>
              <Select label="subCategory" value={subcategoryid} onChange={(e) => setSubCategoryId(e.target.value)} >
                <MenuItem value="">--selectsub Category--</MenuItem>
                {fillSubCategory()}
              </Select>
            </FormControl>

          </Grid>
          <Grid size={12}>
            <span className={classes.centerStyle}>Personal Information</span>

          </Grid>
          <Grid size={6}>
            <TextField
              // onFocus={() => handleError('firstname', '')}
              // helperText={error.firstname}
              // error={error.firstname}
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              variant="standard"
              fullWidth
              label="FirstName"
            />
          </Grid>
          <Grid size={6}>
            <TextField
              // onFocus={() => handleError('firstname', '')}
              // helperText={error.firstname}
              // error={error.firstname}
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              variant="standard"
              fullWidth
              label="LastName"
            />
          </Grid>


          <Grid size={12}><TextField value={fathername} onChange={(e) => setFatherName(e.target.value)} fullWidth label="Father's Name" /></Grid>

          <Grid size={6}><TextField value={dob} type="date" InputLabelProps={{ shrink: true }} onChange={(e) => setDob(e.target.value)} fullWidth label="DOB" /></Grid>


          <Grid size={6}><TextField value={gender} onChange={(e) => setGender(e.target.value)} fullWidth label="Gender" /></Grid>
          <Grid size={12}>
            <span className={classes.centerStyle}>Contact Information</span>

          </Grid>
          <Grid size={6}><TextField value={mobileno} onChange={(e) => setMobile(e.target.value)} fullWidth label="Mobileno" /></Grid>

          <Grid size={6}><TextField value={emailid} onChange={(e) => setEmail(e.target.value)} fullWidth label="Emailid" /></Grid>
           <Grid size={12}>
            <span className={classes.centerStyle}>Current Address </span>

          </Grid>
          {/* <Grid size={4}><TextField value={currentState} onChange={(e) => setCurrentState(e.target.value)} fullWidth label="Current State" /></Grid> */}
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
          {/* <Grid size={4}><TextField value={currentCity} onChange={(e) => setCurrentCity(e.target.value)} fullWidth label="Current City" /></Grid> */}
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
          <Grid size={4}><TextField value={currentpincode} onChange={(e) => setCurrentPincode(e.target.value)} fullWidth label="Current Pincode" /></Grid>
            <Grid size={12}>
                                    <TextField
                                      value={currentaddress}
                                      onChange={(e) => setCurrentAddress(e.target.value)}
                                      variant="standard"
                                      fullWidth
                                      label="currentaddress"
                                    />
                                  </Grid>

           <Grid size={12}>
            <span className={classes.centerStyle}>permanet Address </span>

          </Grid>

          {/* <Grid size={4}><TextField value={permanentState} onChange={(e) => setPermanentState(e.target.value)} fullWidth label="Permanent State" /></Grid> */}
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
          {/* <Grid size={4}><TextField value={permanentCity} onChange={(e) => setPermanentCity(e.target.value)} fullWidth label="Permanent City" /></Grid> */}
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
          <Grid size={4}><TextField value={permanentpincode} onChange={(e) => setPermanentPincode(e.target.value)} fullWidth label="Permanent Pincode" /></Grid>
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
            <span className={classes.centerStyle}>Document Id's  </span>

          </Grid>
          <Grid size={6}><TextField value={aadharid} onChange={(e) => setAdharId(e.target.value)} fullWidth label="Aadhaar ID" /></Grid>

          {/* Vehicle & Professional Info */}


          <Grid size={6}><TextField value={panno} onChange={(e) => setPanId(e.target.value)} fullWidth label="PAN ID" /></Grid>
          <Grid size={6}><TextField value={vehicleno} onChange={(e) => setVehicleId(e.target.value)} fullWidth label="Vehicle No." /></Grid>
          <Grid size={6}><TextField value={license} onChange={(e) => setLicenseId(e.target.value)} fullWidth label="License ID" /></Grid>
          {/* <Grid size={4}><TextField value={vehicletype} onChange={(e) => setVehicleType(e.target.value)} fullWidth label="vehicle type" /></Grid> */}
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
          

          {/* Current Address */}

          {/* Permanent Address */}

          <Grid size={12}>
            <Button disabled={loading} onClick={handleSubmit} fullWidth variant="contained">Save Changes</Button>
          </Grid>
          <Grid size={12}>
            <Button fullWidth variant="contained" color="secondary" onClick={handleClose}>Close</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  return (
    <Dialog open={openStatus} onClose={handleClose} fullWidth>
      <DialogContent>{expertForm()}</DialogContent>
    </Dialog>
  );
}
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { getAccessToken } from "../../../util/web_storage";
import AdminNavBar from "./AdminNavBar";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { addPatient } from "../../../API/patientAPIs";
import { ValidateEmail, ValidateTelephoneNo } from "../../../util/helpers";


const theme = createTheme();
const token = getAccessToken();

export default function AddPatient() {

  const [emailStatus, setEmailStaus] = useState(false);
  const [contactNumberStatus, setcontactNumberStatus] = useState(false);
  const [emergencyContactNumberStatus, setemergencyContactNumberStatus] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    email: "",
    contactNumber: "",
    emergencyContactNumber: "",
    dateOfBirth: "",
  });
  // const [role, setRole] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    console.log("Add Patient Form Data: ", data);

    addPatient(data, (status, message, error) => {
      if (status === true) {
        alert(message);
        window.location.reload();
      } else {
        alert(error);
      }
    });
  };

  const onChangeValues = (e) => {
    const value = e.target.value;
    let name = e.target.name
    if(name == "email"){
      let status = ValidateEmail(value)
      setEmailStaus(status)
    }
    if(name == "contactNumber"){
      let status = ValidateTelephoneNo(value)
      setcontactNumberStatus(status)
    }
    if(name == "emergencyContactNumber"){
      let status = ValidateTelephoneNo(value)
      setemergencyContactNumberStatus(status)
    }
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <AdminNavBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 3,
              padding: 3,
              boxShadow: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccessibleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Patient Registration
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    required
                    autoFocus
                    onChange={onChangeValues}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={onChangeValues}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={onChangeValues}
                  />
                  {!emailStatus && data.email.length > 0 ? (
                    <span style={{color:"red", fontSize:12}}>Wrong email format</span>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender"
                      name="gender"
                      required
                      fullWidth
                      onChange={onChangeValues}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Home Address"
                    name="address"
                    autoComplete="address"
                    onChange={onChangeValues}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="mobileNo"
                    label="Contact No"
                    name="contactNumber"
                    autoComplete="mobileNo"
                    disabled={data.contactNumber.length>= 10?true:false}
                    onChange={onChangeValues}
                  />
                   {!contactNumberStatus && data.contactNumber.length>0 ?<span style={{color:"red", fontSize:12}} >contact number must be numbers and 10 numbers</span>:null}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="emergencyContactNumber"
                    label="Emergency Contact No"
                    id="emergencyContactNumber"
                    autoComplete="emergencyContactNumber"
                    disabled={data.emergencyContactNumber.length>= 10?true:false}
                    onChange={onChangeValues}
                  />
                    {!emergencyContactNumberStatus && data.emergencyContactNumber.length>0 ? (
                    <span style={{color:"red", fontSize:12}}>contact number must be numbers and 10 numbers</span>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="dateOfBirth"
                    label="DOB"
                    id="dateOfBirth"
                    type="date"
                    autoComplete="dateOfBirth"
                    onChange={onChangeValues}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 5 }}
              >
                Register
              </Button>
              {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
}

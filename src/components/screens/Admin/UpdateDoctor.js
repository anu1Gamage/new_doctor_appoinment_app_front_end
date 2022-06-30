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
import { getAccessToken, getDoctorDetails, getUserDetails } from "../../../util/web_storage";
import AdminNavBar from "./AdminNavBar";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetDoctorByUserId, UpdateeDoctor } from "../../../API/doctorAPIs";


const theme = createTheme();
const token = getAccessToken();

let userObj = JSON.parse(getUserDetails());
let doctorObj = JSON.parse(getDoctorDetails());
console.log('Doctor Details: ',doctorObj);


export default function UpdateDoctor() {

  const [data, setData] = useState(doctorObj);
  console.log('Doctor Details: ',data);
  const [doctor, setDoctor] = useState();
  const { id } = useParams();


  // useEffect(() => {
  //   GetDoctorByUserId(id, (status, data, error) => {
  //     if (status == true) {
  //       setDoctor(data);
  //       console.log('doctor Details: ',doctor);
  //     } else {
  //       alert("Doctor is not found!");
  //     }
  //   });
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Add doctor Form Data: ",userObj);
    let dataObj = {
      username: userObj.username,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      gender: data.gender,
      password: userObj.password,
      appUserRoles: [3],
      doctorRegistrationNumber: data.doctorRegistrationNumber,
      doctorSpecializationId: data.doctorSpecialization.id,
      available: data.available,
      rate: data.rate,
    };
    console.log('DR update data object: ',dataObj);
    UpdateeDoctor(dataObj, (status, message, error) => {
      if (status === true) {
        alert(message);
        window.location.reload();
      } else {
        alert(error);
      }
    });
  };

    const onChangeValues = (e)=>{
      const value = e.target.value
      setData({
        ...data,
        [e.target.name]:value
      })
    }



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
              Update Doctor
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
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={data?.firstName}
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
                    value={data?.lastName}
                    onChange={onChangeValues}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={data?.email}
                    onChange={onChangeValues}
                  />
                </Grid> */}
                {/* <Grid item xs={12}>
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
                      value={data.gender}
                      onChange={onChangeValues}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Reg No"
                    name="doctorRegistrationNumber"
                    autoComplete="address"
                    value={data?.doctorRegistrationNumber}
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
                    value={data?.contactNumber}
                    onChange={onChangeValues}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 5 }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

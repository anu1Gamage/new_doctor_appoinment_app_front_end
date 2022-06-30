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
import { addPatient, GetPatientById,UpdatePatientDetaills } from "../../../API/patientAPIs";

import { useEffect } from "react";
import { useParams } from "react-router-dom";


const theme = createTheme();
const token = getAccessToken();

export default function UpdatePatient() {
  const [data, setData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    email: "",
    contactNumber: "",
    emergencyContactNumber: "",
    dateOfBirth: "",
  });
  const [patient, setPatient] = useState();

  const { id } = useParams();

  useEffect(() => {
    GetPatientById(id, (status, data, error) => {
      if (status == true) {
        setPatient(data);
        console.log('patient Details: ',patient);
      } else {
        alert("User is not found!");
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Add Patient Form Data: ", data);

    UpdatePatientDetaills(patient, (status, message, error) => {
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
      setPatient({
        ...patient,
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
              Update Patient
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
                    value={patient?.firstName}
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
                    value={patient?.lastName}
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
                    value={patient?.email}
                    onChange={onChangeValues}
                  />
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
                      value={patient?.gender}
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
                    value={patient?.address}
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
                    value={patient?.contactNumber}
                    onChange={onChangeValues}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="emergencyContactNumber"
                    label="Emergency Contact No"
                    id="emergencyContactNumber"
                    autoComplete="emergencyContactNumber"
                    value={patient?.emergencyContactNumber}
                    onChange={onChangeValues}
                  />
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
                    value={patient?.dateOfBirth}
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

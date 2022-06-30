import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Navbar from "../../screens/Common/Navbar";
import { useState } from "react";
import { getAccessToken } from "../../../util/web_storage";
import { register } from "../../../API/authAPIs";
import AdminNavBar from "./AdminNavBar";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { addPatient } from "../../../API/patientAPIs";
import { useEffect } from "react";
import { CreateDoctor, GetAllSpecializations } from "../../../API/doctorAPIs";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import { ValidateEmail, ValidateTelephoneNo } from "../../../util/helpers";

const theme = createTheme();
const token = getAccessToken();

export default function AddDoctor() {
  const [emailStatus, setEmailStaus] = useState(false);
  const [contactNumberStatus, setcontactNumberStatus] = useState(false);

  const [data, setData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    gender: "",
    password: "",
    appUserRoles: [3],
    doctorRegistrationNumber: "",
    doctorSpecializationId: 0,
    available: true,
  });
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    GetAllSpecializations((status, data, error) => {
      if (status) {
        setSpecializations(data);
        console.log("Specialization List: ", data);
      } else {
        alert(error);
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    console.log("Add Doctor Form Data: ", data);

    CreateDoctor(data, (status, message, error) => {
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
    let name = e.target.name;
    if (name == "username") {
      let status = ValidateEmail(value);
      setEmailStaus(status);
    }
    if (name == "contactNumber") {
      let status = ValidateTelephoneNo(value);
      setcontactNumberStatus(status);
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
              <MedicationLiquidIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Doctor
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
                    name="username"
                    type="email"
                    autoComplete="email"
                    onChange={onChangeValues}
                  />
                       {!emailStatus && data.username.length > 0 ? (
                    <span style={{color:"red", fontSize:12}}>Wrong email format</span>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Specialization
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Specialization"
                      name="doctorSpecializationId"
                      required
                      fullWidth
                      onChange={onChangeValues}
                    >
                      {specializations.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
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
                    label="Dr  Rate"
                    name="rate"
                    autoComplete="rate"
                    onChange={onChangeValues}
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Reg No."
                    name="doctorRegistrationNumber"
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
                    disabled={data.contactNumber.length >= 10 ? true : false}
                    onChange={onChangeValues}
                  />
                  {!contactNumberStatus && data.contactNumber.length > 0 ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      contact number must be numbers and 10 nubers
                    </span>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    autoComplete="password"
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
                Register
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

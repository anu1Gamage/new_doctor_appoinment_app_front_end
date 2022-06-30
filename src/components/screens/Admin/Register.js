import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { getAccessToken } from "../../../util/web_storage";
import { register } from "../../../API/authAPIs";
import AdminNavBar from "./AdminNavBar";
import { ValidateEmail, ValidateTelephoneNo } from "../../../util/helpers";

const theme = createTheme();
const token = getAccessToken();

export default function SignUp() {
  const [emailStatus, setEmailStaus] = useState(false);
  const [contactNumberStatus, setcontactNumberStatus] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    contactNumber: "",
    gender: "",
    password: "",
    appUserRoles: null,
  });
  const [role, setRole] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Register Form Data: ", data);

    register(data, (status, message, error) => {
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
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              User Registration
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      User Roles
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="User Roles"
                      name="appUserRoles"
                      required
                      fullWidth
                      onChange={onChangeValues}
                    >
                      <MenuItem value={1}>Receptionist</MenuItem>
                      <MenuItem value={2}>Pharmacist</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
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
                    autoComplete="email"
                    onChange={onChangeValues}
                  />
                  {!emailStatus && data.username.length > 0 ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Wrong email format
                    </span>
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
                    id="mobileNo"
                    label="Contact No"
                    name="contactNumber"
                    autoComplete="mobileNo"
                    disabled={data.contactNumber.length >= 10 ? true : false}
                    onChange={onChangeValues}
                  />
                  {!contactNumberStatus && data.contactNumber.length > 0 ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      contact number must be numbers and 10 numbers
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={onChangeValues}
                  />
                  {data.password.length < 8 && data.password.length > 0 ? (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Password must be at least 8 characters
                    </span>
                  ) : null}
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

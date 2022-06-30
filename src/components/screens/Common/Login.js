import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import { useState } from "react";
import authAPIs from "../../../API/authAPIs";
import { ValidateEmail } from "../../../util/helpers";
import { saveDoctorDetails } from "../../../util/web_storage";
import { GetDoctorByUserId } from "../../../API/doctorAPIs";


const theme = createTheme();

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailStatus, setEmailStaus] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    authAPIs.login(username, password).then(
      (data) => {
        if (data.appUserRoles[0] === "ROLE_ADMIN") {
          alert("Login Sucessful!");
          navigate("/AllUsers");
          // window.location.reload();
        }
        if (data.appUserRoles[0] === "ROLE_RECEPTIONIST") {
          alert("Login Sucessful!");
          navigate("/PatientList");
        }
        if (data.appUserRoles[0] === "ROLE_PHARMACIST") {
          alert("Login Sucessful!");
          navigate("/AddItems");
        }
        if (data.appUserRoles[0] === "ROLE_DOCTOR") {
          GetDoctorByUserId(data.id,(status,data,error)=>{
            if(status ==true){
              console.log('Save dr details: ',data);
              saveDoctorDetails(JSON.stringify(data))
            }
          })
          saveDoctorDetails(JSON.stringify(data))
          alert("Login Sucessful!");
          navigate("/availability");
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // setLoading(false);
        // setMessage(resMessage);
        alert("Please check your username and password again!");
      }
    );
  };

  const onChangeUsername = (e) => {
    let text = e.target.value;
    let status = ValidateEmail(text);
    setEmailStaus(status);
    setUsername(text.trim());
    console.log("Username: ", text);
  };

  const onChangePassword = (e) => {
    let text = e.target.value;
    setPassword(text.trim());
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 2,
            padding: 3,
            borderRadius: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={onChangeUsername}
            />
            {!emailStatus && username.length > 0 ? (
              <span style={{color:"red", fontSize:12}}>Wrong email format</span>
            ) : null}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePassword}
            />
            {password.length < 8 && password.length > 0 ? (
              <span style={{color:"red", fontSize:12}}>Password must be at least 8 characters</span>
            ) : null}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: 5,
                backgroundColor: "#3f80db",
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

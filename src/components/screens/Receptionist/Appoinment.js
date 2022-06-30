import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useState } from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import ReceptionistNavBar from "./ReceptionistNavBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { GetAllDoctors } from "../../../API/doctorAPIs";
import { CreateAppoinment } from "../../../API/appoinmentAPIs";

const theme = createTheme();

export default function Appoinment() {
  const { id } = useParams();

  const [doctors, setDoctors] = useState([]);
  const [drBill, setDrBill] = useState({});
  const [viewBill, setViewBill] = useState(false);
  const [data, setData] = useState({
    date: "",
    time: "",
    doctorId: 0,
    patientId: parseInt(id),
    description: "",
  });

  useEffect(() => {
    setViewBill(false);
    GetAllDoctors((status, data, error) => {
      if (status) {
        setDoctors(data);
        console.log("doctor lis: ", doctors);
      } else {
        alert(error);
      }
    });
  }, []);

  const onChangeText = (e) => {
    let value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Appoinment data: ", data);

    CreateAppoinment(data, (status, message, error) => {
      if (status == true) {
        console.log('Data 99: ',message);
        setDrBill(message);
        setViewBill(true);
        alert("Appoinment Created!");
        // window.location.reload();
      } else {
        alert(error);
      }
    });
  };

  return (
    <>
      <ReceptionistNavBar />
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Create Appoinment
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Doctor
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="User Roles"
                      name="doctorId"
                      onChange={onChangeText}
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    >
                      {doctors.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor.id}>
                          {doctor.firstName + " " + doctor.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    name="gender"
                    required
                    fullWidth
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
                    id="date"
                    label="Date"
                    name="date"
                    autoComplete="date"
                    type="date"
                    onChange={onChangeText}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="time"
                    label="Time"
                    name="time"
                    autoComplete="time"
                    type="time"
                    onChange={onChangeText}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    placeholder="Description"
                    style={{ width: 500, borderColor: "gray" }}
                    name="description"
                    onChange={onChangeText}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 5 }}
              >
                Add Appoinment
              </Button>
            </Box>
          </Box>
          {viewBill ? (
            <Card sx={{ minWidth: 355 }}>
              <CardContent>
              <Typography variant="h5" component="div">
                 Appoinment Created!
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                Dr Name: -{drBill.doctorData.firstName+" "+drBill.doctorData.lastName}
                </Typography>
               
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                Patient Name: -{drBill.patient.firstName+" "+drBill.doctorData.lastName}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                Appoinment Charge: - Rs.{drBill.doctorData.rate}.00
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                Appoinment Time: -{drBill.time}
                </Typography>
              </CardContent>
          
            </Card>
           ) : null} 
        </Container>
      </ThemeProvider>
    </>
  );
}

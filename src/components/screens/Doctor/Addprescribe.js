import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { FormControl, Typography, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputLabel, MenuItem, Select } from "@mui/material";
import DoctorNavBar from "./DoctorNavBar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {  GetAppoinmentByPatient } from "../../../API/appoinmentAPIs";
import { GetAllPharmacyItem } from "../../../API/pharmacyAPIs";
import { getUserDetails } from "../../../util/web_storage";
import { GetDoctorByUserId } from "../../../API/doctorAPIs";
import { CreatePrescription } from "../../../API/prescriptionAPIs";

const theme = createTheme();

export default function AddPrescribe() {
  let { id } = useParams();
  let  user = getUserDetails();
  let userObj = JSON.parse(user)

  const [directors_array, setDiirectors_Array] = useState([
    {
      pharmacyItemId: 0,
      numberOfDays: 0,
    },
  ]);
  const [appoinments, setAppoinments] = useState([]);
  const [items, setItems] = useState([]);
  const[doctor,setDoctor]=useState({})

  useEffect(() => {
    GetAppoinmentByPatient(id, (status, data, error) => {
      if (status == true) {
        setAppoinments(data);
      } else {
        alert(error.message);
      }
    });

    GetAllPharmacyItem((status, data, error) => {
      if (status == true) {
        setItems(data);
      }
    });

    GetDoctorByUserId(userObj.id,(status,data,error)=>{
      if(status == true){
        console.log('Doctor data: ',data);
        setDoctor(data)
        
      }else{
        alert(error)
      }
    })
  }, []);

  const onChangeValues = (i,e)=>{
    let newFormValues = [...directors_array];
    newFormValues[i][e.target.name] = e.target.value;
    setDiirectors_Array(newFormValues);
    
  }

  const appendInput_director = () => {
    // var newInput = `director-${directors_array.length}`;
    // console.log(directors_array.concat([newInput]));
    // this.setState((prevState) => ({
    //   directors_array: prevState.directors_array.concat([newInput]),
    // }));
    setDiirectors_Array([
      ...directors_array,
      { pharmacyItemId: 0, numberOfDays: 0 },
    ]);
  };

  const handleSubmit = ()=>{
    let data={
      doctorId : doctor.id,
      patientId : parseInt(id),
      medicineList :directors_array,
      issuePharmacyItem : false
    }

    console.log('Create Prescription data: ',data);
    CreatePrescription(data,(status,message,error)=>{
      if(status ==true){
        alert(message);
      }else{
        alert(error)
      }
    })
  }


  return (
    <div>
      <DoctorNavBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
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
              Patient Details
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="First Name"
                    name="firstName"
                    autoComplete="family-name"
                    InputLabelProps={{ shrink: true }}
                    value={appoinments[0]?.patient.firstName}
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
                    InputLabelProps={{ shrink: true }}
                    value={appoinments[0]?.patient.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    InputLabelProps={{ shrink: true }}
                    value={appoinments[0]?.patient.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Home Address"
                    name="address"
                    autoComplete="address"
                    InputLabelProps={{ shrink: true }}
                    value={appoinments[0]?.patient.address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="mobileNo"
                    label="Contact No"
                    name="mobileNo"
                    autoComplete="mobileNo"
                    InputLabelProps={{ shrink: true }}
                    value={appoinments[0]?.patient.contactNumber}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 5, float: "right" }}
              >
                Finish
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 3,
              padding: 3,
              boxShadow: 2,
            }}
          >
            <Typography component="h1" variant="h5">
              Add Medicines
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={1}>
                {directors_array.map((input, index) => (
                  <Grid xs={12} container spacing={1} item key={index}>
                    <Grid item xs={6}>
                      <FormControl fullWidth margin="dense">
                        <InputLabel id="demo-simple-select-label">
                          Medicines
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Medicine"
                          name="pharmacyItemId"
                          size="small"
                          required
                          fullWidth
                          value={input.pharmacyItemId || 0}
                          onChange={e=>onChangeValues(index,e)}
                        >
                          {items.map((item) => {
                            return (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={5} item>
                      <FormControl fullWidth margin="dense">
                        <TextField
                          variant="outlined"
                          required
                          type="number"
                          label="Number of Days"
                          name="numberOfDays"
                          size="small"
                          value={input.numberOfDays || 0}
                          onChange={e=>onChangeValues(index,e)}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            endAdornment: index + 1 ===
                            directors_array.length && (
                              <InputAdornment position="start">
                                <Tooltip title="Add Statement">
                                  <Fab
                                    color="primary"
                                    size="small"
                                    onClick={
                                    appendInput_director
                                    }
                                  >
                                    <AddIcon />
                                  </Fab>
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 5, float: "right" }}
              >
                submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

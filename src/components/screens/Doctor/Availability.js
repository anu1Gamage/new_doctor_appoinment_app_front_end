import * as React from "react";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AdminNavBar from "../Admin/AdminNavBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import DoctorNavBar from "./DoctorNavBar";
import { getUserDetails, saveDoctorDetails } from "../../../util/web_storage";
import { useEffect } from "react";
import { GetDoctorByUserId } from "../../../API/doctorAPIs";
import { CreateSchedule } from "../../../API/doctorScheduleAPIs";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Availability() {
  const [data, setData] = useState([
    { dayOfTheWeek: "", startTime: "", endTime: "", available: false },
  ]);

  let  user = getUserDetails();
  let userObj = JSON.parse(user);

  const[doctor,setDoctor]=useState({});

  useEffect(()=>{
    GetDoctorByUserId(userObj.id,(status,data,error)=>{
      if(status == true){
        console.log('Doctor data: ',data);
        setDoctor(data)
        saveDoctorDetails(JSON.stringify(data))
        
      }else{
        alert(error)
      }
    })
  },[])
  const [obj1, setObj1] = useState({
    dayOfTheWeek: "Sunday",
    startTime: "",
    endTime: "",
    available: false,
  });
  const [obj2, setObj2] = useState({
    dayOfTheWeek: "Monday",
    startTime: "",
    endTime: "",
    available: false,
  });
  const [obj3, setObj3] = useState({
    dayOfTheWeek: "Tuesday",
    startTime: "",
    endTime: "",
    available: false,
  });
  const [obj4, setObj4] = useState({
    dayOfTheWeek: "Wednesday",
    startTime: "",
    endTime: "",
    available: false,
  });
  const [obj5, setObj5] = useState({
    dayOfTheWeek: "Thursday",
    startTime: "",
    endTime: "",
    available: false,
  });
  const [obj6, setObj6] = useState({
    dayOfTheWeek: "Friday",
    startTime: "",
    endTime: "",
    available: false,
  });
  const [obj7, setObj7] = useState({
    dayOfTheWeek: "Saturday",
    startTime: "",
    endTime: "",
    available: false,
  });

  const onChange1 = (e) => {
    let value = e.target.value;

    if(e.target.name == "available"){
      setObj1({
        ...obj1,
       [ e.target.name]:!obj1.available,
      });
    }else{
      setObj1({
        ...obj1,
        [e.target.name]: value,
      });
    }
  };

  const onChange2 = (e) => {
    let value = e.target.value;

    if(e.target.name == "available"){
      setObj2({
        ...obj2,
       [ e.target.name]:!obj2.available,
      });
    }else{
      setObj2({
        ...obj2,
        [e.target.name]: value,
      });
    }

   
  };

  const onChange3 = (e) => {
    let value = e.target.value;

    if(e.target.name == "available"){
      setObj3({
        ...obj3,
       [ e.target.name]:!obj3.available,
      });
    }else{
      setObj3({
        ...obj3,
        [e.target.name]: value,
      });
    }
  };

  const onChange4 = (e) => {
    let value = e.target.value;

    if(e.target.name == "available"){
      setObj4({
        ...obj4,
       [ e.target.name]:!obj4.available,
      });
    }else{
      setObj4({
        ...obj4,
        [e.target.name]: value,
      });
    }
  };

  const onChange5 = (e) => {
    let value = e.target.value;

    if(e.target.name == "available"){
      setObj5({
        ...obj5,
       [ e.target.name]:!obj5.available,
      });
    }else{
      setObj5({
        ...obj5,
        [e.target.name]: value,
      });
    }
  };

  const onChange6 = (e) => {
    let value = e.target.value;

    if(e.target.name == "available"){
      setObj6({
        ...obj6,
       [ e.target.name]:!obj6.available,
      });
    }else{
      setObj6({
        ...obj6,
        [e.target.name]: value,
      });
    }
  };

  const onChange7 = (e) => {
    let value = e.target.value;

    if(e.target.name == "available"){
      setObj7({
        ...obj7,
       [ e.target.name]:!obj7.available,
      });
    }else{
      setObj7({
        ...obj7,
        [e.target.name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    data.push(obj1);
    data.push(obj2);
    data.push(obj3);
    data.push(obj4);
    data.push(obj5);
    data.push(obj6);
    data.push(obj7);
    data.splice(0,1);

    console.log('Data array: ',data);
    
    CreateSchedule(data,doctor.id,(status,message,error)=>{
      if(status==true){
        alert(message)
        window.location.reload();
      }else{
        alert(error.message)
      }
    })
  
  };

  return (
    <>
      <DoctorNavBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              padding: 4,
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main",display:"flex", flexDirection:"column", alignItems:"center" }}></Avatar> */}
            <Typography
              component="h1"
              variant="h5"
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Doctor Availability Form
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={1}>
                  <Typography sx={{ paddingTop: 2 }}>Monday</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="startTime"
                    type="time"
                    label="Start Time"
                    autoComplete="family-name"
                    onChange={onChange2}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="endTime"
                    type="time"
                    label="EndTime"
                    autoComplete="family-name"
                    onChange={onChange2}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name=""
                    type="date"
                    label="Date"
                    autoComplete="family-name"
                  />
                </Grid> */}
                <Grid item xs={12} sm={1}>
                  <FormGroup sx={{ paddingTop: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox name="available" onClick={onChange2} />
                      }
                      label="Available"
                    />
                  </FormGroup>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={1}>
                  <Typography sx={{ paddingTop: 2 }}>Tuesday</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="startTime"
                    type="time"
                    label="Start Time"
                    autoComplete="family-name"
                    onChange={onChange3}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="endTime"
                    type="time"
                    label="EndTime"
                    autoComplete="family-name"
                    onChange={onChange3}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    type="date"
                    label="Date"
                    autoComplete="family-name"
                  />
                </Grid> */}
                <Grid item xs={12} sm={1}>
                  <FormGroup sx={{ paddingTop: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox name="available" onClick={onChange3} />
                      }
                      label="Available"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={1}>
                  <Typography sx={{ paddingTop: 2 }}>Wednesday</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="startTime"
                    type="time"
                    label="Start Time"
                    autoComplete="family-name"
                    onChange={onChange4}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="endTime"
                    type="time"
                    label="EndTime"
                    autoComplete="family-name"
                    onChange={onChange4}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    type="date"
                    label="Date"
                    autoComplete="family-name"
                  />
                </Grid> */}
                <Grid item xs={12} sm={1}>
                  <FormGroup sx={{ paddingTop: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox name="available" onClick={onChange4} />
                      }
                      label="Available"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={1}>
                  <Typography sx={{ paddingTop: 2 }}>Thursday</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="startTime"
                    type="time"
                    label="Start Time"
                    autoComplete="family-name"
                    onChange={onChange5}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="endTime"
                    type="time"
                    label="EndTime"
                    autoComplete="family-name"
                    onChange={onChange5}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    type="date"
                    label="Date"
                    autoComplete="family-name"
                  />
                </Grid> */}
                <Grid item xs={12} sm={1}>
                  <FormGroup sx={{ paddingTop: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox name="available" onClick={onChange5} />
                      }
                      label="Available"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={1}>
                  <Typography sx={{ paddingTop: 2 }}>Friday</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="startTime"
                    type="time"
                    label="Start Time"
                    autoComplete="family-name"
                    onChange={onChange6}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="endTime"
                    type="time"
                    label="EndTime"
                    autoComplete="family-name"
                    onChange={onChange6}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    type="date"
                    label="Date"
                    autoComplete="family-name"
                  />
                </Grid> */}
                <Grid item xs={12} sm={1}>
                  <FormGroup sx={{ paddingTop: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox name="available" onClick={onChange6} />
                      }
                      label="Available"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={1}>
                  <Typography sx={{ paddingTop: 2 }}>Saturday</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="startTime"
                    type="time"
                    label="Start Time"
                    autoComplete="family-name"
                    onChange={onChange7}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="endTime"
                    type="time"
                    label="EndTime"
                    autoComplete="family-name"
                    onChange={onChange7}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    type="date"
                    label="Date"
                    autoComplete="family-name"
                  />
                </Grid> */}
                <Grid item xs={12} sm={1}>
                  <FormGroup sx={{ paddingTop: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox name="available" onClick={onChange7} />
                      }
                      label="Available"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={1}>
                  <Typography sx={{ paddingTop: 2 }}>Sunday</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="startTime"
                    type="time"
                    label="Start Time"
                    autoComplete="family-name"
                    onChange={onChange1}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="endTime"
                    type="time"
                    label="EndTime"
                    autoComplete="family-name"
                    onChange={onChange1}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    type="date"
                    label="Date"
                    autoComplete="family-name"
                  />
                </Grid> */}
                <Grid item xs={12} sm={1}>
                  <FormGroup sx={{ paddingTop: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox name="available" onClick={onChange1} />
                      }
                      label="Available"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 5 }}
              >
                submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

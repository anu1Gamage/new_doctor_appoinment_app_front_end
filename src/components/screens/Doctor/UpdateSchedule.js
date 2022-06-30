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
import {
  getDoctorDetails,
  getUserDetails,
  saveDoctorDetails,
} from "../../../util/web_storage";
import { useEffect } from "react";
import { GetDoctorByUserId } from "../../../API/doctorAPIs";
import {
  CreateSchedule,
  GetScheduleByDoctorId,
  UpdateDoctorSchedule,
} from "../../../API/doctorScheduleAPIs";

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

export default function UpdateSchedule() {
  const [data, setData] = useState([
    { dayOfTheWeek: "", startTime: "", endTime: "", available: false },
  ]);
  const[schedules,setSchedules]=useState([{
    id : 0,
    dayOfTheWeek : "",
    startTime : "",
    endTime : "",
    available :false
  }]);

  let doctor = getDoctorDetails();
  console.log("Doctor: ", doctor);
  let doctorObj = JSON.parse(doctor);

  useEffect(() => {
    GetScheduleByDoctorId(doctorObj.id, (status, data, error) => {
      if (status == true) {
        console.log("Doctor data: ", data);
        setSchedules(data.schedules);
      } else {
        alert(error);
      }
    });
  }, []);
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

    if (e.target.name == "available") {
      setObj1({
        ...obj1,
        [e.target.name]: !obj1.available,
      });
    } else {
      setObj1({
        ...obj1,
        [e.target.name]: value,
      });
    }
  };

  const onChangeValues = (i,e)=>{
    let newFormValues = [...schedules];
    newFormValues[i][e.target.name] = e.target.value;
    setSchedules(newFormValues);
    
  }

  const onChange = (i,e) => {

    if (e.target.name == "available") {
      let newFormValues = [...schedules];
      newFormValues[i][e.target.name] = !newFormValues[i].available;
    } else {
      let newFormValues = [...schedules];
      newFormValues[i][e.target.name] = e.target.value;
      setSchedules(newFormValues);
    }
  };

  const onChange3 = (e) => {
    let value = e.target.value;

    if (e.target.name == "available") {
      setObj3({
        ...obj3,
        [e.target.name]: !obj3.available,
      });
    } else {
      setObj3({
        ...obj3,
        [e.target.name]: value,
      });
    }
  };

  const onChange4 = (e) => {
    let value = e.target.value;

    if (e.target.name == "available") {
      setObj4({
        ...obj4,
        [e.target.name]: !obj4.available,
      });
    } else {
      setObj4({
        ...obj4,
        [e.target.name]: value,
      });
    }
  };

  const onChange5 = (e) => {
    let value = e.target.value;

    if (e.target.name == "available") {
      setObj5({
        ...obj5,
        [e.target.name]: !obj5.available,
      });
    } else {
      setObj5({
        ...obj5,
        [e.target.name]: value,
      });
    }
  };

  const onChange6 = (e) => {
    let value = e.target.value;

    if (e.target.name == "available") {
      setObj6({
        ...obj6,
        [e.target.name]: !obj6.available,
      });
    } else {
      setObj6({
        ...obj6,
        [e.target.name]: value,
      });
    }
  };

  const onChange7 = (e) => {
    let value = e.target.value;

    if (e.target.name == "available") {
      setObj7({
        ...obj7,
        [e.target.name]: !obj7.available,
      });
    } else {
      setObj7({
        ...obj7,
        [e.target.name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Update Details: ',schedules);
   UpdateDoctorSchedule(doctorObj.id,schedules,(status,message,error)=>{
    if(status ==true){
      alert(message)
      window.location.reload()
    }else{
      alert(error)
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
                {schedules?.map((row,id)=>(
                         <Grid container spacing={2} sx={{ marginBottom: 2 }} key={row.id}>
                         <Grid item xs={12} sm={1}>
                           <Typography sx={{ paddingTop: 2 }}>{row?.dayOfTheWeek}</Typography>
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
                             value={row.startTime || "" }
                             onChange={e => onChange(id,e)}
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
                             value={row.endTime || ""}
                             onChange={e => onChange(id,e)}
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
                                 <Checkbox name="available" defaultChecked={row.available || false}   onChange={e => onChange(id,e)} />
                               }
                               label="Available"
                             />
                           </FormGroup>
                         </Grid>
                       </Grid>
         
                ))}
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 5 }}
              >
               Update Schedule
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

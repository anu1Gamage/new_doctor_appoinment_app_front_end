
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import cardimage from "../../../assets/Images/doctor2.jpg";
import Navbar from "../../screens/Common/Navbar";
import { Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { GetAllDoctors } from "../../../API/doctorAPIs";

export default function MediaControlCard() {
  const theme = useTheme();

  const [doctors, setDoctors] = useState([]);


  useEffect(() =>{
    GetAllDoctors((status, data, error)=>{
      if(status){
        setDoctors(data);
        setTimeout(()=>{
          console.log('doctor lis: ', doctors);
        },1000)
      }else{
        alert(error)
      }
    })
  }, [])


  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
      {  doctors.map((doctor)=>(
        <Card sx={{ display: "flex", margin: 10, boxShadow:2, borderRadius:3, }} key={doctor.id}>
        <CardMedia
          component="img"
          sx={{ width: 180, height: 180 }}
          image={cardimage}
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", marginLeft:5 }}>
            <Typography component="div" variant="h5">
              Dr : {doctor.firstName+" "+doctor.lastName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
             {doctor.doctorSpecialization.name}
            </Typography>
            {/* <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
             Contact No:-{doctor.contactNumber}
            </Typography> */}
          </CardContent>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", marginLeft:5 }}>
            {/* <Typography component="div" variant="h5">
              Live From Space
            </Typography> */}
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Reg No:- {doctor.doctorRegistrationNumber}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Gender: - {doctor.gender}
            </Typography>
          </CardContent>
        </Box>
      </Card>
      ))}
        {/* <Card sx={{ display: "flex", margin: 10, boxShadow:2, borderRadius:3, marginTop:-5 }}>
          <CardMedia
            component="img"
            sx={{ width: 180, height: 180 }}
            image={cardimage}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto", marginLeft:5 }}>
              <Typography component="div" variant="h5">
                Dr : Nipun Perera
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Mac Miller
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto", marginLeft:5 }}>
              <Typography component="div" variant="h5">
                Live From Space
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Mac Miller
              </Typography>
            </CardContent>
          </Box>
        </Card>
        <Card sx={{ display: "flex", margin: 10, boxShadow:2, borderRadius:3, marginTop:-5 }}>
          <CardMedia
            component="img"
            sx={{ width: 180, height: 180 }}
            image={cardimage}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto", marginLeft:5 }}>
              <Typography component="div" variant="h5">
                Dr : Nipun Perera
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Mac Miller
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto", marginLeft:5 }}>
              <Typography component="div" variant="h5">
                Live From Space
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Mac Miller
              </Typography>
            </CardContent>
          </Box>
        </Card> */}
      </Container>
    </>
  );
}

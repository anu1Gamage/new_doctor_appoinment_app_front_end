import React,{useState,useEffect} from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAccessToken } from "../../../util/web_storage";
import AdminNavBar from "./AdminNavBar";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { DeleteSpecialization, DoctorSpecialization, GetAllSpecializations } from "../../../API/doctorAPIs";
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme();
const token = getAccessToken();

export default function AddSpecialization() {
  const [data, setData] = useState({
    name: "",
    available: true,
  });
  const [role, setRole] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    console.log("Add Patient Form Data: ", data);

    DoctorSpecialization(data, (status, message, error) => {
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
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const [specializations,setSpecializations]=useState([]);

  useEffect(()=>{
    
    GetAllSpecializations((status,data,error)=>{
    if(status){
      setSpecializations(data);
      console.log('Patents List: ',specializations);
    }else{
      alert(error)
    }
  })
  },[])

  const deleteSpecialization =(id)=>{
    DeleteSpecialization(id,(status,message,error)=>{
      if(status == true){
        alert(message)
        window.location.reload()
      }else{
        alert(error)
      }
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
              <LocalHospitalIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Specialization Category
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="Name"
                    label="Specializatioon Category"
                    autoFocus
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
                Add
              </Button>
            </Box>
          </Box>
        </Container>
        <Container component="main" maxWidth="md" sx={{marginTop:5}}>
        <TableContainer component={Paper} maxWidth="md" sx={{boxShadow:2}} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{width:'80%',padding:'40px'}}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Specialization Area</TableCell>
                <TableCell align="right">Availability</TableCell>
                <TableCell align="right">Remove</TableCell>
                {/* <TableCell align="right">Update</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {specializations.map((specialization) => (
                <TableRow
                  key={specialization.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {specialization.id}
                  </TableCell>
                  <TableCell align="right">{specialization.name}</TableCell>
                  <TableCell align="right">{(specialization.available).toString()}</TableCell>
                  <TableCell align="right"><DeleteIcon color='red'  onClick={()=>deleteSpecialization(specialization.id)}/></TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
     
      </ThemeProvider>
    </>
  );
}

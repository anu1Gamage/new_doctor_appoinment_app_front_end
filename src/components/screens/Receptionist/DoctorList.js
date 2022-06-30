import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';
import { DeleteDoctor, GetAllDoctors } from '../../../API/doctorAPIs';
import ReceptionistNavBar from './ReceptionistNavBar';
import Box from "@mui/material/Box";
import PageviewIcon from '@mui/icons-material/Pageview';


export default function DoctorList() {

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    GetAllDoctors((status, data, error)=>{
      if(status){
        setDoctors(data);
        console.log('doctor lis: ', doctors);
      }else{
        alert(error)
      }
    })
  }, [])

  const DeleteDoctorFromList = (id)=>{

    DeleteDoctor(id,(status,message,error)=>{
      if(status ==true){
        alert(message)
        window.location.reload()
      }else{
        alert(message)
      }
    })
  }

  const ViewDoctorSchedule = (id)=>{
    console.log();
    navigate(`/ViewDoctorSchedule/${id}`)
  }
  return (
    <>
    <ReceptionistNavBar/>
    <div className="container" >
    <Box sx={{ width: "100%", padding: 3 }}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Specialization</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Contact No</TableCell>
            {/* <TableCell align="right">Email</TableCell> */}
            <TableCell align='right'>Available | NotAvailable</TableCell>
            <TableCell align="right">View Schedule</TableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow
              key={doctor.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {doctor.id}
              </TableCell>
              <TableCell align="right">{doctor.firstName}</TableCell>
              <TableCell align="right">{doctor.lastName}</TableCell>
              <TableCell align="right">{doctor.doctorSpecialization.name}</TableCell>
              <TableCell align="right">{doctor.gender}</TableCell>
              <TableCell align="right">{doctor.contactNumber}</TableCell>
              {/* <TableCell align="right">{doctor.email}</TableCell> */}
              <TableCell align='right'>{(doctor.available).toString()}</TableCell>
              <TableCell align="right"><PageviewIcon color='red' onClick={()=>ViewDoctorSchedule(doctor.id)}/></TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </div>
    </>

  );
}
import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {GetAllPatient,DeletePatient} from '../../../../API/patientAPIs';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';



export default function AllPatients() {

  const [patients,setPatients]=useState([]);
  const navigate =useNavigate()

  useEffect(()=>{
    
  GetAllPatient((status,data,error)=>{
    if(status){
      setPatients(data);
      console.log('Patents List: ',patients);
    }else{
      alert(error)
    }
  })
  },[])

  const DeletePatientFromList = (id)=>{

    DeletePatient(id,(status,message,error)=>{
      if(status ==true){
        alert(message)
        window.location.reload()
      }else{
        alert(message)
      }
    })
  }

  const UpdatePatient = (id)=>{
    navigate(`/Updatepatient/${id}`)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Contact No</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">DOB</TableCell>
            <TableCell align="right">Remove</TableCell>
            <TableCell align="right">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {patients.map((patient) => (
            <TableRow
              key={patient.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {patient.id}
              </TableCell>
              <TableCell align="right">{patient.firstName}</TableCell>
              <TableCell align="right">{patient.lastName}</TableCell>
              <TableCell align="right">{patient.address}</TableCell>
              <TableCell align="right">{patient.gender}</TableCell>
              <TableCell align="right">{patient.contactNumber}</TableCell>
              <TableCell align="right">{patient.email}</TableCell>
              <TableCell align="right">{patient.dateOfBirth}</TableCell>
              <TableCell align="right"><DeleteIcon color='red' onClick={()=>DeletePatientFromList(patient.id)}/></TableCell>
              <TableCell align="right"><CreateIcon color='red' onClick={()=>UpdatePatient(patient.id)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
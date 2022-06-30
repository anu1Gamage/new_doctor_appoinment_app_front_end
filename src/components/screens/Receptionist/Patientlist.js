import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import MiniDrawer from "../Common/NavbarWithSidebar";
import PersistentDrawerLeft from "../Common/NavbarWithSidebar";
import Navbar from "../../screens/Common/Navbar";
import { useState } from "react";
import {GetAllPatient} from '../../../API/patientAPIs'
import { useEffect } from "react";
import ReceptionistNavBar from "./ReceptionistNavBar";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";


// function createData(Id,FirstName,LastName,email,ContactNo,Gender,DOB) {
//   return { Id,FirstName,LastName,email,ContactNo,Gender,DOB};
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function Patientlist() {

  const navigate =useNavigate()
 
  const [patients,setPatients]=useState([]);

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

  const MakeAppoinment = (id)=>{
     navigate(`/appoinment/${id}`)
  }

  const TerminateAppoinment = (id)=>{
    navigate(`/TerminateAppoinment/${id}`)
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
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Contact No</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">DOB</TableCell>
            <TableCell align="right">Make Appoinments</TableCell>
            <TableCell align="right">Edit Appoinment</TableCell>
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
              <TableCell align="right"><BookOnlineIcon onClick={()=>MakeAppoinment(patient.id)}/></TableCell>
              <TableCell align="right"><EditIcon onClick={()=>TerminateAppoinment(patient.id)}/></TableCell>
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

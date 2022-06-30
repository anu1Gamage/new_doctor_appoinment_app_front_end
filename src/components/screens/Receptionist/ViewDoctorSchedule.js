import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDoctorDetails, getUserDetails } from '../../../util/web_storage';
import { GetScheduleByDoctorId } from '../../../API/doctorScheduleAPIs';
import { Container } from '@mui/system';
import { useParams } from 'react-router-dom';
import ReceptionistNavBar from './ReceptionistNavBar';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ViewDoctorSchedule() {
    const[schedules,setSchedules]=useState({});

    let {id}=useParams();

    // let  doctor = getDoctorDetails();
    // console.log('Doctor: ',doctor);
    // let doctorObj = JSON.parse(doctor);

    useEffect(()=>{
          GetScheduleByDoctorId(id,(status,data,error)=>{
            if(status == true){
                console.log('Doctor data: ',data);
                setSchedules(data)
             
                
              }else{
                alert(error)
              }
          })
    },[])
  return (
<>
<ReceptionistNavBar/>
<Container component="main" maxWidth="lg" sx={{marginTop:5}}>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Day of the Week</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Availability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules.schedules?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dayOfTheWeek}
              </TableCell>
              <TableCell align="right">{row.startTime}</TableCell>
              <TableCell align="right">{row.endTime}</TableCell>
              <TableCell align="right">{row.available.toString()}</TableCell>
 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Container>

</>
    
  );
}

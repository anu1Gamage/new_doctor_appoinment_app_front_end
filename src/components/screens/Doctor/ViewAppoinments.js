import React from "react";
import {
  getAccessToken,
  getDoctorDetails,
  getTokenType,
  getUserDetails,
} from "../../../util/web_storage";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import { useState } from "react";
import { GetAllPatient } from "../../../API/patientAPIs";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";
import DoctorNavBar from "./DoctorNavBar";
import { GetAppoinmentByDoctor } from "../../../API/appoinmentAPIs";
import moment from "moment";
import { GetDoctorByUserId } from "../../../API/doctorAPIs";

export default function ViewAppoinments() {
  const [appoinments, setAppoinments] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();



  let doctorObj =JSON.parse(getDoctorDetails());

  setTimeout(() => {
    console.log("Dr Details: ", doctorObj);
  }, 1000);

  let date = new Date();
  let formatDate = moment(date).format("YYYY-MM-DD");

  console.log("Id:- ", doctorObj.id);
  console.log("Date:- ", formatDate);

  function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

  useEffect(() => {

        GetAppoinmentByDoctor(
          doctorObj.id,
          formatDate,
          (status, data, error) => {
            if (status == true) {
              setAppoinments(data);
              console.log("Appoinments Details: ", appoinments);
            }
          }
        );
 

  }, []);

  const EditAppoinment = (id) => {
    navigate(`/addprescribe/${id}`);
  };

  return (
    <>
      <DoctorNavBar />
      <div className="container">
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
                <TableCell align="right">Appoinment Time</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Edit</TableCell>
                {/* <TableCell align="right">Update</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {appoinments.map((appoinment) => (
                <TableRow
                  key={appoinment.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {appoinment.id}
                  </TableCell>
                  <TableCell align="right">
                    {appoinment.patient.firstName}
                  </TableCell>
                  <TableCell align="right">
                    {appoinment.patient.lastName}
                  </TableCell>
                  <TableCell align="right">
                    {appoinment.patient.address}
                  </TableCell>
                  <TableCell align="right">
                    {appoinment.patient.gender}
                  </TableCell>
                  <TableCell align="right">
                    {appoinment.patient.contactNumber}
                  </TableCell>
                  <TableCell align="right">
                    {appoinment.time}
                  </TableCell>
                  <TableCell align="right">
                    {getAge(appoinment.patient.dateOfBirth)}
                  </TableCell>
                  <TableCell align="right">
                    {appoinment.terminated.toString()}
                  </TableCell>
                  <TableCell align="right">
                    <EditIcon
                      onClick={() => EditAppoinment(appoinment.patient.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

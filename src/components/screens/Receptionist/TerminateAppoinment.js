import React from 'react'
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "@mui/system";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import { useNavigate, useParams } from 'react-router-dom';
import { GetAppoinmentByPatient,TerminateAppoinments } from '../../../API/appoinmentAPIs';
import ReceptionistNavBar from './ReceptionistNavBar';


export default function TerminateAppoinment() {

    let {id}=useParams();
    const navigate =useNavigate();
    
    const[appoinments,setAppoinments]=useState([]);

    useEffect(()=>{
        GetAppoinmentByPatient(id,(status,data,error)=>{
            if(status ==true){
                setAppoinments(data)
            }else{
                alert(error)
            }
        })
    },[])

    const TerminateAppoinmentHandler =(id)=>{
     TerminateAppoinments(id,(status,message,error)=>{
        if(status ==true){
          alert(message);
          navigate('/PatientList')

        }else{
          alert(error)
        }
      })
    }
  return (

        <>
        <ReceptionistNavBar/>
   
            {appoinments.map((item,id)=>(
                <>
              <div className='container'>
            <Box sx={{ width: "100%", padding: 3 }}>


            
              <Box
              component="form"
              noValidate
              key={item.id}
              // onSubmit={handleSubmit}
              sx={{ mt: 2 }}
              maxWidth="md"
            >
              <Grid container spacing={2} sx={{ marginBottom: 2 }} key={item.id}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="date"
                    type="date"
                    label="Date"
                    autoComplete="family-name"
                     value={item.date }
                     disabled={item.terminated}
                    //  onChange={e => onChange(id,e)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="time"
                    type="time"
                    label="Time"
                    autoComplete="family-name"
                    value={item.time}
                    disabled={item.terminated}
                    //  onChange={e => onChange(id,e)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="Doctor Name"
                    type="text"
                    label="Doctor Name"
                    autoComplete="family-name"
                    value={item.doctorData.firstName+" "+item.doctorData.lastName}
                    disabled={item.terminated}
                    //  onChange={e => onChange(id,e)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
      
               
{/* 
                <Grid item xs={12} sm={1}>
                  <FormGroup sx={{ paddingTop: 1 }}>
                    <FormControlLabel
                      control={<Checkbox name="issued" defaultChecked={row.issued} disabled={row.pharmacyItem.quantity == 0? true:false} onChange={e =>onChange(id,e)} />}
                      label="Issued"
                    />
                  </FormGroup>
                </Grid> */}
              </Grid>
            </Box>
          
  
        <Button
          type="submit"
          // fullWidth
          variant="contained"
          onClick={()=>TerminateAppoinmentHandler(item.id)}
 
          sx={{ mt: 3, mb: 2, borderRadius: 5 }}
        >
         {item.terminated? "Terminated":"Terminate Appoinment"}
        </Button>
        </Box>
        </div>
        </>
            ))}
              
        </>

  )
}

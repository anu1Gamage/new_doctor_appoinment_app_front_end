import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import PharmacyNavBar from "./PharmacyNavBar";
import { useState } from "react";
import { useEffect } from "react";
import { GetPrescription, IssueMedicine } from "../../../API/prescriptionAPIs";
import { Container } from "@mui/system";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";

export default function IssueItems() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [items, setItems] = useState({
  });
  const [show, setShow] = useState(false);
  const[data,setData] =useState([])
  const [qtys,setQtys]=useState([{
    quantity:0
  }])

  useEffect(() => {
    GetPrescription((status, data, error) => {
      if (status == true) {
        setPrescriptions(data);
        setTimeout(() => {
          console.log("Pres data: ", prescriptions);
        }, 1000);
      } else {
        alert(error.message);
      }
    });
  }, []);

  const issueMedicine = (item) => {
    console.log("Selected row: ", item);
    setItems(item);
    setShow(true);
    setTimeout(() => {
      console.log("Set item Lists: ", items);
    }, 1000);
  };

  const onChange = (i, e) => {
    let newFormValues = [...items.prescriptionItemList];
    newFormValues[i][e.target.name] = !newFormValues[i].issued;
    // setItems(newFormValues)
  };

  const onChangeQty = (i,e)=>{
    let newFormValues = [...qtys];
    newFormValues[i][e.target.name] = e.target.value;
    setQtys(newFormValues)
  }

  const handleSubmit = ()=>{
    console.log('Issued Items: ',items.prescriptionItemList);
    for(let i=0;i<items.prescriptionItemList.length;i++){
      data.push({
        id:items.prescriptionItemList[i].id,
        quantity:items.prescriptionItemList[i].pharmacyItem.quantity-10,
        issued:items.prescriptionItemList[i].issued

      })
    }
    console.log('Update issue item: ',data);
    IssueMedicine(items.id,data,(status,message,error)=>{
      if(status ==true){
        alert(message)
      }else{
        alert(error)
      }
    })
    setShow(false)
  }
  return (
    <>
      <PharmacyNavBar />
      <Container component="main" maxWidth="lg" sx={{ marginTop: 5 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Patient</TableCell>
                <TableCell align="right">Doctor</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Issue Medicines</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptions.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="item">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    {item.patient.firstName + " " + item.patient.lastName}
                  </TableCell>
                  <TableCell align="right">
                    Dr.
                    {item.doctorData.firstName + " " + item.doctorData.lastName}
                  </TableCell>
                  <TableCell align="right">{item.date}</TableCell>
                  <TableCell align="right">{item.time}</TableCell>
                  <TableCell align="right">
                    <MedicationLiquidIcon onClick={() => issueMedicine(item)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {show ? (
          <>
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
              Add Medicines
            </Typography>
            {items.prescriptionItemList?.map((row, id) => (
              <>
                <Box
                  component="form"
                  noValidate
                  key={row.id}
                  // onSubmit={handleSubmit}
                  sx={{ mt: 2 }}
                  maxWidth="md"
                >
                  <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        name="name"
                        type="text"
                        label="Drug Name"
                        autoComplete="family-name"
                         value={row.pharmacyItem.name || "" }
                        //  onChange={e => onChange(id,e)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        name="quantity"
                        type="number"
                        label="Total Quantity"
                        autoComplete="family-name"
                        value={row.pharmacyItem.quantity || "" }
                        //  onChange={e => onChange(id,e)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        name="numberOfDays"
                        type="number"
                        label="No of days"
                        autoComplete="family-name"
                        value={row.numberOfDays || "" }
                        //  onChange={e => onChange(id,e)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
          
                   

                    <Grid item xs={12} sm={1}>
                      <FormGroup sx={{ paddingTop: 1 }}>
                        <FormControlLabel
                          control={<Checkbox name="issued" defaultChecked={row.issued} disabled={row.pharmacyItem.quantity == 0? true:false} onChange={e =>onChange(id,e)} />}
                          label="Issued"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ))}
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2, borderRadius: 5 }}
            >
              Update Schedule
            </Button>
          </>
        ) : null}
      </Container>
    </>
  );
}

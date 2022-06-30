import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useState } from "react";
import { UpdatePharmacyItem } from "../../../API/pharmacyAPIs";

const UpdateModal = ({ open, data }) => {
    console.log('Item: ',data);
    const [item,setItem]=useState(data)
    console.log('After equal: ',item);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        UpdatePharmacyItem(item,(status,message,error)=>{
            if(status == true){
                alert(message)
                window.location.reload()
            }else{
                alert(error)
            }
        })
      };
    

    const onChangeValues = (e)=>{
        const value = e.target.value
        setItem({
          ...item,
          [e.target.name]:value
        })
      }
    console.log('It comes here');
    if(open == true){
        return (
            <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius:3,
                padding:3,
                boxShadow:2
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Update Pharmacy Items
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  {/* <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        User Roles
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="User Roles"
                        name="role"
                        required
                        fullWidth
                      >
                        <MenuItem value={1}>Patient</MenuItem>
                        <MenuItem value={2}>Doctor</MenuItem>
                        <MenuItem value={3}>Receptionist</MenuItem>
                        <MenuItem value={4}>Pharmacist</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                    //   label="Item Name"
                      value={item?.name}
                      autoFocus
                      onChange={onChangeValues}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="price"
                    //   label="Price"
                      name="price"
                      value={item?.price}
                      autoComplete="family-name"
                      onChange={onChangeValues}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="quantity"
                    //   label="Quantity"
                      name="quantity"
                      value={item?.quantity}
                      autoComplete="quantity"
                      onChange={onChangeValues}
                    />
                  </Grid>
                  
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 , borderRadius:5}}
                >
                  Update Item
                </Button>
              </Box>
            </Box>
          </Container>
          );
    }
    if(open ==false)
    {
        return null;
    }

    
 
};

export default UpdateModal;

// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import Navbar from "../Common/Navbar";
// import PharmacyNavBar from "./PharmacyNavBar";
// import { useState } from "react";
// import { AddPharmacyItem } from "../../../API/pharmacyAPIs";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function UpdatePharmacyItem() {


//   const handleSubmit = (event) => {
//     event.preventDefault();
     
//     AddPharmacyItem(data,(status,message,error)=>{
//       if(status === true){
//         alert(message)
//         window.location.reload()
//       }else{
//         alert(message)
//       }
//     })
//   };

  
//   const onChangeValues = (e)=>{
//     const value = e.target.value
//     setData({
//       ...data,
//       [e.target.name]:value
//     })
//   }

//   return (
//       <>
//      <PharmacyNavBar/>
//           <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="sm">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             borderRadius:3,
//             padding:3,
//             boxShadow:2
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             {/* <LockOutlinedIcon /> */}
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Update Pharmacy Items
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               {/* <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id="demo-simple-select-label">
//                     User Roles
//                   </InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     label="User Roles"
//                     name="role"
//                     required
//                     fullWidth
//                   >
//                     <MenuItem value={1}>Patient</MenuItem>
//                     <MenuItem value={2}>Doctor</MenuItem>
//                     <MenuItem value={3}>Receptionist</MenuItem>
//                     <MenuItem value={4}>Pharmacist</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid> */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="name"
//                   required
//                   fullWidth
//                   id="name"
//                   label="Item Name"
//                   autoFocus
//                   onChange={onChangeValues}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="price"
//                   label="Price"
//                   name="price"
//                   autoComplete="family-name"
//                   onChange={onChangeValues}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="quantity"
//                   label="Quantity"
//                   name="quantity"
//                   autoComplete="quantity"
//                   onChange={onChangeValues}
//                 />
//               </Grid>
              
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 , borderRadius:5}}
//             >
//               Add Item
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//       </>

//   );
// }

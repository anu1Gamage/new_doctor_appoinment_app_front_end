import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import { DeletePharmacyItem, GetAllPharmacyItem, SearchPharmacyItems } from "../../../API/pharmacyAPIs";
import PharmacyNavBar from "./PharmacyNavBar";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UpdateModal from "./UpdateModal";


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

export default function PharmacyItemList() {
 
  const [items,setItems]=useState([]);
  const [search,setSearch]=useState("");
  const [open,setOpen]=useState(false);
  const[item,setItem]=useState();

  const navigate =useNavigate();

  useEffect(()=>{
    
    GetAllPharmacyItem((status,data,error)=>{
    if(status){
      setItems(data);
      console.log('Items List: ',items);
    }else{
      alert(error)
    }
  })
  },[])

  const DeletePharmacyItems = (id)=>{

    DeletePharmacyItem(id,(status,message,error)=>{
      if(status ==true){
        alert(message)
        window.location.reload()
      }else{
        alert(message)
      }
    })
  }

  const UpdatPharmacyItem = (item)=>{
    // navigate(`/UpdatPharmacyItem/${id}`)
    setOpen(true)
    setItem(item);
    console.log('Open staus: ',open);
  }

  const SearchTextHandler = (e)=>{
    const value = e.target.value
    setSearch({
      ...search,
      [e.target.name]:value
    })

    console.log('Search Key: ',e.target.value);
  }

  const SearchPharmacyItem = ()=>{
          SearchPharmacyItems(search,(status,data,error)=>{
            if(status == true){
              
              setItems(data)
              // window.location.reload()
            }else{
              alert(error)
            }
          })
  }



  return (
    <>
      <PharmacyNavBar/>
      <div className="container" >
      
        <Box sx={{ width: "100%", padding: 3 }}>
        <div className="search" style={{width:'30%', marginTop:5,marginBottom:5,flexDirection:'row',display:'flex'}}>

        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          name="search"
          onChange={SearchTextHandler}
        />
    
        
        <SearchIcon style={{align:'center'}} onClick={SearchPharmacyItem}/>
      </div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Item Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Remove Item</TableCell>
            <TableCell align="right">Update Item</TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right"><DeleteIcon color='red' onClick={()=>DeletePharmacyItems(item.id)}/></TableCell>
              <TableCell align="right"><CreateIcon color='red' onClick={()=>UpdatPharmacyItem(item)}/></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    
        </Box>
        {open ? <UpdateModal open={open} data={item}/>:null}
      </div>
    </>
  );
}

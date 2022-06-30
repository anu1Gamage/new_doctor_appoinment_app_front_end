import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/screens/Admin/Register";
import SignIn from "./components/screens/Common/Login";
import Welcome from "./components/screens/Common/Welcome";
import Availability from "./components/screens/Doctor/Availability";
import Patientlist from "./components/screens/Receptionist/Patientlist";
import AddMedicines from "./components/screens/Pharmacist/AddMedicines";
import DoctorCradList from "./components/screens/Patient/DoctorCradList"
import DoctorListRec from "./components/screens/Receptionist/DoctorList";
import Addprescribe from "./components/screens/Doctor/Addprescribe";
import AddPatient from "./components/screens/Receptionist/AddPatient";
import AddSpecialization from "./components/screens/Admin/AddSpecialization";
import AddDoctor from "./components/screens/Admin/AddDoctor";
import PharmacyItemList from "./components/screens/Pharmacist/PharmacyItemList";
import ViewAllUsers from "./components/screens/Admin/ViewAllUsers";
import ViewAlllist from "./components/screens/Admin/ViewAlllist";
import Modal from "./components/screens/Common/Modal";
import UpdatePatient from "./components/screens/Admin/UpdatePatient";
import UpdateDoctor from "./components/screens/Admin/UpdateDoctor";
import Appoinment from "./components/screens/Receptionist/Appoinment";
import ViewAppoinments from "./components/screens/Doctor/ViewAppoinments";
import IssueItems from "./components/screens/Pharmacist/IssueItems";
import ViewSchedule from "./components/screens/Doctor/ViewSchedule";
import UpdateSchedule from "./components/screens/Doctor/UpdateSchedule";
import TerminateAppoinment from "./components/screens/Receptionist/TerminateAppoinment";
import ViewDoctorSchedule from "./components/screens/Receptionist/ViewDoctorSchedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" exact element={<Welcome/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/AddUsers" element={<SignUp/>} />
        <Route path="/PatientList" element={<Patientlist/>} />
        <Route path="/availability" element={<Availability/>}/>
        <Route path="/DoctorList" element={<DoctorListRec/>}/>
        <Route path="/addmedicines" element={<AddMedicines/>}/>
        <Route path="/doctorcardlist" element={<DoctorCradList/>}/>
        <Route path="/addprescribe/:id" element={<Addprescribe/>}/>
        <Route path="/AddPatient" element={<AddPatient/>}/>
        <Route path="/Specialization" element={<AddSpecialization/>}/>
        <Route path="/AddDoctor" element={<AddDoctor/>}/>
        <Route path="/AddItems" element={<AddMedicines/>}/>
        <Route path="/PharmacyItems" element={<PharmacyItemList/>}/>
        <Route path="/AllUsers" element={<ViewAllUsers/>}/>
        <Route path="/Updatepatient/:id" element={<UpdatePatient/>}/>
        <Route path="/Updatedoctor/:id" element={<UpdateDoctor/>}/>
        <Route path="/viewalllist" element={<ViewAlllist/>}/>
        <Route path="/modal" element={<Modal/>}/>
        <Route path="/appoinment/:id" element={<Appoinment/>}/>
        <Route path="/ViewAppoinments" element={< ViewAppoinments/>}/>
        <Route path="/ViewPrescriptions" element={< IssueItems/>}/>
        <Route path="/ViewSchedule" element={< ViewSchedule/>}/>
        <Route path="/UpdateSchedule" element={< UpdateSchedule/>}/>
        <Route path="/TerminateAppoinment/:id" element={< TerminateAppoinment/>}/>
        <Route path="/ViewDoctorSchedule/:id" element={< ViewDoctorSchedule/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

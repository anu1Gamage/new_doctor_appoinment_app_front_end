import React from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  let navigate = useNavigate();

  const handleLoginNavigate = () => {
    navigate("/login");
  };

  const hadleDoctorListNavigate = () =>{
    navigate("/doctorcardlist")
  }
  return (
    <div className="section">
      <div className="banner">
        <div className="container">
        <div className="login-text">
          <h5 onClick={handleLoginNavigate}>Login</h5>
        </div>
          <div className="banner-content-row">
            <div className="col-sm-12">
              <span className="topic">WELCOME TO MEDIPLUS</span>
              <h1>
                We are here<br></br> for your Care
              </h1>
              <p className="description">
                Far far away, behind the word mountains, far from the countries
                <br></br>
                Vokalia and Consonantia, there live the blind texts. Separated
                <br></br>
                they live in Bookmarksgrove.
              </p>
              <button className="btn-login" onClick={hadleDoctorListNavigate}>
                View Doctors
              </button>
              {/* <button className="btn-register">Register</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

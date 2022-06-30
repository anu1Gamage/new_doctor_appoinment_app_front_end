//Validate email
export const ValidateEmail = (email) => {
    var regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    return regEmail.test(email);
  };

  //Validate 10 digits mobile number
  export const ValidateTelephoneNo = (telno) => {
    var regTelNo;
    console.log(telno);
    regTelNo = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;
  
    return regTelNo.test(telno);
  };

const CONST_ROLE = "role";
const CONST_TOKEN = "accessToken";
const CONST_TYPE = "tokenType";
const CONST_USER = "user";
const CONST_DOCTOR="doctor";

export const saveRole = (role) => {
    localStorage.setItem(CONST_ROLE, role);
}

export const saveAccessToken = (token) => {
    localStorage.setItem(CONST_TOKEN, token);
}

export const saveTokenType = (type) => {
    localStorage.setItem(CONST_TYPE, type);
}

export const saveUserDetails = (user)=>{
    localStorage.setItem(CONST_USER,user);
}

export const saveDoctorDetails = (doctor)=>{
    localStorage.setItem(CONST_DOCTOR,doctor)
}


export const getRole = () => {
    return localStorage.getItem(CONST_ROLE);
}

export const getAccessToken = () => {
    return localStorage.getItem(CONST_TOKEN);
}

export const getTokenType = () => {
    return localStorage.getItem(CONST_TYPE);
}

export const getUserDetails = () =>{
    console.log('User Details: ',localStorage.getItem(CONST_USER));
    return localStorage.getItem(CONST_USER);
    
}

export const getDoctorDetails = ()=>{
    console.log('DR Details98: ',localStorage.getItem(CONST_DOCTOR));
    return localStorage.getItem(CONST_DOCTOR);
}




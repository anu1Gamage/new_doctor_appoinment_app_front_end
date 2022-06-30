
import axios from "axios";

import { saveAccessToken, saveRole, saveTokenType,saveUserDetails } from "../util/web_storage";

import { axiosInstance } from "./api";

const API_URL = "/users";


export const register = async(data,callback) => {

    console.log('data: ',data);

    const user ={
        firstName : data.firstName,
        lastName : data.lastName,
        username : data.username,
        contactNumber : data.contactNumber,
        gender : data.gender,
        password : data.password,
        appUserRoles : [data.appUserRoles]
    }

    console.log('User Obj: ',user);

    return axiosInstance.post(API_URL + "/signup",user).then((res)=>{
        if(res.status===200){
            callback(true,'Registered Completed Sucessfully',null)
        }
    }).catch(error=>{
        console.log('Server Error: ',error);
        callback(false,'Server Error',error)
    })
};


const login = async (username, password) => {
    try {

      console.log('Login Credentials: ',username+" "+password);
        const response = await axiosInstance
            .post(API_URL + "/signin", {
                username,
                password,
            });

            console.log('Response: ',response.status);
        if (response.status === 200) {
            saveAccessToken(response.data)
             const userData = await axiosInstance.get(API_URL+'/user-details')
              if(userData.status === 200){
                console.log('User Data99',userData.data);
                saveUserDetails(JSON.stringify(userData.data))
                return userData.data;
              }
            // saveRole(response.data.role);
            // saveAccessToken(response.data.accessToken);
            // saveTokenType(response.data.tokenType);
        }
       
    }
    catch (e) {
        throw e;
    }
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {

    login,
    logout,
    getCurrentUser,
};



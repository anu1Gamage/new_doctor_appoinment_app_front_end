import { axiosInstance } from "./api";

const PATIENT_URL='/patient';

export const addPatient = async(data,callback)=>{
   
    return axiosInstance.post(PATIENT_URL,data).then((res)=>{
        if(res.status===200){
            callback(true,'Patent Added Sucessfully',null)
        }
    }).catch(error=>{
        console.log('Server Error: ',error);
        callback(false,'Server Error',error)
    })
}

export const GetPatientById = async(id,callback)=>{
    return axiosInstance.get(PATIENT_URL+`/${id}`).then((res)=>{
       console.log('Patient Details: ',res.data);
       callback(true,res.data,null)
    }).catch(error=>{
        console.log('Server Error: ',error);
        callback(false,null,error)
    })
}

export const GetAllPatient = async(callback)=>{

    return axiosInstance.get(PATIENT_URL+'/all').then((res)=>{
      console.log('Patient Details: ',res.data);
       callback(true,res.data,null)
    }).catch(error=>{
        console.log('Server Error: ',error);
        callback(false,null,error.message)
    })
}

export const UpdatePatientDetaills =async(data,callback)=>{

    return axiosInstance.put(PATIENT_URL,data).then((res)=>{
        console.log('Patient Details: ',res.data);
        callback(true,'Updated Sucessful',res.data,null)
     }).catch(error=>{
         console.log('Server Error: ',error);
         callback(false,'Server Error: ',null,error)
     })
}

export const GetPatientByEmail = async(email,callback)=>{
    return axiosInstance.get(`/patient/search?email=${email}`).then((res)=>{
        console.log('search Patient Details by email: ',res.data);
         callback(true,res.data,null)
      }).catch(error=>{
        console.log('Server Error: ',error);
        callback(false,null,error)
    })
}

export const DeletePatient = async (id,callback)=>{
    return axiosInstance.delete(`/patient/${id}`).then((res)=>{
        console.log('Patient Delete Response: ',res);

        callback(true,'Patient deleted Sucessfully!',null)
    }).catch((error)=>{
        callback(false,'Something went to wrong',error)
    })
}

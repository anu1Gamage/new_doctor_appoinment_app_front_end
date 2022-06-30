import { axiosInstance } from "./api";

export const CreateAppoinment =async(data,callback)=>{

    return axiosInstance.post('/appointment',data).then((res)=>{
        console.log('Saved Appoinments Res: ',res);
        callback(true,res.data,null)
    }).catch((error)=>{
        callback(false,null,error)
    })
}

export const GetAppoinmentByDoctor = async(id,date,callback)=>{
    return axiosInstance.get(`/appointment/get-by-doctor?doctor-id=${id}&date=${date}`).then((res)=>{
        console.log('Get Appoinment By Doctor: ',res.data);
        callback(true,res.data,null)
    }).catch((error)=>{
        callback(false,null,error)
    })
}

export const GetAppoinmentByPatient = async(id,callback)=>{
    return axiosInstance.get(`/appointment/get-by-patient?patient-id=${id}`).then((res)=>{
        console.log('Get Appoinment By Patient: ',res.data);
        callback(true,res.data,null)
    }).catch((error)=>{
        callback(false,null,error)
    })
}

export const TerminateAppoinments = async(id,callback)=>{
    return axiosInstance.put(`/appointment/terminate?appointment-id=${id}`).then(res=>{
        console.log('Terminate appoinment res: -',res);
        callback(true,'Appoinment Terminated!',null)
    }).catch((error)=>{
        callback(false,'',error.message)
    })
}
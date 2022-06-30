import { axiosInstance } from "./api";

export const CreateSchedule = async(data,id,callback)=>{
    return axiosInstance.post(`/schedule/${id}`,data).then((res)=>{
        console.log('Doctor Schedule Create Response: ',res);
        callback(true,'Weekly Schedule Created Sucessfully',null)
    }).catch((error)=>{
        callback(false,'Something went wrong',error)
    })
}

export const GetScheduleByDoctorId =async(id,callback)=>{
    return axiosInstance.get(`/schedule/${id}`).then((res)=>{
        console.log('Get Schedule By Doctor ID: ',res.data);
        callback(true,res.data,null)
    }).catch((error)=>{
        callback(false,null,error)
    })
}

export const UpdateDoctorSchedule= async(id,data,callback)=>{

    return axiosInstance.put(`/schedule/${id}`,data).then(res=>{
        console.log("Update Schedule sucess response: ", res.data);
        callback(true,"Doctor Schedule Updated Sucessfully!",null)
    }).catch((error)=>{
        callback(false,'',error.message)
    })
}
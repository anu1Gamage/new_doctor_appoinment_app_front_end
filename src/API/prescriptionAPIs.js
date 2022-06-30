import { axiosInstance } from "./api";

export const CreatePrescription =async(data,callback)=>{
    return axiosInstance
    .post('/prescription', data)
    .then((res) => {
      console.log("Create Prescription Response", res.data);
      callback(true, "Item Added Successful!", null);
    })
    .catch((error) => {
      callback(false, "Item Added False", error);
    });
}

export const IssueMedicine =async(id,data,callback)=>{
    return axiosInstance.put(`/prescription/issue/${id}`,data).then((res)=>{
        console.log('Item Issue res: ',res);
        callback(true,'Item Issued Succesfull',null)
    })
    .catch((error) => {
        callback(false, "Item Issued False", error);
      });
}

export const GetPrescription =async(callback)=>{
    return axiosInstance.get('/prescription/?issued=FALSE').then((res)=>{
        console.log('Get Prescription Res: ',res.data);
        callback(true,res.data,null)
    }) .catch((error) => {
        callback(false, null, error);
      });
}
import { axiosInstance } from "./api";

const PHARMACY_URL = "/pharmacy-item";

export const AddPharmacyItem = async (data, callback) => {
  return axiosInstance
    .post(PHARMACY_URL, data)
    .then((res) => {
      console.log("Add Item Response", res.data);
      callback(true, "Item Added Successful!", null);
    })
    .catch((error) => {
      callback(false, "Item Added False", error);
    });
};

export const GetAllPharmacyItem = async (callback) => {
  return axiosInstance
    .get(PHARMACY_URL)
    .then((res) => {
      console.log("All Pharmacy Items");
      callback(true, res.data, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
};

export const UpdatePharmacyItem = async (data, callback) => {
  return axiosInstance
    .put(PHARMACY_URL, data)
    .then((res) => {
      console.log("Update Pharmacy Item Response", res.data);
      callback(true, "Item Updated Successful!", null);
    })
    .catch((error) => {
      callback(false, "Item Updated False", error);
    });
};

export const DeletePharmacyItem = async(id,callback)=>{
    return axiosInstance.delete(PHARMACY_URL+`/${id}`).then((res)=>{
        console.log("Delete Pharmacy Item Response", res);
        callback(true, "Pharmacy Item Deleted Successful!", null);
    }).catch((error) => {
        callback(false, "Pharmacy Item Deleted False", error);
      });
}

export const SearchPharmacyItems = async(key,callback)=>{
  console.log('Search key: ',key);
    return axiosInstance.get(`/pharmacy-item/search?search-key=${key.search}`).then((res)=>{
        console.log('Search Results: ',res.data);
        callback(true,res.data,null)
    }).catch((error) => {
        callback(false, null, error);
      });
}

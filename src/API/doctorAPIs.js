import { axiosInstance } from "./api";

export const DoctorSpecialization = async (data, callback) => {
  return axiosInstance
    .post("/doctor-specialization", data)
    .then((res) => {
      console.log("Doctor-Specialization res: ", res.data);
      callback(true, "Specialization Succesfully Added!", null);
    })
    .catch((error) => {
      callback(false, "Something Went Wrong", error);
    });
};

export const GetAllSpecializations = async (callback) => {
  return axiosInstance
    .get("/doctor-specialization/all")
    .then((res) => {
      console.log("Doctor-Specialization res: ", res.data);
      callback(true, res.data, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
};

export const UpdateDoctorSpecialization = async (data, callback) => {
  return axiosInstance
    .put("/doctor-specialization", data)
    .then((res) => {
      console.log("Doctor-Specialization res: ", res.data);
      callback(true, "Specialization Succesfully Updated!", null);
    })
    .catch((error) => {
      callback(false, "Something Went Wrong", error);
    });
};

export const DeleteSpecialization = async (id, callback) => {
  return axiosInstance
    .delete(`/doctor-specialization/${id}`)
    .then((res) => {
      console.log("Doctor Specialization Delete Response: ", res);

      callback(true, `Specilalization item id: ${id} deleted succesfully`, null);
    })
    .catch((error) => {
      callback(false, '', error);
    });
};

export const CreateDoctor = async (data, callback) => {
  return axiosInstance
    .post("/doctor", data)
    .then((res) => {
      console.log("Doctor Details: ", res.data);
      callback(true, "Doctor Succesfully Added!", null);
    })
    .catch((error) => {
      callback(false, "Something Went Wrong", error);
    });
};

export const GetAllDoctors = async (callback) => {
  return axiosInstance
    .get("/doctor/all")
    .then((res) => {
      console.log("Doctor List: ", res.data);
      callback(true, res.data, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
};

export const GetDoctorByUserId = async (id, callback) => {
  return axiosInstance
    .get(`/doctor/${id}`)
    .then((res) => {
      console.log("Get Doctor Details By User Id: ", res.data);
      callback(true, res.data, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
};

export const DeleteDoctor = async (id, callback) => {
  return axiosInstance
    .delete(`/doctor/${id}`)
    .then((res) => {
      console.log("Doctor Delete Response: ", res);

      callback(true, res, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
};

export const SearchDoctor = async (gender, callback) => {
  return axiosInstance.get(`/doctor/search?gender=${gender}`).then((res) => {
    console.log("GSeacrh Doctor Res: ", res.data);
    callback(true, res.data, null);
  });
};

export const UpdateeDoctor = async (data, callback) => {

  return axiosInstance
    .put("/doctor", data)
    .then((res) => {
      console.log("Updated Doctor Details: ", res.data);
      callback(true, "Doctor Succesfully Updated!", null);
    })
    .catch((error) => {
      callback(false, "Something Went Wrong", error);
    });
};

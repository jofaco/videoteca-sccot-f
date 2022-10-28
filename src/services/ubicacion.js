import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/ubicaciones/";

export const RegisterUbicacion = async (newUbicacion) => {
    const response = await axiosInstance.post(API_URL, newUbicacion);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const ListUbicacion = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const ListUbicacionHist = async (histUser_id) => {
    const response = await axiosInstance.post(`${API_URL}list_by_historial/`,histUser_id);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const getUbicacion = async (videoID) => {
    const response = await axiosInstance.get(API_URL + "retrieve/" + videoID);
    if (response.status === 200) {
      return response.data;
    }
  };

export const updateUbicacion = async(id,updateUbicacion) =>{
    const response = await axiosInstance.patch(API_URL+id+"/",updateUbicacion);
    if (response.status === 200) {
        return response.data;
    }
}
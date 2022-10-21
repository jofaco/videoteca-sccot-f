import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/historialUser/";

export const RegisterHistorialUser = async (newHistorial) => {
    const response = await axiosInstance.post(API_URL, newHistorial);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const ListHistorialUser = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
export const getHistorialUser = async (videoID) => {
    const response = await axiosInstance.get(API_URL + "retrieve/" + videoID);
    if (response.status === 200) {
      return response.data;
    }
  };

export const updateHistorialUser = async(id,updateHU) =>{
    const response = await axiosInstance.patch(API_URL+id+"/",updateHU);
    if (response.status === 200) {
        return response.data;
    }
}
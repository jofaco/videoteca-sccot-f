import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/fechaReprods/";

export const RegisterFechaRepro = async (newFecha) => {
    const response = await axiosInstance.post(API_URL, newFecha);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const ListFechaRepro = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
export const getFechaRepro = async (histID) => {
    const response = await axiosInstance.get(`${API_URL}${histID}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
export const ListFechaReprox2 = async (data) => {
    const response = await axiosInstance.post(`${API_URL}list_by_user_video/`,data);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const getHistorialVideo = async (videoID) => {
    const response = await axiosInstance.get(API_URL + "retrieve/" + videoID);
    if (response.status === 200) {
      return response.data;
    }
  };

export const updateHistorialVideo = async(id,updateHU) =>{
    const response = await axiosInstance.patch(API_URL+id+"/",updateHU);
    if (response.status === 200) {
        return response.data;
    }
}
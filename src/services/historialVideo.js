import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/historialVideo/";

export const RegisterHistorialVideo = async (newHistorial) => {
    const response = await axiosInstance.post(API_URL, newHistorial);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const ListHistorial = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
export const getHistorial = async (histID) => {
    const response = await axiosInstance.get(`${API_URL}${histID}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
export const ListHistorialVideo = async (idVideo) => {
    const response = await axiosInstance.post(`${API_URL}list_by_Video/`,idVideo);
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
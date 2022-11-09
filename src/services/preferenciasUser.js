import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/gustos_by_users/";

export const RegisterPreferenciaUser = async (newPreferencia) => {
    const response = await axiosInstance.post(API_URL, newPreferencia);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const ListPreferencia = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
export const getPreferencia = async (histID) => {
    const response = await axiosInstance.get(`${API_URL}${histID}`);
    if (response.status === 200) {
      return await response.data;
    }
  };
export const ListPreferenciaUser = async (idUser) => {
    const response = await axiosInstance.post(`${API_URL}list_by_user/`,idUser);
    if (response.status === 200) {
      return await response.data;
    }
  };

export const getPreferenciaUser = async (videoID) => {
    const response = await axiosInstance.get(API_URL + "retrieve/" + videoID);
    if (response.status === 200) {
      return response.data;
    }
  };

export const updatePreferenciaUser = async(id,updateHU) =>{
    const response = await axiosInstance.patch(API_URL+id+"/",updateHU);
    if (response.status === 200) {
        return response.data;
    }
}
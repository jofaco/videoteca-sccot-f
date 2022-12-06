import axios from "axios";
import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/";

/**
 * Función para realizar login
 * @param {formdata} credentials 
 * @returns data enviada desde el backend
 */
export const Login = async (credentials) => {
  const data = await axios.post(API_URL + "login/", credentials);
  return data;
};
/**
 * Función para consultar un usuario en específico.
 * @param {pk} userID 
 * @returns data enviada desde el backend
 */
export const getUser = async (userID) => {
  const response = await axiosInstance.get(`${API_URL}users/${userID}`);
  if (response.status === 200) {
    return await response.data;
  }
};
/**
 * Función para actualizar la imagen de perfil de un usuario.
 * @param {id} userID 
 * @param {img} updateImg 
 * @returns data enviada desde el backend
 */
export const updateImage = async (userID,updateImg) => {
  const response = await axiosInstance.patch(`${API_URL}users/${userID}/`,updateImg);
  if (response.status === 200) {
    return await response.data;
  }
};

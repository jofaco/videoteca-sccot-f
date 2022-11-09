import axios from "axios";
import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/";

export const Login = async (credentials) => {
  const data = await axios.post(API_URL + "login/", credentials);
  return data;
};

export const getUser = async (userID) => {
  const response = await axiosInstance.get(`${API_URL}users/${userID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const updateImage = async (userID,updateImg) => {
  const response = await axiosInstance.patch(`${API_URL}users/${userID}/`,updateImg);
  if (response.status === 200) {
    return await response.data;
  }
};

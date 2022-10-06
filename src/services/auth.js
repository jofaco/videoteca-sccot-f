import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export const Login = async (credentials) => {
  const data = await axios.post(API_URL + "login/", credentials);
  return data;
};

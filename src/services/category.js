import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/";

export const ListCategorias = async () => {
  const response = await axiosInstance.get(API_URL + "categorias/");
  if (response.status === 200) {
    return await response.data;
  }
};

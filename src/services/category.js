import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/";

/**
 * Función para consultar todas las categorias registradas en la base de datos.
 * @returns Data enviada desde el backend
 */
export const ListCategorias = async () => {
  const response = await axiosInstance.get(API_URL + "categorias/");
  if (response.status === 200) {
    return await response.data;
  }
};

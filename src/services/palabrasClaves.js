import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/palabrasclaves/";

/**
 * Función para consultar todas las categorias registradas en la base de datos.
 * @returns Data enviada desde el backend
 */
export const ListPalabrasClaves = async () => {
  const response = await axiosInstance.get(API_URL);
  if (response.status === 200) {
    return await response.data;
  }
};

export const RegisterPalabrasClaves = async (newPalabrasClaves) => {
  const response = await axiosInstance.post(API_URL, newPalabrasClaves);
  if (response.status === 200) {
    return await response.data;
  }
};

export const getPalabrasClaves = async (SubpalabrasclavesID) => {
  const response = await axiosInstance.get(`${API_URL}${SubpalabrasclavesID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const updatePalabrasClaves = async(id,updPalabrasClaves) =>{
  const response = await axiosInstance.patch(API_URL+id+"/",updPalabrasClaves);
  if (response.status === 200) {
      return response.data;
  }
}
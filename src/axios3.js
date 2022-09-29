import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/";

export const ENDPOINTS =  {
    VIDEO : 'videos',
    USER : 'users'
}

export const axiosInstance = endpoint => {
    let url = API_URL + endpoint;

    return {
        fetchAll:()=> axios.get(url),
        fetchById: id => axios.get(url+id+'/'),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updateRecord) => axios.put(url+id+'/', updateRecord),
        delete: id => axios.delete(url+id+'/'),
        login: loginData => axios.post(url+'login/',loginData),
    }
}

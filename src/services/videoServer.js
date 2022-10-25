import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/videos/";

export const ListVideos = async () => {
  const response = await axiosInstance.get(`${API_URL}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const ListPeliculas = async () => {
  const response = await axiosInstance.get(`${API_URL}listPeliculas/`);
  if (response.status === 200) {
    return await response.data;
  }
}

export const ListSeries = async () => {
  const response = await axiosInstance.get(`${API_URL}listSeries/`);
  if (response.status === 200) {
    return await response.data;
  }
}

export const getVideo = async (videoID) => {
  const response = await axiosInstance.get(`${API_URL}${videoID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const getVideoDT = async (videoID) => {
  const response = await axiosInstance.get(API_URL + "retrieve/" + videoID);
  if (response.status === 200) {
    return response.data;
  }
};

export const RegisterVideo = async (newVideo) => {
  const response = await axiosInstance.post(API_URL, newVideo);
  if (response.status === 200) {
    return await response.data;
  }
};

export const UpdateVideo = async (videoID, updateVideo) => {
  const response = await axiosInstance.put(
    API_URL + videoID + "/",
    updateVideo
  );
  if (response.status === 200) {
    return await response.data;
  }
};

export const DeleteVideo = async (videoID) => {
  return await axiosInstance.delete(`${API_URL}${videoID}`);

  /* return await fetch(`${API_URL}${videoID}`, {
        method:'DELETE',        
    }); */
};

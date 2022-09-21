
const API_URL = "http://127.0.0.1:8000/videos/";



export const ListVideos= async () => {
    return await fetch(API_URL);
};

export const getVideo =  async (videoID) => {
    return await fetch(`${API_URL}${videoID}`);
};

export const RegisterVideo = async (newVideo) => {
    return await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'code_esp' : String(newVideo.code_esp).trim(),
            'code_engl' : String(newVideo.code_engl).trim(),
            'title_espanol' : String(newVideo.title_espanol).trim(),
            'title_english' : String(newVideo.title_english).trim(),
            'title_cap_esp' : String(newVideo.title_cap_esp).trim(),
            'title_cap_english' : String(newVideo.title_cap_english).trim(),
            'description_esp' : String(newVideo.description_esp).trim(),
            'description_english' : String(newVideo.description_english).trim(),
            'tipe_of_video' : (newVideo.tipe_of_video),
            'languages' : newVideo.languages,

        })
    });
};

export const UpdateVideo = async (videoID, updateVideo) => {
    return await fetch(`${API_URL}${videoID}/`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'code_esp' : String(updateVideo.code_esp).trim(),
            'code_engl' : String(updateVideo.code_engl).trim(),
            'title_espanol' : String(updateVideo.title_espanol).trim(),
            'title_english' : String(updateVideo.title_english).trim(),
            'title_cap_esp' : String(updateVideo.title_cap_esp).trim(),
            'title_cap_english' : String(updateVideo.title_cap_english).trim(),
            'description_esp' : String(updateVideo.description_esp).trim(),
            'description_english' : String(updateVideo.description_english).trim(),
            'tipe_of_video' : (updateVideo.tipe_of_video),
            'languages' : updateVideo.languages,

        })
    });
};

export const DeleteVideo = async (videoID) => {
    return await fetch(`${API_URL}${videoID}`, {
        method:'DELETE',
        
    });
};
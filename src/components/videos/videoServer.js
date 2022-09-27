

const API_URL = "http://127.0.0.1:8000/videos/";


export const ListVideos= async () => {
    return await fetch(API_URL);
};

export const getVideo =  async (videoID) => {
    return await fetch(`${API_URL}${videoID}`);
};

/* export const RegisterVideo = async (newVideo,featured_imagen) => {

    return await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type': 'multipart/form-data',
            //'Content-Type': 'application/json',
        },
        body:newVideo
    });
};
 */

export const UpdateVideo = async (videoID, updateVideo,featured_imagen) => {
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
            'featured_imagen' : (featured_imagen),
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

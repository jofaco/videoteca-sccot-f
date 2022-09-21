import React from "react";

import * as VideoServer from "./videoServer";
import { useNavigate  } from "react-router-dom";


const VideosItem = ({video, listVideos}) => {
    const history = useNavigate();

    const handleDelete = async (videoID)=>{
        await VideoServer.DeleteVideo(videoID);
        listVideos();
    }

    return (

        <div className="col-md-4 mb-4">
            <div className="card card-body">    
                <h3 className="card-title">{video.title_espanol}
                <button onClick={()=> history(`/updateVideo/${video.id}`)} className="ms-5 btn btn-sm btn-info">Update</button>
                </h3>
                <p className="card-text">{video.description_esp}</p>
                <button onClick={()=>video.id && handleDelete(video.id) } className="btn btn-danger my-2">Eliminar Video</button>
            </div>            
        </div>
    );

};

export default VideosItem;

import React from "react";


import { useNavigate  } from "react-router-dom";
import { Image } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import * as VideoServer from "./videoServer";


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(5),

		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	
}));

const VideosItem = ({video, listVideos}) => {
    const history = useNavigate();

    const handleDelete = async (videoID)=>{
        await VideoServer.DeleteVideo(videoID);
        listVideos();
    }
    const classes = useStyles();

    return (

            <div className="card card-body">    
                <h3 className={classes.paper}>{video.title_espanol}
                <button onClick={()=> history(`/updateVideo/${video.id}`)} className="ms-6 btn  btn-info">Update</button>
                </h3>
                <p className="card-text">{video.description_esp}</p>
                <p className="card-text">Duración: {video.duration}</p>
                <p className="card-text">Puntuación: {video.score}</p>

                <Button onClick={()=> history(`/seeVideo/${video.id}`)}>
                    <Image src={ video.featured_image } className="img-fluid"
                    ></Image>
                </Button>
                <button onClick={()=>video.id && handleDelete(video.id) } className="btn btn-danger my-2">Eliminar Video</button>
            </div>
    );

};

export default VideosItem;

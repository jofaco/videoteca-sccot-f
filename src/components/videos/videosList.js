import React, { useEffect, useState } from "react";
import * as VideoServer from "./videoServer";
//import Table from "react-bootstrap/Table";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-bootstrap/Carousel';
//Components
import VideosItem from "./videosItem";
import VideosItemRow from "./videosItemRow";
import VideosListAd from "../admin/videosListAdmin";

const useStyles = makeStyles((theme) => ({
	root: {
    maxWidth: 1000,	
    margin:'auto'
	},
  '@media (max-width: 1000px)': {
    root: {
      display: 'flex',
    },
  },
	
}));

const VideosList = () => {
    const [videos, setVideos] = useState([]);
    const data = localStorage.getItem('user');
    const user = JSON.parse(data);
    const listVideos = async () => {
      try {
        const res = await VideoServer.ListVideos();
        setVideos(res.videos);
      } catch (error) {
        console.log("Error");
      }
    };
    
    useEffect(() => {
        listVideos();
    }, []);
    const classes = useStyles();
    if (user) {
      if (user.is_superuser){
        return(
          <VideosListAd 
          videos={videos}
          listVideos ={listVideos}
        /> 
        )               
      }
      return (
        <div className="container">
          <div className={classes.root}>
            <Carousel >
              {videos.map((video) => (
                <Carousel.Item key={video.id}>
                  <VideosItem key={video.id} video={video} listVideos = {listVideos} />   
                </Carousel.Item>             
              ))}
            </Carousel>
          </div>
            <br></br>
            <hr></hr>
            <div className="container">
              <div className="row">
                {videos.map((videos) => (
                  <VideosItemRow key={videos.id} video={videos} listVideos={listVideos} />
                ))}
              </div>
            </div>
          </div>
      );
    }
    return (
			<p style={{ fontSize: '25px' }}>
				Inicia sesión para ver todos los videos!
			</p>
		);
  };

export default VideosList;

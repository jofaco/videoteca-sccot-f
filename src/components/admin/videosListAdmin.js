import React, { useEffect, useState } from "react";
//import Table from "react-bootstrap/Table";
//components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-bootstrap/Carousel';
//dependencies
import VideosItemAdmin from "../admin/videosItemAdmin";
import VideosItemRow from "../videos/videosItemRow";

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

function VideosListAd (props) {

    const [videos, setVideos] = useState([]);
    
    useEffect(() => {
        setVideos(props.videos);
    }, [props.videos]);
    
    const classes = useStyles();

    return (
        <div className="container">
          <div className={classes.root}>
            <Carousel >
              {videos.map((video) => (
                <Carousel.Item key={video.id}>
                  <VideosItemAdmin key={video.id} video={video} listVideos = {props.listVideos} />   
                </Carousel.Item>             
              ))}
            </Carousel>
          </div>
          <br></br>
          <hr></hr>
          <div className="container">
            <div className="row">
              {videos.map((videos) => (
                <VideosItemRow key={videos.id} video={videos} listVideos={props.listVideos} />
              ))}
            </div>
          </div>
        </div>
      );
}

export default VideosListAd;
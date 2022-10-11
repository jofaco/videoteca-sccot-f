import React, { useEffect, useState } from "react";
//import Table from "react-bootstrap/Table";
//components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-bootstrap/Carousel";
//import Carousel from 'react-material-ui-carousel'
//dependencies
import VideosItemAdmin from "../admin/videosItemAdmin";
import VideosCategoriaFila from "../videos/videosCategoriaFila";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: "auto",
  },
  "@media (max-width: 1000px)": {
    root: {
      display: "flex",
    },
  },
  title: {
    marginLeft: 10,
  }
}));

function VideosListAd(props) {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setVideos(props.videos);
    setCategories(props.categories);
  }, [props.categories, props.videos]);

  
  const classes = useStyles();

  return (
    <div className="container">
      <div id="carousel_videos">
        <h2 className={classes.title}>Latest videos</h2>
        <Carousel className={classes.root} id="carousel" >
          {videos &&
            props.search(videos).map((video) => (
              <Carousel.Item key={video.id} interval={10000}>
                <VideosItemAdmin
                  key={video.id}
                  video={video}
                />
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
      <br></br>
      <hr></hr>
      <div className="container">
        {videos && categories && props.search2(categories).map((element) => (
          <VideosCategoriaFila
            key= {element.id}
            categoria ={element}
            videos={videos}
            search={props.search}
          >
          </VideosCategoriaFila>
        ))}
      </div>
    </div>
  );
}

export default VideosListAd;

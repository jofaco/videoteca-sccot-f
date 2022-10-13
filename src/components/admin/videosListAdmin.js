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
    maxWidth: 1248,
    margin: "auto",
  },
  "@media (max-width: 1248px)": {
    root: {
      display: "flex",
    },
  },
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
    <>
      <div id="carousel_videos">
        <h2 >Latest videos</h2>
        <Carousel className={classes.root} id="carousel" fade >
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
      <div id="card_videos">
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
    </>
  );
}

export default VideosListAd;

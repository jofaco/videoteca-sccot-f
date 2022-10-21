import React, { useEffect, useState } from "react";
//import Table from "react-bootstrap/Table";
//components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-bootstrap/Carousel";

//dependencies
import VideosItem from "./videosItem";
import VideosCategoriaFila2 from "./videosCategoriaFila2";


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

function VideosListUser2(props) {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setVideos(props.videos);
    setCategories(props.categories);
  }, [props.categories, props.videos]);

  const classes = useStyles();

  return (
    <div>
      <div id="carousel_videos">
        <h2>Latest videos</h2>
        <Carousel className={classes.root} id="carousel" fade >
          {videos &&
            props.search(videos).map((video) => (
              <Carousel.Item key={video.id}>
                <VideosItem
                  key={video.id}
                  video={video}
                  listVideos={props.listVideos}
                />
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
      <br></br>
      <hr></hr>
      <div id="card_videos">
        {videos && categories && props.search2(categories).map((element) => (
          <VideosCategoriaFila2
            key= {element.id}
            categoria ={element}
            videos={videos}
            search={props.search}
          >
          </VideosCategoriaFila2>
          ))}
      </div>
    </div>
  );
}

export default VideosListUser2;

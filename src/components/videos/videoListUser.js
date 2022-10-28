import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-bootstrap/Carousel";
//dependencies
import VideosItem from "./videosItem";
import VideosCategoriaFila from "./videosCategoriaFila";
import * as HistorialUserServer from "../../services/historialUser";

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

function VideosListUser(props) {
  const history = useNavigate();

  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [histUsers, setHistUsers] = useState();

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  const getHistorialUsers = async () => {
    try {
      //const res = await HistorialUserServer.ListHistorial();
      const res = await HistorialUserServer.ListHistorialUser({'user_id':user.id});
      console.log(res);
      setHistUsers(res);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getHistorialUsers();
    setVideos(props.videos);
    setCategories(props.categories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.categories, props.videos]);

  const verVideo = async (id) =>{
    const formData = new FormData();
    let histUser;
    let contador = 0;
    formData.append("usuario", user.id);
    formData.append("video", id);
    try {
      for (let index = 0; index < histUsers.length; index++) {
      const element = histUsers[index];
        if (element.usuario_id === user.id && element.video_id === id) {
          histUser= element;
          contador++;
        }
      }
      if(contador ===0) {
        console.log("prueba");
        const hu = await  HistorialUserServer.RegisterHistorialUser(formData);
        histUser = hu.data;
      }
      
    } catch (error) {
      console.log(error);
    }
    history(`/seeVideo/${id}`,{state:histUser});
  }
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
                  histUsers = {histUsers}
                  user = {user}
                  verVideo = {verVideo}
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
            histUsers = {histUsers}
            user = {user}
            verVideo= {verVideo}

          >
          </VideosCategoriaFila>
          ))}
      </div>
    </div>
  );
}

export default VideosListUser;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useContext } from "react";

//components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-bootstrap/Carousel";
//dependencies
import VideosItem from "./videosItem";
import VideosCategoriaFila from "./videosCategoriaFila";
import * as HistorialUserServer from "../../services/historialUser";
import * as PreferenciasUserServer from "../../services/preferenciasUser";
import Context from "../context/UserContext";


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

function VideosListUser({videos, categories, ...props}) {
  const history = useNavigate();

  const [histUsers, setHistUsers] = useState();
  const [prefUsers, setPrefUsers] = useState(null); 
  const [categoriasFalt, setCategoriasFalt] = useState(null);
  const { user } = useContext(Context)


  const getHistorialUsers = async () => {
    try {
      const res = await HistorialUserServer.ListHistorialUser({'user_id':user.id});
      setHistUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getPreferenciasUser = async () => {
    try {
      const res = await PreferenciasUserServer.ListPreferenciaUser({'user_id':user.id});   
      setPrefUsers(res);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getHistorialUsers();
    getPreferenciasUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if(prefUsers && categories) {
      prefUsers.forEach(element => {
        const result = categories.filter(checkCategory);
        function checkCategory(value) {        
            return value.categoria !== element.categoria;        
        }
        setCategoriasFalt(result);
      });
    }
  },[categories, prefUsers])

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
            props.search(videos).slice(0, 4).map((video) => (
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
            ) )}
        </Carousel>
      </div>
      <br></br>
      <hr></hr>
      <div id="card_videos">
        {videos && prefUsers ? 
          <div>
            {props.search2(prefUsers).map((element, index) => (
              <VideosCategoriaFila
                key= {index}
                categoria ={element}
                videos={videos}
                search={props.search}
                histUsers = {histUsers}
                user = {user}
                verVideo= {verVideo}
              >
              </VideosCategoriaFila>
              ))}
              {            
              categoriasFalt && props.search2(categoriasFalt).map((element, index) => (
                <VideosCategoriaFila
                  key= {index}
                  categoria ={element}
                  videos={videos}
                  search={props.search}
                  histUsers = {histUsers}
                  user = {user}
                  verVideo= {verVideo}  
                >
                </VideosCategoriaFila>
                ))
              }
          </div>
        :
        props.search2(categories).map((element) => (
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
          ))
        }
      </div>
    </div>
  );
}

export default VideosListUser;

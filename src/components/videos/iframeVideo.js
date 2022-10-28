import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';

import Player from "@vimeo/player";

//dependencias
import * as UbicacionServer from "../../services/ubicacion";

import "../../styles/styles.css";

const IframeVideo =  ({video}) => {
  const [ubicacionUsers, setUbicacionUsers] = useState(null);
  const location = useLocation();
  const iframe = document.getElementById('iframe1');
  const URL_API = 'https://ipwho.is/';
  

  const getUbication= async ()=> {
    await fetch(URL_API)
    .then(response => response.json())
    .then(data => {
      setUbicacionUsers(data);
    });
  };

  /* async function getUbicacionByHist() {
    try {
      const res = await UbicacionServer.ListUbicacionHist({ 'histUser_id': location.state.id });
      if (res.length > 0) {
        setUbicacionByHist(res);
      }
    } catch (error) {
      console.log(error);
    }
  } */
  const getVimeoVideo = React.useCallback(() => {
    const formData = new FormData();
    
    let player;
    if (video.url_vimeo_esp) {
      let options = {
        url: video.url_vimeo_esp,
      };
      player = new Player(iframe, options);

      player.on('play', async () => {
        const res = await UbicacionServer.ListUbicacionHist({ 'histUser_id': location.state.id });
        let ubByHist;
        if (res.length > 0) {
          ubByHist = res;
        }
        if (ubicacionUsers) {
          if (ubByHist) {
            for (let index = 0; index < ubByHist.length; index++) {
              const element = ubByHist[index];
              if (element['direccionIP'] !== ubicacionUsers.ip && element['ciudad'] !== ubicacionUsers.city && element['pais'] !== ubicacionUsers.country) {
                formData.append("direccionIP", ubicacionUsers.ip);
                formData.append("ciudad", ubicacionUsers.city);
                formData.append("pais", ubicacionUsers.country);
                formData.append("historial_user", location.state.id);
                 await  UbicacionServer.RegisterUbicacion(formData);

              }
              else{
                console.log("Ya exite una hubicación del mismo lugar registrada!");
              }
            }
          }
          else{
            formData.append("direccionIP", ubicacionUsers.ip);
            formData.append("ciudad", ubicacionUsers.city);
            formData.append("pais", ubicacionUsers.country);
            formData.append("historial_user", location.state.id);
            await  UbicacionServer.RegisterUbicacion(formData);
          }
        }
      });

      player.on('pause',() => {
        player.getCurrentTime().then((seconds) => {
          const tiempo = parseInt(seconds)
          console.log(tiempo);
        }).catch((error) => {
            console.error(error);
        });
      });
    }
  },[iframe, location.state.id, ubicacionUsers, video.url_vimeo_esp]);

  useEffect(()=>{
    getUbication();
  },[]);

  useEffect(()=>{
    getVimeoVideo();
  },[getVimeoVideo]);

  return (
      <div id="iframe1">
      </div>
    );
}

export default IframeVideo;
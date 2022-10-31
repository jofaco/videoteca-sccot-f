import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';

import Player from "@vimeo/player";

//dependencias
import * as UbicacionServer from "../../services/ubicacion";
import * as HistorialUserServer from "../../services/historialUser";

import "../../styles/styles.css";

const IframeVideo =  ({video, ...props}) => {
  const [ubicacionUsers, setUbicacionUsers] = useState(null);
  const [histUser, setHistUser] = useState();

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

  const getHistUser= async ()=> {
   const res = await HistorialUserServer.getHistorial(location.state.id);
   setHistUser(res);
  };

  const convertTime = (tiempo) => {
    let [h, m, s] = tiempo.split(':').map(val => +val);
    s = (s+(m*60)+(h*60^2))-2
    return parseInt(s);
  }

  const getVimeoVideo = React.useCallback(() => {
    const formData = new FormData();
    let tiempo;
    let player;
    if (video.url_vimeo_esp && histUser) {
      let options = {
        url: video.url_vimeo_esp,
        playsinline: true,
      };
      player = new Player(iframe, options);

      if (histUser.tiempo !== null) {
        const segundos = convertTime(histUser.tiempo);
        player.setCurrentTime(segundos);
      }      
      player.on('play', async () => {
        const res = await UbicacionServer.ListUbicacionHist({ 'histUser_id': histUser.id });
        let ubByHist;
        if (res.length > 0) {
          ubByHist = res;
        }
        if (ubicacionUsers) {
          formData.append("direccionIP", ubicacionUsers.ip);
          formData.append("ciudad", ubicacionUsers.city);
          formData.append("pais", ubicacionUsers.country);
          formData.append("historial_user", histUser.id);
          if (ubByHist) {
            for (let index = 0; index < ubByHist.length; index++) {
              const element = ubByHist[index];
              if (element['direccionIP'] !== ubicacionUsers.ip && element['ciudad'] !== ubicacionUsers.city && element['pais'] !== ubicacionUsers.country) {                
                await  UbicacionServer.RegisterUbicacion(formData);
              }
              else{
                console.log("Ya exite una hubicación del mismo lugar registrada!");
              }
            }
          }
          else{
            await  UbicacionServer.RegisterUbicacion(formData);
          }
        }
      });

      player.on('pause', async () => {
        tiempo = 0;
        player.getCurrentTime().then((seconds) => {
          tiempo = parseInt(seconds)
          if (tiempo !== 0 && histUser.id){
            HistorialUserServer.updateHistorialUser(histUser.id,{'tiempo':tiempo});
          }
        }).catch((error) => {
            console.error(error);
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ histUser , iframe, ubicacionUsers, video.url_vimeo_esp]);

  useEffect(()=>{
    getUbication();
    getHistUser();
    if (props.histVideo) {
      console.log("adasd");
    } else {
      console.log("nadaaaa");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
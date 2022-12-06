import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import { useParams } from "react-router-dom";

//dependencias
import * as VideoServer from "../../services/videoServer";
import * as HistorialUserServer from "../../services/historialUser";

import IframeVideo from "./iframeVideo";
//MaterialUI
import Box from "@mui/material/Box";
import Container from "@material-ui/core/Container";
import StarIcon from "@mui/icons-material/Star";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Typography from "@material-ui/core/Typography";
//components
import "../../styles/styles.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },  
}));

const VideoDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [duracion, setDuracion] = useState([]);
  const [uploadDate, setUploadDate] = useState(null);
  const [histUser, setHistUser] = useState(location.state);
  const [activeStar, setActiveStar] = useState(-1);
  const totalStars = 5;

  const changeDuration = (duration) => {
    let tiempo = duration.split(':');
    let new_duration = "";
    if (tiempo) {

      if (tiempo[0] !=="00") {
        new_duration = duration[0]+"hrs:";
      }
      if (tiempo[1] !=="00") {
        new_duration = " "+new_duration+" "+tiempo[1]+"mins:";
      }
      if (tiempo[2] !=="00") {
        new_duration = " "+new_duration+" "+tiempo[2]+"s";
      }
    }
    return new_duration;
  };

  useEffect(() => {
    const getVideo = async (videoID) => {
      const res = await VideoServer.getVideo(videoID);
      const video = res;

      setUploadDate(new Date(res.upload_date).toDateString());
      setDuracion(changeDuration(res.duration));
      setActiveStar(histUser.user_score-1);
      setVideo({
        ...video,
        duration: duracion,        
      });
      
    };
    getVideo(id);

  }, [duracion, histUser.user_score, id, setVideo, video.title_espanol, video.url_esp, video.url_vimeo_esp]);
  
  const handleClick = async (index) => {
    setActiveStar(index);
    setHistUser({...histUser, user_score:index+1});

    await HistorialUserServer.updateHistorialUser(histUser.id,{'user_score': index+1});
  };

  const classes = useStyles();
  return (
    <Container>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {video.title_espanol}
        </Typography>
      </div>
      <br></br>
      <div className="row">
      <div className="col-md-8 col-12 iframe1">
        <IframeVideo
          video={video}
          >
        </IframeVideo>
      </div>
      <div className="col-md-4 col-12 infoVideo">
        <Typography component="h5" variant="body1">
          {video.duration}&nbsp;&nbsp;{uploadDate}
        </Typography>
        <br></br>
        <Typography component="h5" variant="body1">
          {video.description_esp}
        </Typography>
        <br></br>
        <Typography component="h1" variant="h5">
          Calificación:   &nbsp;&nbsp;
          <Box 
            sx={{
              display: "inline-flex",
              position: "relative",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {[...new Array(totalStars)].map((arr, index) => {
              return (
                <Box 
                key={index} 
                position="relative"
                sx={{
                  cursor: "pointer",
                }}
                onClick={(e) => handleClick(index)}
                >
                  <Box 
                    sx={{
                      width: index <= activeStar ? "100%" : "0%",
                      overflow: "hidden",
                      position: "absolute",
                    }}
                  >
                    <StarIcon />
                  </Box>
                  <Box>
                    <StarBorderIcon />
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Typography>
      </div>
      </div>
      
    </Container>
  );
};

export default VideoDetail;

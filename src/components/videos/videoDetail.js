import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import * as VideoServer from "./videoServer";

//MaterialUI
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//components
import "../../styles.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iframe: {
    maxWidth: 1024,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  "@media (max-width: 1024px)": {
    iframe: {
      display: "flex",
    },
  },
}));
const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getVideo = async (videoID) => {
      const res = await VideoServer.getVideo(videoID);
      const video = res;

      setVideo({
        ...video,
        title_espanol: res.title_espanol,
        duration: res.duration,
        url_esp: res.url_vimeo_esp,
      });
    };
    getVideo(id);
  }, [id, setVideo]);

  const classes = useStyles();
  return (
    <Container>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {video.title_espanol}
        </Typography>
      </div>
      <div className="iframe1">
        <iframe
          title={video.title_espanol}
          src={video.url_esp}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; "
          allowFullScreen
          className="styleIframe"
        ></iframe>
      </div>
    </Container>
  );
};

export default VideoDetail;

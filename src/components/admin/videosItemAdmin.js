import React from "react";
//components
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

//dependencies
import * as VideoServer from "../videos/videoServer";
import "../../styles.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const VideosItemAdmin = ({ video }) => {
  const history = useNavigate();

  const handleDelete = async (videoID) => {
    await VideoServer.DeleteVideo(videoID);
    window.location.reload();
  };
  const classes = useStyles();

  return (
    <div className="container" id="contenedorItemVideo">
      <div className="row ">
        <div className="col-md-8  col-12 ">
          <Button onClick={() => history(`/seeVideo/${video.id}`)}>
            <Image
              src={"http://localhost:8000" + video.featured_image}
              className="img-fluid"
            ></Image>
          </Button>
        </div>
        <div className="col-md-4 col-12 ">
          <h3 className={classes.paper}>{video.title_espanol}</h3>
          <p className="card-text">Duración: {video.duration}</p>
          <p className="card-text">Puntuación: {video.score}</p>
          <br></br>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              onClick={() => history(`/updateVideo/${video.id}`)}
              className="ms-6 btn  btn-info"
            >
              Update
            </button>
            <button
              onClick={() => video.id && handleDelete(video.id)}
              className="btn btn-danger my-2"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosItemAdmin;

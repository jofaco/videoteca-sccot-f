import React from "react";

//components
import { Image } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",

  },
  letter: {
    fontSize:10,
    color: "white"
  },
  "@media (min-width: 1200px)": {
    info:{
      height:480,
      minWidth: 410,
    },
    imagen:{
      minWidth: 820,
    },
  row:{
    width:1240,
  },
  },
}));

const VideosItem = ({ video,...props } ) => {
  const classes = useStyles();

  
  return (
    <div id="contenedorItemVideo">
      <Button onClick={(e) => props.verVideo(video.id)}>
      <div className={"row "+classes.row}>
        <div className={"col-md-8  col-12 " +classes.imagen}>          
            <Image
              src={"http://localhost:8000" + video.featured_image}
              className="img-fluid"
            ></Image>
        </div>
        <div className={"col-md-4 col-12 " + classes.info}>
          <h3 className={classes.paper}>{video.title_espanol}</h3>
          <p className={classes.letter}>Duración: {video.duration}</p>
          <p className={classes.letter}>Puntuación: {video.score}</p>
          <p className={classes.letter}>{video.description_esp}</p>
          <br></br>
        </div>
      </div>
      </Button>
    </div>
  );
};

export default VideosItem;

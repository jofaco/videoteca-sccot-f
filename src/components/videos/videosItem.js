import React from "react";

//components
import { Image } from "react-bootstrap";

//MaterialUI
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

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
  imagenCarousel:{
    maxWidth:"100%",
    maxHeight:"100%", 
    objectFit:"cover",

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

/**
 * Componente para mostrar en el carousel los videos con algunos campos.
 * @param {*} video
 * @returns Item de un video.
 */
const VideosItem = ({ video,...props } ) => {
  const classes = useStyles();

  
  return (
    <div id="contenedorItemVideo">
      <Button onClick={(e) => props.verVideo(video.id)}>
      <div className={"row "+classes.row}>
        <div className={"col-md-8  col-12 " +classes.imagen}>          
            <Image
              src={"http://localhost:8000" + video.featured_image}
              className={classes.imagenCarousel }
            ></Image>
        </div>
        <div className={"col-md-4 col-12 " + classes.info}>
          <h3 className={classes.paper}>{video.title_espanol}</h3>
          <p className={classes.letter}>Duración: {video.duration}</p>
          <Box
            sx={{'& > legend': { mt: 2 }}}
          >
            <Rating name="read-only" value={parseFloat(video.score)} precision={0.5} readOnly />
          </Box>
          <p className={classes.letter}>{video.description_esp}</p>
          <br></br>
        </div>
      </div>
      </Button>
    </div>
  );
};

export default VideosItem;

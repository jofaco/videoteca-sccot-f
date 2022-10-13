import React from "react";
//components
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const VideosItemRow = ({ video }) => {
  const history = useNavigate();
  const classes = useStyles();
  
  return (
    <>
      <h4 className={classes.paper}>{video.title_espanol}</h4>
      <Button onClick={() => history(`/seeVideo/${video.id}`)}>
        <Image
          src={"http://localhost:8000" + video.featured_image}
          className="img-fluid"
        ></Image>
      </Button> 
    </>
  );
};

export default VideosItemRow;

import React from "react";
//components
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import "../../styles.css";

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
    <div className="col-md-4  col-12 mb-4">
      <h3 className={classes.paper}>{video.title_espanol}</h3>
      <div className="card card-body">
        <Button onClick={() => history(`/seeVideo/${video.id}`)}>
          <Image
            src={"http://localhost:8000" + video.featured_image}
            className="img-fluid"
          ></Image>
        </Button>
      </div>
    </div>
  );
};

export default VideosItemRow;

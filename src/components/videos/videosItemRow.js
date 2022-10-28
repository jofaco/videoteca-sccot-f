import React from "react";
//components
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


const VideosItemRow = ({ video,...props }) => {
  const classes = useStyles();  
  
  
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <h3 className={classes.paper}>{video.title_espanol}</h3>
      <div className="card card-body">
        <Button onClick={() =>props.verVideo(video.id)}>
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

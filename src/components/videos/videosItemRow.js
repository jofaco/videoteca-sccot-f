import React, {useState,useEffect} from "react";
//components
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

//dependencias
import * as HistorialUserServer from "../../services/historialUser";


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
  const [histUsers, setHistUsers] = useState();
  let histUser;


  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  const getHistorialUsers = async () => {
    try {
      const res = await HistorialUserServer.ListHistorialUser();
      setHistUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistorialUsers();
  }, []);


  const verVideo = async (id) =>{
    const formData = new FormData();
    let contador = 0;
    formData.append("usuario", user.id);
    formData.append("video", id);
    try {
      for (let index = 0; index < histUsers.length; index++) {
      const element = histUsers[index];
        if (element.usuario === user.id && element.video === id) {
          histUser= element;
          contador++;
        } 
      }
      if(contador ===0) {
        const hu = await  HistorialUserServer.RegisterHistorialUser(formData);
        histUser = hu.data;
      }
    } catch (error) {
      console.log(error);
    }
    
    //res = await HistorialUserServer.RegisterHistorialUser(formData);
    console.log(histUser);
    history(`/seeVideo/${id}`,{state:histUser});
    
  }
  
  return (
    <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
      <h3 className={classes.paper}>{video.title_espanol}</h3>
      <div className="card card-body">
        <Button onClick={() =>verVideo(video.id)}>
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

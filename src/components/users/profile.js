import React, { useEffect, useState } from "react";
import { useContext } from "react";

//dependencias
import Context from "../context/UserContext";
import { getUser } from "../../services/auth";
import imgDeault from "../../imgs/logosccot.png";
import * as PreferenciasUserServer from "../../services/preferenciasUser";
import * as CategoriaServer from "../../services/category";
import ModalPreferencias from "./modalPreferencia";
import ModalImagen from "./modalImagen";
import Preferencias from "./profilePref";
//components
import { Image } from "react-bootstrap"

//MaterialUI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

//styles
import "../../styles/modalsProfile.css";

const UserProfile = () => {
  const { user } = useContext(Context);
  const [dataUser, setDataUser] = useState(null);
  const [prefUsers, setPrefUsers] = useState(null);  
  const [show, setShow] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [categorias, setCategorias] = useState();

  const useStyles = makeStyles((theme) => ({
    imagenPerfil: {
      opacity: 0.25,
      display: "flex",
      maxWidth: 400,
      marginBottom: theme.spacing(2),
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 1000,
    },
    contenedorImg: {
      flexWrap: "wrap",      
    },
    botonList:{
      margin: theme.spacing(3, 1),
      color: "black",
    },
    title1: {
      textAlign: "center",
    },
    "@media only screen and (max-width: 1000px)": {
      imagenPerfil: {
        width: "100%",
      },
    },
  }));

  const GetUser = async (userId) => {
    const res = await getUser(userId);
    setDataUser(res);
  };

  const getPreferenciasUser = async () => {
    try {
      const res = await PreferenciasUserServer.ListPreferenciaUser({'user_id':user.id});
      setPrefUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategorias = async () => {
    try {
      const res = await CategoriaServer.ListCategorias();
      const data = await res;
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetUser(user.id);
    getPreferenciasUser();
    getCategorias();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseImg = () => setShowImg(false);
  const handleShowImg= () => setShowImg(true);
  
  const classes = useStyles();

  return (
    <Container>
      {dataUser && dataUser.image ? (
        <div className="row">
          <h1 id="tituloName"><center>{dataUser.name}</center></h1>
          <div className={"col-md-5 "+classes.contenedorImg}>            
            <Image src={"http://localhost:8000" + dataUser.image} className= {classes.imagenPerfil}></Image>
            <div className="d-grid  col-8  mx-auto">
              <button
                className="btn btn-primary btn-lg"
                id="submitButton"
                type="submit"
                onClick={handleShowImg}
              >
                Update
              </button>
            </div>
          </div>
          <div className="col-md-7">
            <Preferencias
              prefUsers={prefUsers}
              handleShow={handleShow}
            />
          </div>
        </div>
      ) : (
        <div className="row">
          <h1 id="tituloName"><center>{user.name}</center></h1>
          <div className={"col-md-5 "+classes.contenedorImg}>
            <Image src={imgDeault} className= {classes.imagenPerfil}></Image>
            <div className="d-grid  col-8  mx-auto">
              <button
                className="btn btn-primary btn-lg"
                type="submit"
                onClick={handleShowImg}
              >
                Cambiar Imagen
              </button>
            </div>
          </div>
          <div className="col-md-7">
            <Preferencias
              prefUsers={prefUsers}
              handleShow={handleShow}
            />
          </div>
        </div>
      )}
      <ModalPreferencias
        categorias = {categorias}
        handleClose = {handleClose}
        show = {show}
        user = {dataUser}
      >
      </ModalPreferencias>
      <ModalImagen
        handleClose = {handleCloseImg}
        show = {showImg}
        user = {dataUser}
      >
      </ModalImagen>
    </Container>
  );  
};

export default UserProfile;

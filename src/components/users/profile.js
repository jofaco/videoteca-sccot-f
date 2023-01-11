import React, { useEffect, useState } from "react";
import { useContext } from "react";

//dependencias
import Context from "../context/UserContext";
import { getUser } from "../../services/auth";
import imgDeault from "../../imgs/logosccot.png";
import * as PreferenciasUserServer from "../../services/preferenciasUser";
import * as CategoriaServer from "../../services/category";
import { useModal } from "../../hooks/useModal";

//components
import ModalPreferencias from "./modalPreferencia";
import ModalImagen from "./modalImagen";
import Preferencias from "./profilePref";

//MaterialUI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "react-bootstrap";
//styles
import "../../styles/modalsProfile.css";

/**
 * Componente para el perfil de usuario
 * @returns Componentes necesario para la vista del perfil
 */
const UserProfile = () => {
  const { user } = useContext(Context);
  const [dataUser, setDataUser] = useState(null);
  const [prefUsers, setPrefUsers] = useState(null);
  const [categorias, setCategorias] = useState();
  const [show, handleShow, handleClose] = useModal(false);
  const [showImg, handleShowImg, handleCloseImg] = useModal(false);


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
    botonList: {
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

  /**
   * Función para consultar la información del usuario
   * @param {id} userId
   */
  const GetUser = async (userId) => {
    const res = await getUser(userId);
    setDataUser(res);
  };

  /**
   * Función para consultar las preferencias del usuario.
   */
  const getPreferenciasUser = async () => {
    try {
      const res = await PreferenciasUserServer.ListPreferenciaUser({
        user_id: user.id,
      });
      setPrefUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Función para consultar las categorias de los videos.
   */
  const getCategorias = async () => {
    try {
      const res = await CategoriaServer.ListCategorias();
      const data = await res;
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Hook para ejectutar las funciones GetUser, getPreferenciasUser y getCategorias
   */
  useEffect(() => {
    GetUser(user.id);
    getPreferenciasUser();
    getCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const classes = useStyles();

  return (
    <Container>
      {dataUser && dataUser.image ? (
        <div className="row">
          <h1 id="tituloName">
            <center>{dataUser.name}</center>
          </h1>
          <div className={"col-md-5 " + classes.contenedorImg}>
            <Image
              src={"http://localhost:8000" + dataUser.image}
              className={classes.imagenPerfil}
            ></Image>
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
            <Preferencias prefUsers={prefUsers} handleShow={handleShow} />
          </div>
        </div>
      ) : (
        <div className="row">
          <h1 id="tituloName">
            <center>{user.name}</center>
          </h1>
          <div className={"col-md-5 " + classes.contenedorImg}>
            <Image src={imgDeault} className={classes.imagenPerfil}></Image>
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
            <Preferencias prefUsers={prefUsers} handleShow={handleShow} />
          </div>
        </div>
      )}
      <ModalPreferencias
        categorias={categorias}
        handleClose={handleClose}
        show={show}
        user={dataUser}
      ></ModalPreferencias>
      <ModalImagen
        handleClose={handleCloseImg}
        show={showImg}
        user={dataUser}
      ></ModalImagen>
    </Container>
  );
};

export default UserProfile;

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

//components
import { Image } from "react-bootstrap"

//MaterialUI
import Box from "@mui/material/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
    },
    contenedorImg: {
      flexWrap: "wrap",      
    },
    botonList:{
      margin: theme.spacing(3, 1),
      color: "black",
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
          <div className={"col-md-5 "+classes.contenedorImg}>
            <h1>Prueba de usuario:</h1>
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
            <Box
            display="flex"
            mt={10}
            ml={10}
            justifyContent="space-between"
            fontWeight={600}
            >
              <Typography component={"span"} variant={"h4"}> {user.name}</Typography>
            </Box>
            <Box
            display="flex"
            mt={5}
            ml={10}
            justifyContent="space-between"
            fontWeight={900}
            >
              <Typography component={"span"} variant={"h4"}> PREFERENCIAS</Typography>
            </Box>
            <br></br>

            { !prefUsers ?
              <Box
                display="flex"
                mt={5}
                justifyContent="space-between"
              >
                <div className="d-grid  col-8  mx-auto">
                  <button
                    className="btn btn-secondary btn-lg"
                    type="submit"
                    onClick={handleShow}
                  >
                    Ingresar Preferencia
                  </button>
                </div>
              </Box>
              :
              <> 
                <div className="container">
                  <Typography component={"span"} variant={"h4"}> Tus gustos:</Typography>
                  <br/>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>              
                    {prefUsers && prefUsers.map((categ, index) => (
                        <button 
                          sx={{ color: '#fff' }} 
                          key={index}
                          className={"btn btn-warning "+classes.botonList}
                        >
                          {categ.categoria}
                        </button>
                    ))}
                  </Box>
                    
                  
                </div>
                <br></br>
                <div className="container">
                  <div className="d-grid  col-8  mx-auto">
                    <button
                      className="btn btn-secondary btn-lg"
                      type="submit"
                      onClick={handleShow}
                    >
                      Ingresar Preferencia
                    </button>
                  </div>
                </div>
              </>
              }
          </div>
        </div>
      ) : (
        <div className="row">
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
            <Box
            display="flex"
            mt={10}
            ml={10}
            justifyContent="space-between"
            fontWeight={600}
            >
              <Typography component={"span"} variant={"h4"}> {user.name}</Typography>
            </Box>
            <Box
            display="flex"
            mt={5}
            ml={10}
            justifyContent="space-between"
            fontWeight={900}
            >
              <Typography component={"span"} variant={"h4"}> PREFERENCIAS</Typography>
            </Box>
            <br></br>

            { !prefUsers ?
              <Box
                display="flex"
                mt={5}
                justifyContent="space-between"
              >
                <div className="d-grid  col-8  mx-auto">
                  <button
                    className="btn btn-secondary btn-lg"
                    type="submit"
                    onClick={handleShow}
                  >
                    Ingresar Preferencia
                  </button>
                </div>
              </Box>
              :
              <> 
                <div className="container">
                  <Typography component={"span"} variant={"h4"}> Tus gustos:</Typography>
                  <br/>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>              
                    {prefUsers && prefUsers.map((categ, index) => (
                        <button 
                          sx={{ color: '#fff' }} 
                          key={index}
                          className={"btn btn-warning "+classes.botonList}
                        >
                          {categ.categoria}
                        </button>
                    ))}
                  </Box>
                    
                  
                </div>
                <br></br>
                <div className="container">
                  <div className="d-grid  col-8  mx-auto">
                    <button
                      className="btn btn-secondary btn-lg"
                      type="submit"
                      onClick={handleShow}
                    >
                      Ingresar Preferencia
                    </button>
                  </div>
                </div>
              </>
              }
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

import React, {useEffect,useState} from "react";
//dependencias
import * as HistorialUserServer from "../../services/historialUser";

//components
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-bootstrap/Modal";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  title:{
    color: "Red",
    textAlign: "center",
    textShadow: "#FC0 1px 0 10px",
  },
  nameUser:{
    color:"Gray"
  },
  containerModal:{
    border: "2px solid #ccc",
    borderRadius: 20,
    boxShadow: "4px 4px 4px 0px #5a28e550",
  },
  containerComment: {
    maxWidth: 720,
    margin: "auto",
    marginBottom: 20,
  },
  "@media (max-width: 720px)": {
    root: {
      display: "flex",
    },
  },
}));

const ModalComentarios = ({ handleClose, show, histUser, ...props}) => {
  const [comentarios, setComentarios] = useState([]);
  
  useEffect(() => {
    const getComentarios = async () => {
      const histsUsers = await HistorialUserServer.ListHistorial4Comments();      
      setComentarios(histsUsers);
    }
    getComentarios();
  }, []);

  const classes = useStyles();
  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      aria-labelledby="example-custom-modal-styling-title"
      contentClassName = {classes.containerModal}
      centered
      scrollable
      
    >
      <Modal.Header closeButton  >
        <Modal.Title id="titleModal" className={classes.title} >Comentarios de usuarios</Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal" className={classes.containerModal}>
        {
          comentarios.map( (element, index) => {
            return  parseInt(element.video) === parseInt(props.id) && histUser.usuario.id !== element.usuario.id ?
              <Container key={index} className={classes.containerComment}>
                <h4 className={classes.nameUser} >User: {element.usuario.name}</h4>
                <h5 >{element.commentary}</h5>
                <hr/>
              </Container>
            :null
            })
        }
      </Modal.Body>
    </Modal>
  )
};

export default ModalComentarios;
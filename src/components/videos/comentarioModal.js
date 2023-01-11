import React from "react";
//dependencias
import * as HistorialUserServer from "../../services/historialUser";

//components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { makeStyles } from "@material-ui/core/styles";
import "../../styles/cloud.css";


const useStyles = makeStyles((theme) => ({
  
  containerModal:{
    border: "2px solid #ccc",
    borderRadius: 50,
    boxShadow: "4px 4px 4px 0px #5a28e550",
  },
  cloud: {
    Background: "#BFF",
    top: "50px",
    borderRadius: "100px",
    position: "absolute",
    margin: "120px auto 20px",
},

  "@media (max-width: 720px)": {
    root: {
      display: "flex",
    },
  },
}));
const ModalComentario = ({histUser, handleClose, show,setHistUser, ...props}) => {

  const handleInputChange = (e) => {
    setHistUser({...histUser, commentary: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {        
        await HistorialUserServer.updateHistorialUser(histUser.id,{'commentary': histUser.commentary});
    } catch (error) {
        for (const property in error.response.data) {
          alert(`${property}: ${error.response.data[property]}`);
        }      
      }
  }
  const classes = useStyles();

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      aria-labelledby="example-custom-modal-styling-title"
      contentClassName = {"cloud "+ classes.cloud}
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="tituloModal" >Ingrese su Comentario</Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal" >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control as="textarea" rows={3} value={histUser.commentary || ""}
              onChange={handleInputChange}/>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
    
  )
};

export default ModalComentario;
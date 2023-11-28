import React from "react";
//dependencias
import * as palabrasClavesServer from "../../services/palabrasClaves";

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
  containerForm: {
    height:"3rem",
    background: "#BFF",
    border: "2px solid #ccc",
    borderRadius: 50,
    boxShadow: "4px 4px 4px 0px #5a28e550",
  },

  "@media (max-width: 720px)": {
    root: {
      display: "flex",
    },
  },
}));
const ModalPalabrasClaves = ({ handleClose, show, palabrasclaves_id,currentItem, setFormData, newData, ...props}) => {

  const handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;
    setFormData({...newData, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      if (!palabrasclaves_id) {
        formData.append("palabrasClaves", newData.palabrasClaves);
        await palabrasClavesServer.RegisterPalabrasClaves(formData);
      } else {
        formData.append("palabrasClaves", newData.palabrasClaves);
        await palabrasClavesServer.updatePalabrasClaves(palabrasclaves_id, formData);        
      }
      const res = await palabrasClavesServer.ListPalabrasClaves();
      const data = await res;
      props.setPalabrasClaves(data);
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
      contentClassName = {classes.cloud}
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="tituloModal" ><h2>{palabrasclaves_id? 'Editar Registro' : 'Crear Registro'}</h2></Modal.Title>
      </Modal.Header>
      <Modal.Body id="bodyModal" >
        <Form onSubmit={handleSubmit}  >
          <Form.Group className={"mb-2 "} controlId="exampleForm.ControlInput1">
            <Form.Control type="text" 
            className={classes.containerForm}
            rows={1} 
            name="palabrasClaves"
            value={newData.palabrasClaves || ""}
            onChange={handleInputChange} 
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
            {palabrasclaves_id ? 'Guardar Cambios' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
    
  )
};

export default ModalPalabrasClaves;
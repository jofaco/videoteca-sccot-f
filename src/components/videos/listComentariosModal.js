import React, {useEffect,useState} from "react";
//dependencias
//import * as commentaryServer from "../../services/commentary";

//components
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-bootstrap/Modal";
import Container from "@material-ui/core/Container";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';


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

const ModalComentarios = ({ handleClose, show, histUser, commentaries,  ...props}) => {
  
  const classes = useStyles();
  if (commentaries) {
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
          commentaries.map( (element, index) => (
              <Container key={index} className={classes.containerComment}>
                <div className="row">
                  <div className="col-9 ">
                    <p>fecha: {new Date(element.created_date).toLocaleDateString()}</p>
                    <h5 className={classes.nameUser} >User: {element.historial_user.usuario.name}</h5>
                    <h5 >{element.commentary}</h5>
                  </div>
                  <div className="col-2">
                    <Stack  alignItems="center" alignContent="center">
                      <Button 
                      variant="contained" 
                      color="info"
                      onClick={handleClose}>
                        EDITAR
                      </Button>
                    </Stack>
                  </div>
                  <hr/>
                </div>
              </Container>
            ))
        }
      </Modal.Body>
    </Modal>
    )
  }
  
};

export default ModalComentarios;
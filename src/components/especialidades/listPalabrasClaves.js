/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//Components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../index.css";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


//dependencies
import Context from "../context/UserContext";
import * as palabrasClavesServer from "../../services/palabrasClaves";
import PalabrasClavesModal from "./palabrasClavesModal";
import { useModal } from "../../hooks/useModal";



const PalabrasClavesList = ({palabrasClaves}) => {
  const history = useNavigate();

  const [show, handleShow, handleClose] = useModal(false);
  const [id, setId] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const [listPalabrasClaves, setPalabrasClaves] = useState(palabrasClaves);
  const initialFormData = {palabrasClaves:""};
  const [newData, setFormData] = useState(initialFormData);
  const { user } = useContext(Context);

  const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title1: {
      textAlign: "center",
      color: "white"
    }
  }));

  
  const editar = async (item) => {
    setId(item.id);
    setCurrentItem(item);
    setFormData({ palabrasClaves: item.palabrasClaves });
    handleShow(true)
  };

  const registrar = async () => {
    setId(null);
    setCurrentItem({});
    setFormData({palabrasClaves:""});
    handleShow(true)
  };


  const getPalabrasClaves = async () => {
    try {
      const res = await palabrasClavesServer.ListPalabrasClaves();
      const data = await res;
      setPalabrasClaves(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getPalabrasClaves();
      setId(null)
    } else {
    history("/login");
      
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();
  
  if (user) {
    
    return (
      <Container> 
        
        <div className={classes.paper}>
              <Typography component="h1" variant="h3">
              PalabrasClaves
              </Typography>
        </div>
        <Stack  alignItems="center">
          <Button 
          variant="contained" 
          color="success"
          type="submit"
          onClick={()=>registrar()}>
            Registrar Palabras Claves
          </Button>
        </Stack>
        <br/><br/> <br/>     
        <div>
          <section className="content">
          <div className="table-responsive table-condensed table-sm tabla">
            <table
              className="table table-hover"
              id="dataTableData"
              name="dataTableData"
              style={{ fontSize: 11, textAlign: "center" }}
            >
              <thead className={classes.title1}>
                <tr>
                  <th style={{ display: "none" }}>Id</th>
                  <th>Codigo</th>
                  <th>Palabras Claves</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white" }}>
                {listPalabrasClaves.length === 0 ? (
                  <tr>
                    <td colSpan={11}>No hay datos</td>
                  </tr>
                ) : (
                  listPalabrasClaves.map((PalabrasClaves, index) => (
                    <tr key={index}>
                      <td style={{ display: "none" }}>{PalabrasClaves.id}</td>
                      <td>{PalabrasClaves.id}</td>
                      <td>{PalabrasClaves.palabrasClaves}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm float-right"
                          type="submit"
                          onClick={()=>editar(PalabrasClaves)}
                        >
                          editar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        </div>
        <PalabrasClavesModal
          handleClose={handleClose}
          show={show}
          palabrasclaves_id ={id}
          currentItem={currentItem}
          setPalabrasClaves = {setPalabrasClaves}
          setFormData = {setFormData}
          newData={newData}
        ></PalabrasClavesModal>
      </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
};

export default PalabrasClavesList;

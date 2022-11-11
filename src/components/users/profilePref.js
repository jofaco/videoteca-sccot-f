import React from "react";

//MaterialUI
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";

//styles
import "../../styles/modalsProfile.css";

const Preferencias = ({ prefUsers, handleShow, ...props }) => {

  const useStyles = makeStyles((theme) => ({
    botonList: {
      margin: theme.spacing(3, 1),
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

  const classes = useStyles();

  return (
    <div className="container container1">
      <h3 className={classes.title1}> PREFERENCIAS</h3>
      <br></br>
      {!prefUsers ? (
        <Box display="flex" mt={5} justifyContent="space-between">
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
      ) : (
        <>
          <div className="container ">
            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }} className="btn-group btn-group-lg">
              {prefUsers &&
                prefUsers.map((categ, index) => (
                  <button
                    sx={{ color: "#fff" }}
                    key={index}
                    className={"btn btn-warning btn-lg " + classes.botonList}
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
      )}
    </div>
  );
};

export default Preferencias;

import React, { useEffect, useState } from "react";
import {  useContext } from "react";

//dependencies
import ListPalabrasClaves from "../especialidades/listPalabrasClaves"

import * as palabrasClavesServer from "../../services/palabrasClaves";
import VideoLoadingComponent from "../videos/videoLoading";
import Context from "../context/UserContext";

//components
import { Container } from "@material-ui/core";

const  Principal = () =>{
    const PalabrasClavesLoading = VideoLoadingComponent(ListPalabrasClaves);
    const { user } = useContext(Context);

    const [appState, setAppState] = useState({
      loading: true,
      palabrasClaves: null,
    });   
    
    useEffect(() => {
        palabrasClavesServer.ListPalabrasClaves().then((res) => {
        const allPalabrasClaves = res;
        setAppState({ loading: false, palabrasClaves: allPalabrasClaves });
      });
    }, [setAppState]);
  if (user) {
    return (
      <Container>
        <div className="App">
          <PalabrasClavesLoading isLoading={appState.loading} palabrasClaves={appState.palabrasClaves} />
        </div>
      </Container>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
}

export default Principal;

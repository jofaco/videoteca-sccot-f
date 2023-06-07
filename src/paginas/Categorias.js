import React, { useEffect, useState } from "react";
import {  useContext } from "react";

//dependencies
import ListCategories from "../components/categories/listCategories"
import * as categoryServer from "../services/category";
import VideoLoadingComponent from "../components/videos/videoLoading";
//components
import { Container } from "@material-ui/core";

const  Principal = () =>{
    const CategoryLoading = VideoLoadingComponent(ListCategories);

    const [appState, setAppState] = useState({
      loading: true,
      categories: null,
    });   
    
    useEffect(() => {
        categoryServer.ListCategorias().then((res) => {
        const allCategories = res;
        setAppState({ loading: false, categories: allCategories });
      });
    }, [setAppState]);
  
    return (
      <Container>
        <div className="App">
          <CategoryLoading isLoading={appState.loading} categories={appState.categories} />
        </div>
      </Container>
    );
}

export default Principal;

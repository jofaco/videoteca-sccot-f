import React from "react";
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//components:
import Header from "./components/header";
import Principal from "./paginas/Principal";
import Peliculas from "./paginas/Peliculas";
import SignIn from "./components/users/login";
import SignUp from "./components/users/logout";
import Series from "./paginas/Series";
import VideoDetail from "./components/videos/videoDetail";
import VideoForm from "./components/videos/videoForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


function App() {
  
  return (
    <BrowserRouter>  
    <StyledEngineProvider injectFirst>
      <Header />
    </StyledEngineProvider>
    <div className=" mt-4">
      <Routes>
        <Route exact path="/" element={<Principal />} />
        <Route exact path="/Videos" element={<Peliculas />} />
        <Route exact path="/Series" element={<Series />} />
        <Route path="/VideoForm" element={<VideoForm />} />
        <Route path="/updateVideo/:id" element={<VideoForm />} />
        <Route path="/seeVideo/:id" element={<VideoDetail />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<SignUp />} />
      </Routes>
      <br></br>
    </div>
  </BrowserRouter>
  );
}
export default App;

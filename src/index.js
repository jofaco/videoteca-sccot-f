import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
//components:
import App from "./App";
import AppSeries from "./AppSeries";
import AppPeliculas from "./AppPeliculas";
import Header from "./components/header";
import VideoDetail from "./components/videos/videoDetail";
import VideoForm from "./components/videos/videoForm";
import SignIn from "./components/users/login";
import SignUp from "./components/users/logout";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>  
    <StyledEngineProvider injectFirst>
      <Header />
    </StyledEngineProvider>
    <div className=" mt-4">
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/Peliculas" element={<AppPeliculas />} />
        <Route exact path="/Series" element={<AppSeries />} />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

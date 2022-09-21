import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

//components:
import Navbar from "./components/navbar/navbar";
import VideosList from "./components/videos/videosList";
import VideoForm from "./components/videos/videoForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div className="container ">
      <Navbar />
    </div>
    <div className="container my-4">
      <Routes>
        <Route path="/" element={<VideosList />} />
        <Route path="/VideoForm" element={<VideoForm />} />
        <Route path="/updateVideo/:id" element={<VideoForm />} />
      </Routes>
    </div>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

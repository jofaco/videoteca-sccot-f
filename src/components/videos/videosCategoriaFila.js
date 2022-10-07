/* eslint-disable array-callback-return */
import React from "react";
//
import VideosItemRow from "./videosItemRow";

import "../../styles.css";
import "../../conCate.css";

const VideosCategoriaFila = ({ categoria, ...props }) => {
  if(categoria){
    return (
    <div className="container">      
      <div className="col-12 contenedorXcateg">
        <h1 className="titleCateg" key = {categoria.id}>{categoria.categoria}</h1>
        <div className="row">
          {props.videos && props.search(props.videos).map((video) => (
              video.categorias.map((element, index) => {
                if (categoria.categoria === element.categoria) 
                  return(
                      <VideosItemRow
                      key={index}
                      video={video}
                      >
                      </VideosItemRow> 
                      )                 
              })
            ))}
        </div>
      </div>
    </div>
  );}
  
};

export default VideosCategoriaFila;

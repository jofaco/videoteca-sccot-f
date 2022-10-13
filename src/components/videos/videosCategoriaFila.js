/* eslint-disable array-callback-return */
import React from "react";
//
import VideosItemRow from "./videosItemRow";
import '../../styles/slider.css'
import { motion } from 'framer-motion'
import "../../styles/styles.css";
import "../../styles/conCate.css";

import { Image } from "react-bootstrap";


const VideosCategoriaFila = ({ categoria, ...props }) => {
  if(categoria){
    return (
    <div >      
      <div className="col-12 contenedorXcateg">
        <h1 className="titleCateg" key = {categoria.id}>{categoria.categoria}</h1>
        <div className="container">
        <motion.div className='slider-container' >
          <motion.div className='slider' drag='x' dragConstraints={{right: 0, left:-2123}} >
          {props.videos && props.search(props.videos).map((video) => (
              video.categorias.map((element, index) => {
                if (categoria.categoria === element.categoria) 
                  return(                                          
                          <motion.div className='item' key={index}>
                          <Image
                            src={"http://localhost:8000" + video.featured_image}
                            className="img-fluid"
                          ></Image>
                          </motion.div>                          
                      )                 
              })
            ))}
            </motion.div>                      
          </motion.div>
        </div>
      </div>
    </div>
  );}
  
};

export default VideosCategoriaFila;

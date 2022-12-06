import React from "react";
import cx from "classnames";
import SliderContext from "../context/SliderContext";
import ShowDetailsButton from "./ShowDetailsButton";
//import Mark from './Mark'
import "./Item.scss";
//Components
import Button from "@material-ui/core/Button";

/**
 * Componente para mostrar el elemento en el slider
 * @param {Object} video 
 * @returns 
 */
const Item = ({ video,...props }) => {

  return (
    <SliderContext.Consumer>
      {({ onSelectSlide, currentSlide, elementRef, history }) => {
        const isActive = currentSlide && currentSlide.id === video.id;
        
        return (
          <div
            ref={elementRef}
            className={cx("item", {
              "item--open": isActive,
            })}
          >
            <h4>{video.title_espanol}</h4>
            <Button onClick={() => props.verVideo(video.id)}>
              <img
                src={"http://localhost:8000" + video.featured_image}
                alt=""
              />
            </Button>
            <ShowDetailsButton onClick={() => onSelectSlide(video)} />
            {isActive}
            {/* {isActive && <Mark />} */}
          </div>
        );
      }}
    </SliderContext.Consumer>
  );
};

export default Item;

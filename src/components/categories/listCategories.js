/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useContext } from "react";

//Components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../index.css";
import { Container } from "@material-ui/core";

//dependencies
import Context from "../context/UserContext";

const CategoryList = ({ categories }) => {
  const [listCategories, setCategories] = useState(categories);
  const { user } = useContext(Context);

  return (
    <div>      
        {listCategories.map((category, index) => (
          <p key={index}>{category.categoria}</p>
        ))}      
    </div>
  );
};

export default CategoryList;

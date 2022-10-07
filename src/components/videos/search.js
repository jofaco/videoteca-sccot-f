import React, { useEffect, useState } from "react";

import "../../index.css";

const SearchComponent = (props) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  if (categories) {
    return (
      <div className="wrapper">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={props.query}
              onChange={(e) => props.setQuery(e.target.value)}
            />
          </label>
          <div className="select">
            <select
              onChange={(e) => props.setFilterParam(e.target.value)}
              className="custom-select"
              aria-label="Filter Videos By Categoria"
            >
              <option value="All">Filter By Categoria ▼</option>
              { categories.map((categ, index) => (
                <option key={index} value={categ.categoria}>
                  {categ.categoria}
                </option>
              ))}
            </select>
            <span className="focus"></span>
          </div>
        </div>        
      </div>
    );
  }
};
export default SearchComponent;
import React, { useEffect, useState } from "react";
import * as VideoServer from "./videoServer";

//Components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../index.css";
//dependencies
import VideosListAd from "../admin/videosListAdmin";
import VideosListUser from "./videoListUser";

const VideosList = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [searchParam] = useState(["title_espanol", "categorias"]);

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  const listVideos = async () => {
    try {
      const res = await VideoServer.ListVideos();
      setVideos(res.videos);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    listVideos();
  }, []);

  //const datos = Object.values(videos);
  //const search_parameters = Object.keys(Object.assign({}, ...datos));
  //const filter_items = [...new Set(datos.map((item) => item.categorias.categoria))];

  const search = (videos) => {
    return videos.filter((item) => {
      return searchParam.some((parameter) => {
        return (
          item[parameter]
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      });
    });
  };

  if (user) {
    if (user.is_superuser) {
      return (
        <div className="container">
          <div className="search-wrapper">
            <label htmlFor="search-form">
              <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input"
                placeholder="Search for..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <VideosListAd
            videos={videos}
            listVideos={listVideos}
            search={search}
          ></VideosListAd>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <VideosListUser
          videos={videos}
          listVideos={listVideos}
          search={search}
        ></VideosListUser>
      </div>
    );
  }
  return (
    <p style={{ fontSize: "25px" }}>Inicia sesión para ver todos los videos!</p>
  );
};

export default VideosList;

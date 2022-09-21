import React, { useEffect, useState } from "react";
import * as VideoServer from "./videoServer";
//import Table from "react-bootstrap/Table";

//Components
import VideosItem from "./videosItem";

const VideosList = () => {
  const [videos, setVideos] = useState([]);

  const listVideos = async () => {
    try {
      const res = await VideoServer.ListVideos();
      const data = await res.json();
      setVideos(data.videos);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    listVideos();
  }, []);
  return (
    <div className="row">
      {videos.map((video) => (
        <VideosItem key={video.id} video={video} listVideos = {listVideos} />        
      ))}
    </div>
  );
};

export default VideosList;

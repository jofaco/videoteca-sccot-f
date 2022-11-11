import React, { useEffect, useState } from "react";

//dependencies
import * as VideoServer from "../services/videoServer";
import PeliculasList from "../components/videos/peliculas";
import VideoLoadingComponent from "../components/videos/videoLoading";
//components
import { Container } from "@material-ui/core";

function AppPeliculas() {
  const VideoLoading = VideoLoadingComponent(PeliculasList);

  const [appState, setAppState] = useState({
    loading: true,
    videos: null,
  });

  useEffect(() => {
    VideoServer.ListPeliculas().then((res) => {
      const allVideos = res.videos;
      setAppState({ loading: false, videos: allVideos });
    });
  }, [setAppState]);

  return (
    <Container>
      <div className="App">
        <VideoLoading isLoading={appState.loading} peliculas={appState.videos} />
      </div>
    </Container>
  );
}
export default AppPeliculas;

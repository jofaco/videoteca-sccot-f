import React, { useEffect, useState } from "react";

//dependencies
import CasosList from "../components/videos/casos";
import VideoLoadingComponent from "../components/videos/videoLoading";
import axiosInstance from "../axios";
//components
import { Container } from "@material-ui/core";

function AppCasos() {
  const VideoLoading = VideoLoadingComponent(CasosList);

  const [appState, setAppState] = useState({
    loading: true,
    videos: null,
  });

  useEffect(() => {
    axiosInstance.get().then((res) => {
      const allVideos = res.data;
      setAppState({ loading: false, videos: allVideos });
    });
  }, [setAppState]);

  return (
    <Container>
      <div className="App">
        <VideoLoading isLoading={appState.loading} videos={appState.videos} />
      </div>
    </Container>
  );
}
export default AppCasos;

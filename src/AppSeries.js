import React, { useEffect, useState } from "react";

//dependencies
import SeriesList from "./components/videos/series";
import VideoLoadingComponent from "./components/videos/videoLoading";
import axiosInstance from "./axios";
//components
import { Container } from "@material-ui/core";

function AppSeries() {
  const VideoLoading = VideoLoadingComponent(SeriesList);

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
export default AppSeries;

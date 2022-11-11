import React, { useEffect, useState } from "react";

//dependencies
import VideosList from "../components/videos/videosList";
import VideoLoadingComponent from "../components/videos/videoLoading";
import * as VideoServer from "../services/videoServer";
//components
import { Container } from "@material-ui/core";

function Principal() {
  const VideoLoading = VideoLoadingComponent(VideosList);

  const [appState, setAppState] = useState({
    loading: true,
    videos: null,
  });

  useEffect(() => {
    VideoServer.ListVideos().then((res) => {
      const allVideos = res.videos;
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
export default Principal;

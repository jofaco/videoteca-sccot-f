import React, { useEffect, useState } from 'react';

import VideosList from "./components/videos/videosList";
import VideoLoadingComponent  from "./components/videos/videoLoading";
import { UserContextProvider } from './components/context/UserContext';

import  axiosInstance2  from "./axios";


function App() {
	const VideoLoading = VideoLoadingComponent(VideosList);
	const [appState, setAppState] = useState({
		loading: true,
		videos: null,
	});

	useEffect(() => {
		axiosInstance2.get().then((res) => {
			const allVideos = res.data;
			setAppState({ loading: false, videos: allVideos });
		});
	}, [setAppState]);
	return (
		<div className="App">
			<h1>Latest videos</h1>
			<VideoLoading isLoading={appState.loading} videos={appState.videos} />
		</div>
	);
}
export default App;
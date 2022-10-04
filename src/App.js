import React, { useEffect, useState } from 'react';

//dependencies
import VideosList from "./components/videos/videosList";
import VideoLoadingComponent  from "./components/videos/videoLoading";
import { Container} from '@material-ui/core'; 
import  axiosInstance  from "./axios";


function App() {
	const VideoLoading = VideoLoadingComponent(VideosList);
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
				<h1>Latest videos</h1>
				<VideoLoading isLoading={appState.loading} videos={appState.videos} />
			</div>
		</Container>
		
	);
}
export default App;
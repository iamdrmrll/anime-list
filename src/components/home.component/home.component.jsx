import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import SeasonsNowComponent from "./seasons_now.component/seasons_now.component";
import TopAnimeComponent from "./top_anime.component/top_anime.component";

const HomeComponent = (props) => {
	let { setAnimeId } = props;
	const [loading, setLoading] = useState(
		<div className="d-flex justify-content-center">
			<Spinner animation="border" className="m-3" />
		</div>
	);

	useEffect(() => {
		setLoading(
			<div className="d-flex justify-content-center">
				<Spinner animation="border" className="m-3" />
			</div>
		);
		// const delayDebounceFn = setTimeout(() => {
		setLoading(false);
		// }, 1000);
		// return () => clearTimeout(delayDebounceFn);
	}, []);

	return loading !== false ? (
		loading
	) : (
		<>
			{/* Top Anime */}
			<TopAnimeComponent setAnimeId={setAnimeId} />
			{/* carousel seasons/now */}
			<SeasonsNowComponent setAnimeId={setAnimeId} />
		</>
	);
};

export default HomeComponent;

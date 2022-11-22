import React, { useState } from "react";
import "./app.component.css";
import NavComponent from "./nav.component/nav.component";
// import JikanApi from "../api/jikan.api";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeComponent from "./home.component/home.component";
import AnimePageComponent from "./anime_page.component/anime_page.component";
import WatchPageComponent from "./watch_page.component/watch_page.component";

const AppComponent = () => {
	const anime_id = window.location.pathname.slice(7);
	const [animeId, setAnimeId] = useState(anime_id); // animeId: 50265

	return (
		<>
			<Router>
				<NavComponent setAnimeId={setAnimeId} />

				<Container fluid id="main">
					<Routes>
						<Route
							exact
							path="/anime-list"
							element={<HomeComponent setAnimeId={setAnimeId} />}
						></Route>
						<Route
							path="/anime/:id"
							element={
								<AnimePageComponent
									animeId={animeId}
									setAnimeId={setAnimeId}
								/>
							}
						></Route>
						<Route
							path="/watch/:id"
							element={<WatchPageComponent />}
						></Route>
					</Routes>
				</Container>
			</Router>
		</>
	);
};

export default AppComponent;

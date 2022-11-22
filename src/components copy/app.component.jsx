import React from "react";
import "./app.component.css";
import NavComponent from "./nav.component/nav.component";
// import JikanApi from "../api/jikan.api";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeComponent from "./home.component/home.component";

const AppComponent = () => {
	return (
		<>
			<Router>
				<NavComponent />
				<Container fluid id="main">
					<Routes>
						<Route
							exact
							path="/"
							element={<HomeComponent />}
						></Route>
					</Routes>
				</Container>
			</Router>
		</>
	);
};

export default AppComponent;

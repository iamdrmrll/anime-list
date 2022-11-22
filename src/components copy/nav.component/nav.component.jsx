import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./nav.component.css";
import SearchComponent from "./search.component/search.component";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const NavComponent = () => {
	return (
		<>
			<Navbar
				fixed="top"
				className="shadow"
				expand="lg"
				bg="dark"
				variant="dark"
				id="navbar"
			>
				<Container>
					<div className="col-lg-4">
						<Navbar.Brand as={Link} to="/" className="primary">
							<strong className="text-primary">Anime</strong>
							List
						</Navbar.Brand>
					</div>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<SearchComponent />
						<Nav className="col-lg-6 justify-content-end">
							<Nav.Link as={Link} to="/signup">
								Signup
							</Nav.Link>
							<Nav.Link
								className="text-primary primary"
								as={Link}
								to="/login"
							>
								Login
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavComponent;

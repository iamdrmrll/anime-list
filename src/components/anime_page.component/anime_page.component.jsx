import React, { useEffect, useState } from "react";
import {
	Badge,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Col,
	Row,
	Spinner,
	Stack,
} from "react-bootstrap";
import JikanApi from "../../api/jikan.api";
import "./anime_page.component.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GogoAnimeApi from "../../api/gogo_anime.api";

const AnimePageComponent = (props) => {
	const anime_id = window.location.pathname.slice(7); // 50265
	let { animeId, setAnimeId } = props; // 50265
	const [gogoId, setGogoId] = useState();
	const [animeDetails, setAnimeDetails] = useState(
		<div className="d-flex justify-content-center">
			<Spinner animation="border" className="m-3" />
		</div>
	);

	useEffect(() => {
		setAnimeDetails(
			<div className="d-flex justify-content-center">
				<Spinner animation="border" className="m-3" />
			</div>
		);

		JikanApi.get(`/anime/${anime_id}/full`)
			.then((res) => {
				let { data } = res.data;
				setAnimeDetails({
					mal_id: anime_id,
					aired: data.aired.string,
					premiered: `${
						data.season.charAt(0).toUpperCase() +
						data.season.slice(1)
					} ${data.year}`,
					duration: data.duration,
					status: data.status,
					title_japanese: data.title_japanese,
					title_synonyms: data.title_synonyms,
					title_english: data.title_english,
					title: data.title,
					genres: data.genres.map((genre) => {
						return { mal_id: genre.mal_id, name: genre.name };
					}),
					producers: data.producers.map((producer) => {
						return { mal_id: producer.mal_id, name: producer.name };
					}),
					studios: data.studios.map((studio) => {
						return { mal_id: studio.mal_id, name: studio.name };
					}),
					synopsis: data.synopsis,
					trailer: data.trailer.embed_url,
					members: data.members,
					score: data.score,
					popularity: data.popularity,
					type: data.type,
					rank: data.rank,
					image: data.images.webp.image_url,
					bg_image: data.images.webp.large_image_url,
					rating: data.rating,
				});

				setGogoId(
					data.title.toLowerCase().replace(/[^A-Z0-9]+/gi, "-")
				);
			})
			.catch((err) => {
				setAnimeDetails(
					<div className="d-flex justify-content-center">
						<p>No Anime Found</p>
					</div>
				);
			});
	}, [animeId]);

	if (animeDetails.mal_id === undefined) {
		return animeDetails;
	} else {
		document.styleSheets[0].addRule(
			"div#anime_page_overlay:before",
			`background: url(${animeDetails.bg_image}) center/cover no-repeat`
		);
		return (
			<>
				<style>{"#main { padding: 3.5rem 0 0rem 0 }"}</style>
				<div id="anime_page_overlay">
					<Row className="mx-0">
						<Col lg={8} className="container-fluid" id="content">
							<Breadcrumb>
								<Breadcrumb.Item
									linkAs={Link}
									linkProps={{ to: "/anime-list" }}
								>
									Home
								</Breadcrumb.Item>
								<Breadcrumb.Item
									linkAs={Link}
									linkProps={{ to: "#" }}
								>
									TV
								</Breadcrumb.Item>
								<Breadcrumb.Item active>
									{animeDetails.title}
								</Breadcrumb.Item>
							</Breadcrumb>
							{/* <h1>{animeDetails.title}</h1> */}
							<Stack
								direction="horizontal"
								gap="3"
								className="pb-3"
							>
								<img
									src={animeDetails.image}
									alt=""
									className="rounded"
								/>
								<div>
									<h1>{animeDetails.title}</h1>
									<Breadcrumb className="mx-auto">
										<Breadcrumb.Item active>
											<Badge pill text="dark">
												{animeDetails.rating}
											</Badge>
										</Breadcrumb.Item>
										<Breadcrumb.Item active>
											{animeDetails.type}
										</Breadcrumb.Item>
										<Breadcrumb.Item active>
											{animeDetails.duration}
										</Breadcrumb.Item>
									</Breadcrumb>
									<p id="synopsis" className="hide">
										{animeDetails.synopsis}
									</p>
									{animeDetails.synopsis.length >= 300 && (
										<div id="show_synopsis_container">
											<button
												id="show_synopsis"
												data-state={0}
												onClick={(e) => {
													let span =
														document.querySelector(
															"#synopsis"
														);
													let btn = e.target;
													let { state } = btn.dataset;
													if (parseInt(state)) {
														span.classList.add(
															"hide"
														);
														btn.dataset.state = "0";
														btn.innerHTML =
															"Show More";
													} else {
														span.classList.remove(
															"hide"
														);
														btn.dataset.state = "1";
														btn.innerHTML =
															"Show Less";
													}
												}}
											>
												Show more
											</button>
										</div>
									)}
									<div
										className="d-flex gap-3 mt-3"
										id="actions_container"
									>
										<Button
											as={Link}
											to={`/watch/${gogoId}-episode-1`}
											variant="primary"
											className="rounded-pill action_w_svg"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												fill="currentColor"
												className="bi bi-play-fill"
												viewBox="3 3 10 10"
											>
												<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
											</svg>
											<span>Watch Now</span>
										</Button>
										<Button
											variant="outline-primary"
											className="rounded-pill action_w_svg"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												fill="currentColor"
												className="bi bi-plus"
												viewBox="3 3 10 10"
											>
												<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
											</svg>
											<span>Add to List</span>
										</Button>
									</div>
								</div>
							</Stack>
						</Col>
						<Col lg={4} id="details_wrapper">
							<div id="details">
								<div id="texts">
									<p>
										<strong>Japanese Title: </strong>
										{animeDetails.title_japanese}
									</p>
									<p>
										<strong>Aired: </strong>
										{animeDetails.aired}
									</p>
									<p>
										<strong>Premiered: </strong>
										{animeDetails.premiered}
									</p>
									<p>
										<strong>Duration: </strong>
										{animeDetails.duration}
									</p>
									<p>
										<strong>Status: </strong>
										{animeDetails.status}
									</p>
									<p>
										<strong>MAL Score: </strong>
										{animeDetails.score}
									</p>
								</div>
								<hr />
								<div id="genres">
									<strong>Genres: </strong>
									{animeDetails.genres.map((genre) => {
										return (
											<Link
												to={`/genre/${genre.mal_id}`}
												key={genre.mal_id}
											>
												<Badge
													pill
													className="btn btn-outline-light genre bg-transparent"
												>
													{genre.name}
												</Badge>
											</Link>
										);
									})}
								</div>
								<hr />
								<div id="prod">
									<p>
										<strong>Studios: </strong>
										{animeDetails.studios.map(
											(studio, index) => {
												return (
													(index ? ", " : "") +
													studio.name
												);
											}
										)}
									</p>
									<p>
										<strong>Producers: </strong>
										{animeDetails.producers.map(
											(producer, index) => {
												return (
													(index ? ", " : "") +
													producer.name
												);
											}
										)}
									</p>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</>
		);
	}
};

export default AnimePageComponent;

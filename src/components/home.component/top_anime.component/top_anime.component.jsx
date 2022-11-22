import React, { useState, useEffect } from "react";
import { Badge, Container, Spinner } from "react-bootstrap";
import JikanApi from "../../../api/jikan.api";
import Carousel from "better-react-carousel";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

const TopAnimeComponent = (props) => {
	let { setAnimeId } = props;
	const [topAnime, setTopAnime] = useState();

	useEffect(() => {
		JikanApi.get("/top/anime?filter=airing&type=tv&limit=10").then(
			(res) => {
				setTopAnime(
					res.data.data.map((anime) => {
						return {
							mal_id: anime.mal_id,
							image: anime.images.webp.large_image_url,
							title: anime.title,
							score: anime.score,
							popularity: anime.popularity,
							members: anime.members,
							rank: anime.rank,
						};
					})
				);
			}
		);
	}, []);

	return (
		topAnime !== undefined && (
			<>
				<div className="pb-5">
					<h1>Top Airing Anime</h1>
					<Carousel
						cols={5}
						rows={1}
						gap={10}
						loop
						autoplay={5000}
						showDots
						scrollSnap
					>
						{topAnime.map((anime, index) => {
							return (
								<Carousel.Item
									key={anime.mal_id}
									style={{ marginBottom: "0" }}
								>
									<Link
										id="item"
										className="rounded"
										style={{
											position: "relative",
											display: "block",
										}}
										to={`/anime/${anime.mal_id}`}
										onClick={() => setAnimeId(anime.mal_id)}
									>
										<img
											className="d-block w-100 rounded"
											src={anime.image}
											alt=""
										/>
										<h6 className="anime_title rounded">
											<Badge bg="secondary">
												#{index + 1}
											</Badge>{" "}
											{anime.title}
										</h6>
									</Link>
								</Carousel.Item>
							);
						})}
					</Carousel>
				</div>
			</>
		)
	);
};

export default TopAnimeComponent;

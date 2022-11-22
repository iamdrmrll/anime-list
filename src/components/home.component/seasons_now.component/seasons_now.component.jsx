import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import JikanApi from "../../../api/jikan.api";
import "./seasons_now.component.css";
import Carousel from "better-react-carousel";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const SeasonsNowComponent = (props) => {
	let { setAnimeId } = props;
	const [seasonsNow, setseasonsNow] = useState();

	useEffect(() => {
		// const delayDebounceFn = setTimeout(() => {
		JikanApi.get("/seasons/now?limit=20").then((res) => {
			setseasonsNow(
				res.data.data.map((anime) => {
					return {
						mal_id: anime.mal_id,
						image: anime.images.webp.large_image_url,
						title: anime.title,
						season: anime.season,
						year: anime.year,
					};
				})
			);
		});
		// }, 1000);
		// return () => clearTimeout(delayDebounceFn);
	}, []);

	return (
		seasonsNow !== undefined && (
			<>
				<div className="pb-5">
					<h1>
						{`${
							seasonsNow[0].season.charAt(0).toUpperCase() +
							seasonsNow[0].season.slice(1)
						} ${seasonsNow[0].year} Anime`}
					</h1>
					<Carousel
						cols={5}
						rows={1}
						gap={10}
						loop
						autoplay={5000}
						showDots
					>
						{seasonsNow.map((anime) => {
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
											className="d-block w-100 seasonsNowImage rounded"
											src={anime.image}
											alt=""
										/>
										<h6 className="anime_title rounded">
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

export default SeasonsNowComponent;

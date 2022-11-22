import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import JikanApi from "../../../api/jikan.api";
import "./seasons.now.component.css";
import Carousel from "better-react-carousel";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const SeasonsNowComponent = () => {
	const [seasonsNow, setSeasonsNow] = useState("");
	const [seasonsNowList, setSeasonsNowList] = useState([]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			setSeasonsNowList(<Spinner animation="border" className="m-3" />);

			JikanApi.get("/seasons/now?limit=20&filter=airing").then((res) => {
				setSeasonsNowList(
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
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
	}, [seasonsNow]);

	return (
		<div>
			{seasonsNowList.length === undefined ||
			seasonsNowList.length === 0 ? (
				<div className="d-flex justify-content-center">
					{seasonsNowList}
				</div>
			) : (
				<>
					<Container>
						<h1>
							{seasonsNowList.length === undefined ||
							seasonsNowList.length === 0
								? ""
								: `${
										seasonsNowList[0].season
											.charAt(0)
											.toUpperCase() +
										seasonsNowList[0].season.slice(1)
								  } ${seasonsNowList[0].year} Anime`}
						</h1>
					</Container>
					<Carousel
						cols={5}
						rows={1}
						gap={10}
						loop
						autoplay={5000}
						showDots
						scrollSnap={false}
					>
						{seasonsNowList.map((anime) => {
							return (
								<Carousel.Item
									key={anime.mal_id}
									style={{ marginBottom: "0" }}
								>
									<Link
										id="item"
										className="rounded"
										style={{
											cursor: "pointer",
											position: "relative",
											display: "block",
										}}
										to={`/anime/${anime.mal_id}`}
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
				</>
			)}
		</div>
	);
};

export default SeasonsNowComponent;

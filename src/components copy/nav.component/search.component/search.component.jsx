import React, { useEffect, useState } from "react";
import { Form, Nav, Spinner } from "react-bootstrap";
import JikanApi from "../../../api/jikan.api";
import SearchItemComponent from "./search_item.component";

const SearchComponent = () => {
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	// for searching
	useEffect(() => {
		if (!search) return setSearchResults([]);

		const delayDebounceFn = setTimeout(() => {
			setSearchResults(<Spinner animation="border" className="m-3" />);

			JikanApi.get(`/anime?q=${search}&order_by=type&sort=desc`).then(
				(res) => {
					setSearchResults(
						res.data.data.length !== 0
							? res.data.data.map((anime) => {
									return {
										mal_id: anime.mal_id,
										title: anime.title,
										image: anime.images.webp
											.small_image_url,
										rank: anime.rank,
										score: anime.score,
										type: anime.type,
										status: anime.status,
									};
							  })
							: "No Anime Found"
					);
				}
			);
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [search]);

	return (
		<Nav className="position-relative col-lg-6">
			<div className="flex-grow-1">
				<Form.Control
					id="search"
					className="text-center"
					autoComplete="off"
					type="search"
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					onClick={(e) => {
						setSearch(e.target.value);
					}}
					placeholder="Search here"
				></Form.Control>
				<div
					className="position-absolute shadow rounded w-100 d-flex flex-column align-items-center"
					id="search_results"
					style={{ maxHeight: "30rem", overflowY: "auto" }}
				>
					{/* {console.log(searchResults.length)} */}
					{searchResults.length === undefined ? (
						searchResults
					) : typeof searchResults === "string" ? (
						<p className="m-0 p-3">{searchResults}</p>
					) : (
						searchResults.map((result) => {
							return (
								<SearchItemComponent
									result={result}
									setSearch={setSearch}
									key={result.mal_id}
								/>
							);
						})
					)}
				</div>
			</div>
		</Nav>
	);
};

export default SearchComponent;

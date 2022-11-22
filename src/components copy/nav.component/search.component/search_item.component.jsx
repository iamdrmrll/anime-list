import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";

const SearchItemComponent = (props) => {
	let { result, setSearch } = props;
	return (
		<>
			<Link
				className="text-white p-3 d-flex gap-3 align-items-center search_result w-100"
				style={{ cursor: "pointer" }}
				to={`anime/${result.mal_id}`}
				onClick={() => {
					setSearch("");
				}}
			>
				<img
					src={result.image}
					alt=""
					style={{
						width: "50px",
						height: "50px",
					}}
				/>
				<div>
					<p className="m-0" style={{ overflowX: "hidden" }}>
						{result.title}
					</p>
					<p className="text-muted small m-0">
						<strong>Score:</strong>{" "}
						{result.score === null ? "N/A" : result.score} |{" "}
						<strong>Rank:</strong>{" "}
						{result.rank === null || result.rank === 0
							? "N/A"
							: `#${result.rank}`}
					</p>
					<p className="text-muted small m-0">
						<strong>Status:</strong> {result.status}
					</p>
					<p className="text-muted small m-0">
						<strong>Type:</strong> {result.type}
					</p>
				</div>
			</Link>
			<hr className="m-0 w-100" />
		</>
	);
};

export default SearchItemComponent;

import React from "react";

const WatchPageComponent = () => {
	const gogoId = window.location.pathname.slice(7); // 50265
	console.log(gogoId);
	return <h1>Watch {`${gogoId.replace(/-/g, " ")}`}</h1>;
};

export default WatchPageComponent;

import axios from "axios";

const GogoAnimeApi = axios.create({
	baseURL: "https://gogoanime.herokuapp.com/",
	headers: {},
});

export default GogoAnimeApi;

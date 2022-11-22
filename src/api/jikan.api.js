import axios from "axios";

const JikanApi = axios.create({
	baseURL: "https://api.jikan.moe/v4/",
	headers: {},
});

export default JikanApi;

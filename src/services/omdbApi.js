const API_KEY = 'adfbcb31';
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Response === "True") {
            return data.Search;
        }
        return [];
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

export const getMovieDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}&plot=full`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};

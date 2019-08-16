import axios from "axios";
const BASE_URL = "https://yts.am/api/v2/";
const LIST_MOVIES_URL = `${BASE_URL}list_movies.json`;
const MOVIE_DETAILS_URL = `${BASE_URL}movie_details.json`;

export const getMovies = async (limit, rating) => {
    const {
        data: {
            data: { movies }
        }
    } = await axios(LIST_MOVIES_URL, {
        params: {
            limit,
            minimum_rating: rating
        }
    });
    return movies;
};
  
export const getById = async id => {
    const {
        data: {
            data: { movie }
        }
    } = await axios(MOVIE_DETAILS_URL, {
        params: {
            movie_id: id
        }
    });
    return movie;
};
  
export const deleteMovie = (id) => {
    const cleanedMovies = movies.filter((movie) => (movie.id !== id));
    if(movies.length > cleanedMovies.length) {
        movies = [...cleanedMovies];
        return true;
    }
    return false;
}

export const addMovie = (name, score) => {
    const newMovie = {
        id: movies.length,
        name, 
        score
    }
    movies.push(newMovie);
    return newMovie;
}
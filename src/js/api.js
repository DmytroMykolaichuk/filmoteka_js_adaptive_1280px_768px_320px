import axios from 'axios';
import { showPreloader, hidePreloader } from './loader';

const BASE_URL = 'https://api.themoviedb.org/3/';

export async function getPopularFilms() {
  showPreloader();
  try {
    let { data } = await axios.get(
      `${BASE_URL}trending/movie/day?api_key=352708f90836dd2b75b209ae082e91df`
    );
    hidePreloader();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchGenres() {
  try {
    let { data } = await axios.get(
      `${BASE_URL}genre/movie/list?api_key=352708f90836dd2b75b209ae082e91df`
    );
    return data.genres;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMoviesByGenre(genreId) {
  try {
    let { data } = await axios.get(
      `${BASE_URL}discover/movie?api_key=352708f90836dd2b75b209ae082e91df&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getVideoInfo(movieId) {
  showPreloader();
  try {
    let { data } = await axios.get(
      `${BASE_URL}movie/${movieId}/videos?api_key=352708f90836dd2b75b209ae082e91df`
    );
    hidePreloader();
    return data.results[0]?.key;
  } catch (error) {
    console.log(error);
  }
}

import axios from 'axios';
import { showPreloader, hidePreloader } from './loader';

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = 'api_key=352708f90836dd2b75b209ae082e91df';

export async function getPopularFilms() {
  showPreloader();
  try {
    let { data } = await axios.get(`${BASE_URL}trending/movie/day?${KEY}`);
    hidePreloader();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchGenres() {
  try {
    let { data } = await axios.get(`${BASE_URL}genre/movie/list?${KEY}`);
    return data.genres;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMoviesByGenre(genreId) {
  try {
    let { data } = await axios.get(
      `${BASE_URL}discover/movie?${KEY}&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function getVideoInfo(movieId) {
  showPreloader();
  return axios
    .get(`${BASE_URL}movie/${movieId}/videos?${KEY}`)
    .then(response => {
      const videoKey = response.data.results[0].key;
      hidePreloader();
      return videoKey;
    });
}

export async function getSearchMovie(name, page) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}search/movie?${KEY}&language=en-US&query=${name}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function afterForSearchPagination(name, currentPage) {
  showPreloader();
  try {
    const data = await axios.get(
      `${BASE_URL}search/movie?${KEY}&query=${name}&page=${currentPage}`
    );
    hidePreloader();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function afterForGenreIdPagination(genreId, currentPage) {
  showPreloader();
  try {
    const data = await axios.get(
      `${BASE_URL}discover/movie?${KEY}&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&page=${currentPage}`
    );
    hidePreloader();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function afterForPagination(currentPage) {
  showPreloader();
  try {
    const data = await axios.get(
      `${BASE_URL}trending/movie/day?${KEY}&page=${currentPage}`
    );
    hidePreloader();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function beforeForSearchPagination(name) {
  showPreloader();
  try {
    const data = await axios.get(
      `${BASE_URL}search/movie?${KEY}&query=${name}&page=1`
    );
    hidePreloader();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function beforeForGenreIdPagination(genreId) {
  showPreloader();
  try {
    const data = await axios.get(
      `${BASE_URL}discover/movie?${KEY}&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&page=1`
    );
    hidePreloader();
    return data;
  } catch (error) {
    console.log(error);
  }
}

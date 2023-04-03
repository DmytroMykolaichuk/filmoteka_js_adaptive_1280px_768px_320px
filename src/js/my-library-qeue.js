import axios from 'axios';
import { genres } from './genres';
import { clickOnFilmCard } from './film-modal';
import { getVideoInfo } from './trailer';
import { showPreloader, hidePreloader } from './loader';
import { showPreloader, hidePreloader } from './loader';

const containerListWatchedCard = document.querySelector('.film-list');

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '352708f90836dd2b75b209ae082e91df';

async function getWatchedFilms(page) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}${page}?api_key=${API_KEY}&language=en-US`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

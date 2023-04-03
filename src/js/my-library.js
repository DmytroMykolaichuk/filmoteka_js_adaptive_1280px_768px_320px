import axios from 'axios';
import {
  onClickWatchedBtn,
  onClickQueueBtn,
  onClickClearAll,
} from './buttons-my-library';
import { genres } from './genres';
import { clickOnFilmCard } from './film-modal';
import { getVideoInfo } from './trailer';
import { showPreloader, hidePreloader } from './loader';
// import { showPreloader, hidePreloader } from './loader';
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
const containerListWatchedCard = document.querySelector('.film-list');
const dataWatchedCards = JSON.parse(localStorage.getItem('wathced'));
const dataQueueCards = JSON.parse(localStorage.getItem('queue'));
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '352708f90836dd2b75b209ae082e91df';

const queueButton = document.getElementById('queue');
queueButton.addEventListener('click', () => {});

async function onCardWatch() {
  containerListWatchedCard.innerHTML = '';
  for (const idFilm of dataWatchedCards) {
    const oneFilmCard = await getWatchedFilms(idFilm);
    let release = Number.parseInt(
      oneFilmCard.release_date || oneFilmCard.first_air_date
    );
    const mainPoster = `https://image.tmdb.org/t/p/w300${oneFilmCard.poster_path}`;
    const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
    let genreMarkup = [];
    genres.forEach(genre => {
      if (oneFilmCard.genres.includes(genre.id)) {
        genreMarkup.push(genre.name);
      }
    });
    let markup = '';
    markup += ` <li class ="film-item">
                <a id='${oneFilmCard.id}' class="film-card" href="#">
                  <div class='thumb'>
                  <img
                      class = 'poster'
                      src= "${
                        oneFilmCard.poster_path ? mainPoster : posterFake
                      }"
                      alt="${oneFilmCard.title}"
                      loading="lazy"
                    /></div>
                    <div class='film-data'>
                      <h2 class="title-film">${oneFilmCard.title}</h2>
                      <p>
                         <span class='info-film'>${genreMarkup.join(
                           ', '
                         )} | ${release}</span>
                        <span class ="rating">IMDB:<br>${oneFilmCard.vote_average.toFixed(
                          1
                        )}</span>
                      </p>
                    </div>
                  </a>
              </li>`;
    console.log(markup);
    console.log(oneFilmCard);
    containerListWatchedCard.insertAdjacentHTML('beforeend', markup);
  }
}
onCardWatch();
//////////addEventListener//////
queueButton.addEventListener('click', () => {
  async function onCardQueue() {
    containerListWatchedCard.innerHTML = '';
    for (const idFilm of dataQueueCards) {
      const oneFilmCard = await getWatchedFilms(idFilm);
      let release = Number.parseInt(
        oneFilmCard.release_date || oneFilmCard.first_air_date
      );
      const mainPoster = `https://image.tmdb.org/t/p/w300${oneFilmCard.poster_path}`;
      const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
      let genreMarkup = [];
      genres.forEach(genre => {
        if (oneFilmCard.genres.includes(genre.id)) {
          genreMarkup.push(genre.name);
        }
      });
      let markup = '';
      markup += ` <li class ="film-item">
                <a id='${oneFilmCard.id}' class="film-card" href="#">
                  <div class='thumb'>
                  <img
                      class = 'poster'
                      src= "${
                        oneFilmCard.poster_path ? mainPoster : posterFake
                      }"
                      alt="${oneFilmCard.title}"
                      loading="lazy"
                    /></div>
                    <div class='film-data'>
                      <h2 class="title-film">${oneFilmCard.title}</h2>
                      <p>
                         <span class='info-film'>${genreMarkup.join(
                           ', '
                         )} | ${release}</span>
                        <span class ="rating">IMDB:<br>${oneFilmCard.vote_average.toFixed(
                          1
                        )}</span>
                      </p>
                    </div>
                  </a>
              </li>`;
      console.log(markup);
      console.log(oneFilmCard);
      containerListWatchedCard.insertAdjacentHTML('beforeend', markup);
    }
  }
});

onCardQueue();
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

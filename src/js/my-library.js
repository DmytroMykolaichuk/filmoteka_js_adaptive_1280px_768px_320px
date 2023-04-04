import axios from 'axios';
import { click, addDarkClassToHTML } from './theme';

import {
  onClickWatchedBtn,
  onClickQueueBtn,
  onClickClearAll,
} from './buttons-my-library';
import { clickOnFilmCard } from './film-modal';
import { getVideoInfo, playVideoTrailer } from './trailer';
import { showPreloader, hidePreloader } from './loader';

const wraperMyLib = document.querySelector('.empty-wrapper');
const containerListWatchedCard = document.querySelector('.film-list');
const dataWatchedCards = JSON.parse(localStorage.getItem('wathced'));
const dataQueueCards = JSON.parse(localStorage.getItem('queue'));
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '352708f90836dd2b75b209ae082e91df';

// const queueButton = document.getElementById('queue');
hidePreloader();

function statusWraper(nameList) {
  const test = JSON.parse(localStorage.getItem(`${nameList}`));
  // console.log(test);
  if (!localStorage.getItem(`${nameList}`) || test.length < 1) {
    wraperMyLib.style.display = 'flex';
  } else {
    wraperMyLib.style.display = 'none';
  }
}

async function getWatchedFilms(page) {
  try {
    showPreloader();
    const { data } = await axios.get(
      `${BASE_URL}${page}?api_key=${API_KEY}&language=en-US`
    );
    hidePreloader();
    return data;
  } catch (error) {
    console.log(error);
  }
}

onCardWatch();

export async function onCardWatch() {
  containerListWatchedCard.innerHTML = '';
  statusWraper('wathced');

  for (const idFilm of dataWatchedCards) {
    let markup = '';
    const oneFilmCard = await getWatchedFilms(idFilm);
    let release = Number.parseInt(
      oneFilmCard.release_date || oneFilmCard.first_air_date
    );
    const mainPoster = `https://image.tmdb.org/t/p/w300${oneFilmCard.poster_path}`;
    const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
    let genreMarkup = [];

    oneFilmCard.genres.forEach(element => {
      genreMarkup.push(element.name);
    });

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

    containerListWatchedCard.insertAdjacentHTML('beforeend', markup);
  }
}

export async function onCardQueue() {
  showPreloader();
  containerListWatchedCard.innerHTML = '';
  statusWraper('queue');

  for (const idFilm of dataQueueCards) {
    let markup = '';
    const oneFilmCard = await getWatchedFilms(idFilm);
    let release = Number.parseInt(
      oneFilmCard.release_date || oneFilmCard.first_air_date
    );
    const mainPoster = `https://image.tmdb.org/t/p/w300${oneFilmCard.poster_path}`;
    const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
    let genreMarkup = [];

    oneFilmCard.genres.forEach(element => {
      genreMarkup.push(element.name);
    });

    markup += ` <li class ="film-item">
              <a id='${oneFilmCard.id}' class="film-card" href="#">
                <div class='thumb'>
                <img
                    class = 'poster'
                    src= "${oneFilmCard.poster_path ? mainPoster : posterFake}"
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

    containerListWatchedCard.insertAdjacentHTML('beforeend', markup);
  }
  hidePreloader();
}

// Scroll to top
const button = document.querySelector('.btn-scroll');

const displayButton = () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });
};

const scrollToTop = () => {
  button.addEventListener('click', () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
};

displayButton();
scrollToTop();
addDarkClassToHTML();

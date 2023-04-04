import axios from 'axios';
import {onClickWatchedBtn, onClickQueueBtn, onClickClearAll } from './buttons-my-library';
import { genres } from './genres';
import { clickOnFilmCard } from './film-modal';
import { getVideoInfo } from './trailer';
import { showPreloader, hidePreloader } from './loader';

const wraperMyLib = document.querySelector('.empty-wrapper')
const containerListWatchedCard = document.querySelector('.film-list');
const dataWatchedCards = JSON.parse(localStorage.getItem('wathced'));
const dataQueueCards = JSON.parse(localStorage.getItem('queue'));
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '352708f90836dd2b75b209ae082e91df';

// const queueButton = document.getElementById('queue');
hidePreloader();
function wraper(){
  const test = JSON.parse(localStorage.getItem('wathced'))
  console.log(test)
  if( localStorage.getItem('wathced') || test[0]){
    wraperMyLib.style.display='none'
    onCardWatch();
    return
  }
  wraperMyLib.style.display='flex'
}
wraper();

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

export async function onCardWatch() {
  containerListWatchedCard.innerHTML = '';
  let markup = '';
  for (const idFilm of dataWatchedCards) {
    const oneFilmCard = await getWatchedFilms(idFilm);
    let release = Number.parseInt(oneFilmCard.release_date || oneFilmCard.first_air_date);
    const mainPoster = `https://image.tmdb.org/t/p/w300${oneFilmCard.poster_path}`;
    const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
    let genreMarkup = [];

    oneFilmCard.genres.forEach(element => {
      genreMarkup.push(element.name)
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
                        <span class='info-film'>${genreMarkup.join(', ')} | ${release}</span>
                        <span class ="rating">IMDB:<br>${oneFilmCard.vote_average.toFixed(1)}</span>
                      </p>
                    </div>
                  </a>
              </li>`;
    containerListWatchedCard.insertAdjacentHTML('beforeend', markup);
  }
}


export async function onCardQueue() {
  containerListWatchedCard.innerHTML = '';
  let markup = '';
  for (const idFilm of dataQueueCards) {
    const oneFilmCard = await getWatchedFilms(idFilm);
    let release = Number.parseInt(oneFilmCard.release_date || oneFilmCard.first_air_date);
    const mainPoster = `https://image.tmdb.org/t/p/w300${oneFilmCard.poster_path}`;
    const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
    let genreMarkup = [];
    oneFilmCard.genres.forEach(element => {
      genreMarkup.push(element.name)
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
                      <span class='info-film'>${genreMarkup.join(', ')} | ${release}</span>
                      <span class ="rating">IMDB:<br>${oneFilmCard.vote_average.toFixed(1)}</span>
                    </p>
                  </div>
                </a>
            </li>`;
    containerListWatchedCard.insertAdjacentHTML('beforeend', markup);
  }
}
// onCardQueue();


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




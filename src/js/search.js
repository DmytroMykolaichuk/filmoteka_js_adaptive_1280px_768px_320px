import axios from 'axios';
import { renderFilmList } from './renderFilmList';
import { addItem } from '../index';
const gallery = document.querySelector('.film-list');
const searchFormEl = document.querySelector('.header__movie-search-form');
const inputEl = document.querySelector('.movie-search-form');
const errorEl = document.querySelector('.search-error-message');

const KEY = '352708f90836dd2b75b209ae082e91df';
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});
let name;
let page = 1;
let pages;



export async function getSearchMovie() {
  try {
    const { data } = await instance.get(
      `search/movie?api_key=${KEY}&language=en-US&query=${name}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

searchFormEl.addEventListener('submit', onSearch);

export function onSearch(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  name = inputEl.value.trim();
  page = 1;
  if (name !== '') {
    errorEl.classList.add('visually-hidden');
    page = 1;
    addSearchedMovie();
  } else {
    errorEl.classList.remove('visually-hidden');
    return console.log(
      'Sorry, there are no films matching your search query. Please try again.'
    );
  }
}

export async function addSearchedMovie() {
    const searchResult = await getSearchMovie();
    if (searchResult.results.length !== 0) {
      errorEl.classList.add('visually-hidden');
      pages = searchResult.total_pages;
      renderFilmList(searchResult);
      console.log(searchResult);
      console.log(pages);
    } else {
      errorEl.classList.remove('visually-hidden');
      addItem();
      return console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }

  errorEl.style.color = 'red';
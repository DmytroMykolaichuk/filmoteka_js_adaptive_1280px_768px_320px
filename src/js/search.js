// src/js/search.js
import axios from 'axios';
import { renderFilmList } from './renderFilmList';
import { addItem } from '../index';
import { initSearchPagination, updateSearchFilmList } from './pagination';
import { ITEMS_PER_PAGE } from '..';

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

export let isSearchActive = false;

export async function getSearchMovie(name, page) {
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
    isSearchActive = true;
    addSearchedMovie(name, page).then(() => {
      isSearchActive = false;
    });
  } else {
    errorEl.classList.remove('visually-hidden');
    return console.log(
      'Sorry, there are no films matching your search query. Please try again.'
    );
  }
}

export async function addSearchedMovie(name, page) {
  const searchResult = await getSearchMovie(name, page);
  if (searchResult.results.length !== 0) {
    errorEl.classList.add('visually-hidden');
    const totalPages = searchResult.total_pages;
    const totalItems = totalPages * 20; // 20 results per page
    initSearchPagination(totalItems, name);

    // Отримуємо перші ITEMS_PER_PAGE елементів
    const limitedResults = searchResult.results.slice(0, ITEMS_PER_PAGE);
    renderFilmList({ ...searchResult, results: limitedResults });

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

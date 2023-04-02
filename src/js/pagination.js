// src/js/pagination.js
import 'tui-pagination/dist/tui-pagination.css';
import Pagination from 'tui-pagination';
import { getPopularFilms } from './api';
import { renderFilmList } from './renderFilmList';
import { ITEMS_PER_PAGE, isSearchActive, state } from '..';

const visiblePages = 5;

const paginationElement = document.getElementById('pagination');

export function initPagination(totalItems) {
  const paginationOptions = {
    totalItems,
    itemsPerPage: ITEMS_PER_PAGE,
    visiblePages,
    centerAlign: true,
  };

  const pagination = new Pagination(paginationElement, paginationOptions);
  pagination.on('afterMove', async event => {
    const currentPage = event.page;
    if (!isSearchActive) {
      const data = await getPopularFilms(currentPage);
      updateFilmList(data);
    }
  });
}

export async function updateFilmList(data) {
  const filmListElement = document.querySelector('.film-list');
  filmListElement.innerHTML = '';
  // Отримуємо перші ITEMS_PER_PAGE елементів
  const limitedResults = data.results.slice(0, ITEMS_PER_PAGE);

  renderFilmList({ ...data, results: limitedResults });
}

export async function updateSearchFilmList(name, page) {
  const filmListElement = document.querySelector('.film-list');
  filmListElement.innerHTML = '';
  const searchResult = await getSearchMovie(name, page);
  // Отримуємо перші ITEMS_PER_PAGE елементів
  const limitedResults = searchResult.results.slice(0, ITEMS_PER_PAGE);
  renderFilmList({ ...searchResult, results: limitedResults });
}

export function initSearchPagination(totalItems, name) {
  const paginationOptions = {
    totalItems,
    itemsPerPage: ITEMS_PER_PAGE,
    visiblePages,
    centerAlign: true,
  };

  const pagination = new Pagination(paginationElement, paginationOptions);
  pagination.on('afterMove', async event => {
    const currentPage = event.page;
    if (isSearchActive) {
      await updateSearchFilmList(name, currentPage);
    }
  });
}

// src/js/pagination.js
import 'tui-pagination/dist/tui-pagination.css';
import Pagination from 'tui-pagination';
import { getPopularFilms } from './api';
import { renderFilmList } from './renderFilmList';
import { getSearchMovie } from './search';

let isSearchActive = false;
const visiblePages = 5;

const paginationElement = document.getElementById('pagination');

export async function updatePaginationButtons(totalItems, currentPage) {
  // Дочекайтеся завантаження сторінки перед тим, як виконати querySelector
  await new Promise(resolve => setTimeout(resolve, 0));

  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxTotalPages = 20;
  const limitedTotalPages = Math.min(totalPages, maxTotalPages);
  const isFirstPageBlock = currentPage <= 3;
  const isLastPageBlock = currentPage >= limitedTotalPages - 2;
  const isFiveOrLessPages = limitedTotalPages <= 5;
  const firstPageButton = document.querySelector('.tui-first span');
  const lastPageButton = document.querySelector('.tui-last span');
  const prevPageButton = document.querySelector('.tui-prev');
  const nextPageButton = document.querySelector('.tui-next');
  const selectedPageElement = document.querySelector('.tui-is-selected');

  if (firstPageButton) {
    firstPageButton.textContent = '1';
    firstPageButton.parentElement.style.display =
      isFirstPageBlock || isFiveOrLessPages ? 'none' : 'inline-block';
  }

  if (lastPageButton) {
    lastPageButton.textContent = limitedTotalPages;
    lastPageButton.parentElement.style.display =
      isLastPageBlock || isFiveOrLessPages ? 'none' : 'inline-block';
  }

  if (prevPageButton) {
    prevPageButton.style.display = currentPage === 1 ? 'none' : 'inline-block';
  }

  if (nextPageButton) {
    nextPageButton.style.display =
      currentPage === limitedTotalPages ? 'none' : 'inline-block';
  }

  if (selectedPageElement) {
    selectedPageElement.style.marginRight =
      currentPage === limitedTotalPages ? '0' : '';
  }
}

export async function initPagination(totalItems) {
  isSearchActive = false;
  const currentPage = 1;
  const maxTotalItems = 400;
  const limitedTotalItems = Math.min(totalItems, maxTotalItems);
  const paginationOptions = {
    totalItems: limitedTotalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    page: currentPage,
    centerAlign: true,
  };

  const pagination = new Pagination(paginationElement, paginationOptions);
  pagination.on('afterMove', async event => {
    const currentPage = event.page;
    if (!isSearchActive) {
      const data = await getPopularFilms(currentPage);
      updateFilmList(data);
    }
    updatePaginationButtons(paginationOptions.totalItems, currentPage);
  });

  setTimeout(async () => {
    await updatePaginationButtons(totalItems, currentPage);
  }, 100);
}

export async function updateFilmList(data) {
  const filmListElement = document.querySelector('.film-list');
  filmListElement.innerHTML = '';

  renderFilmList({ ...data });
}

export async function updateSearchFilmList(name, page) {
  const filmListElement = document.querySelector('.film-list');
  filmListElement.innerHTML = '';
  const searchResult = await getSearchMovie(name, page);
  renderFilmList({ ...searchResult });
}

export async function initSearchPagination(totalItems, name) {
  isSearchActive = true;
  const currentPage = 1;
  const maxTotalItems = 400;
  const limitedTotalItems = Math.min(totalItems, maxTotalItems);
  const paginationOptions = {
    totalItems: limitedTotalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
  };

  const pagination = new Pagination(paginationElement, paginationOptions);
  await updatePaginationButtons(totalItems, currentPage);
  pagination.on('afterMove', async event => {
    const currentPage = event.page;
    if (isSearchActive) {
      await updateSearchFilmList(name, currentPage);
    }
    updatePaginationButtons(paginationOptions.totalItems, currentPage);
  });

  setTimeout(async () => {
    await updatePaginationButtons(totalItems, currentPage);
  }, 100);
}

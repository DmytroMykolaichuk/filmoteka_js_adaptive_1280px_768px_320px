// src/index.js
// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import axios from 'axios';
import { getPopularFilms } from './js/api';
import { renderFilmList } from './js/renderFilmList';
import {
  getSearchMovie,
  onSearch,
  addMovie,
  addSearchedMovie,
} from './js/search';
import { clickOnFilmCard } from './js/film-modal';
import { playVideoTrailer, getVideoInfo } from './js/trailer';
import { onClickInGanre } from './js/choise-ganre';

// import {
//   updateFilmList,
//   updateSearchFilmList,
//   initPagination,
//   initSearchPagination,
// } from './js/pagination';

export const ITEMS_PER_PAGE = 18;
export let searchName = null;

import {
  funcAnimeLogo,
  funcAnimeHeart,
  funcAnimeHaederLib,
} from './js/SVG-animation';

export async function addItem() {
  let data = await getPopularFilms();
  renderFilmList(data);

  // let data = await getPopularFilms();
  // const totalPages = data.total_pages;
  // const totalItems = totalPages * 20; // 20 results per page
  // initPagination(totalItems);
  // Отримуємо перші ITEMS_PER_PAGE елементів
  // const limitedResults = data.results.slice(0, ITEMS_PER_PAGE);
  // renderFilmList({ ...data, results: limitedResults });
}

addItem();

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

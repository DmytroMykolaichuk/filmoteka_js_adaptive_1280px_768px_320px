// src/index.js
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import axios from 'axios';
import { getPopularFilms, fetchGenres } from './js/api';
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
import { openTeamModal } from './js/team-modal';

import {
  updateFilmList,
  updateSearchFilmList,
  initPagination,
  initSearchPagination,
  updatePaginationButtons,
} from './js/pagination';

export let searchName = null;

import {
  funcAnimeLogo,
  funcAnimeHeart,
  funcAnimeHaederLib,
} from './js/SVG-animation';

import { click, addDarkClassToHTML } from './js/theme';

import { showPreloader, hidePreloader } from './js/loader';

export async function addItem() {
  showPreloader();
  const data = await getPopularFilms();
  const totalPages = data.total_pages;
  const totalItems = 400; // 20 results per page
  // const totalItems = totalPages * 20; // 20 results per page
  initPagination(totalItems);
  const genres = await fetchGenres();
  renderFilmList({ ...data }, genres);
  updatePaginationButtons(totalItems);
  hidePreloader();
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
addDarkClassToHTML();

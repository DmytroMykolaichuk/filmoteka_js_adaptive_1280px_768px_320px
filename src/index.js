// src/index.js
import { fetchMoviesByGenre, onClickGenreBtn } from './js/choose-genre';
import { gsap } from 'gsap';
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
// import { onClickInGanre } from './js/choise-ganre';

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

// import { click, addDarkClassToHTML } from './js/theme';

import { showPreloader, hidePreloader } from './js/loader';
import { Timeline } from 'gsap/gsap-core';
import { TimelineMax } from 'gsap/gsap-core';

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
// addDarkClassToHTML();









const animate = gsap.timeline({ paused: true });
const animateBackground = new Timeline({ paused: true });
let toggle = true;

animateBackground
    .to("body", 0.1, { backgroundImage: "none", backgroundColor: "#111" }, 0.2)
    .set(".switch", { boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" })
    .to(".text p", 0.1, { color: "#FFF" }, 0.2);

animate
    .to(".toggle-button", 0.2, { scale: 0.7 }, 0)
    .set(".toggle", { backgroundColor: "#FFF" })
    .set(".circle", { display: "none" })
    .to(".moon-mask", 0.2, { translateY: -10, translateX: 20 }, 0.2)
    .to(".toggle-button", 0.2, { translateY: 49 }, 0.2)
    .to(".toggle-button", 0.2, { scale: 0.9 })

document.getElementsByClassName("switch")[0].addEventListener("click", () => {
    if(toggle){
        animate.restart();
        animateBackground.restart();
    } else {
        animate.reverse();
        animateBackground.reverse();
    }
    toggle = !toggle;
});
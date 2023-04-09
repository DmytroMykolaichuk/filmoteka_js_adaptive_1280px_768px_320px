import { gsap } from 'gsap';
import { onCkickPlagination, OnClickPlaginationBefore } from './js/pagination';
import { getPopularFilms, fetchGenres } from './js/api';
import { renderFilmList } from './js/renderFilmList';
import { clickOnFilmCard } from './js/film-modal';
import { playVideoTrailer, getVideoInfo } from './js/trailer';
import { openTeamModal } from './js/team-modal';
export let searchName = null;
import {
  funcAnimeLogo,
  funcAnimeHeart,
  funcAnimeHaederLib,
} from './js/SVG-animation';
import { addDarkClassToHTML } from './js/theme';
import { showPreloader, hidePreloader } from './js/loader';

export async function addItem() {
  showPreloader();
  const data = await getPopularFilms();
  const genres = await fetchGenres();
  renderFilmList({ ...data }, genres);
  hidePreloader();
}

addItem();

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

// src/index.html
import { getPopularFilms } from './js/api';
import { renderFilmList } from './js/renderFilmList';
import { getSearchMovie, onSearch, addMovie } from './js/search';
import { clickOnFilmCard } from './js/film-modal';
import { playVideoTrailer, getVideoInfo } from './js/trailer';
import { onClickInGanre } from './js/choise-ganre'


export async function addItem() {
  let data = await getPopularFilms();
  renderFilmList(data);
}
addItem();


// Scroll to top
const button = document.querySelector('.btn-scroll');

const displayButton = () => {
  window.addEventListener('scroll', () => {
    console.log(window.scrollY);
  
    if (window.scrollY > 100) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });
};

const scrollToTop = () => {
  button.addEventListener("click", () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    }); 
  });
};

displayButton();
scrollToTop();

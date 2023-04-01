// index.js

import { getPopularFilms } from './js/api';
import { renderFilmList } from './js/renderFilmList';
import { getSearchMovie, onSearch, addMovie } from './js/search';
import { clickOnFilmCard } from './js/film-modal';
import { initPagination } from './js/pagination';

function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export async function addItem(page = 1) {
  let data = await getPopularFilms(page);

  // Отримати контейнер, де ви відображаєте список фільмів
  const filmListContainer = document.querySelector('.container');

  console.log('Before clearing container:', filmListContainer.innerHTML); // Додайте цей рядок

  // Очищення контейнера перед додаванням нових елементів
  clearContainer(filmListContainer);

  console.log('After clearing container:', filmListContainer.innerHTML); // Додайте цей рядок

  renderFilmList(data);
  initPagination(data.total_pages, page);

  console.log('After adding new items:', filmListContainer.innerHTML); // Додайте цей рядок
}

addItem();

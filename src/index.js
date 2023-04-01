import { getPopularFilms } from './js/api';
import { renderFilmList } from './js/renderFilmList';
import {getSearchMovie, onSearch, addMovie } from './js/search';
import { clickOnFilmCard } from './js/film-modal';

export async function addItem() {
  let data = await getPopularFilms();
  renderFilmList(data);
}

addItem();

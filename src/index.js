import { getPopularFilms } from './js/api';
import { renderFilmList } from './js/renderFilmList';

async function addItem() {
  let data = await getPopularFilms();
  renderFilmList(data);
}

addItem();

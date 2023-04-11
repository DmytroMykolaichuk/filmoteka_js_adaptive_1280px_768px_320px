import { getSearchMovie } from './api';
import { renderFilmList } from './renderFilmList';
import { addItem } from '../index';
import { showPreloader, hidePreloader } from './loader';
import { refs } from './refs';

export let searchPagination = false;
export let name;
let page = 1;

export function onSearch(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  name = refs.inputEl.value.trim();
  page = 1;
  if (name !== '') {
    refs.errorEl.classList.add('visually-hidden');
    showPreloader();
    addSearchedMovie(name, page)
      .then(() => {
        hidePreloader();
      })
      .catch(error => {
        hidePreloader();
      });
  } else {
    refs.errorEl.classList.remove('visually-hidden');
    addItem();
    return console.log(
      'Sorry, there are no films matching your search query. Please try again.'
    );
  }
}

export async function addSearchedMovie(name, page) {
  const searchResult = await getSearchMovie(name, page);

  if (searchResult.results.length !== 0) {
    refs.errorEl.classList.add('visually-hidden');
    renderFilmList({ ...searchResult });
    searchPagination = true;
  } else {
    refs.errorEl.classList.remove('visually-hidden');
    page = 1;
    addItem();
    searchPagination = false;
    return;
  }
}

if (refs.searchFormEl) {
  refs.searchFormEl.addEventListener('submit', onSearch);
}

if (refs.inputEl) {
  refs.inputEl.addEventListener('blur', () => {
    refs.errorEl.classList.add('visually-hidden');
  });
}

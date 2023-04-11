import { fetchMoviesByGenre } from './api';
import { renderFilmList } from './renderFilmList';
import { showPreloader, hidePreloader } from './loader';
import { refs } from './refs';

refs.chooseGanresBtn.addEventListener('click', () => {
  refs.genreContainer.classList.toggle('visually-hidden');
});
refs.listGenres.addEventListener('click', onClickGenreBtn);

export let genreId = null;

export async function onClickGenreBtn(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  showPreloader();

  let noActiveBtn = document.querySelector('.active-btn-genre') || null;
  if (noActiveBtn) {
    noActiveBtn.classList.remove('active-btn-genre');
  }
  e.target.classList.add('active-btn-genre');

  genreId = e.target.id;
  const data = await fetchMoviesByGenre(genreId);
  renderFilmList(data);
  hidePreloader();
}

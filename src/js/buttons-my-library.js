import { onCardWatch, onCardQueue } from './my-library';
import { refs } from './refs';

refs.watchedBtn.addEventListener('click', onClickWatchedBtn);
refs.queueBtn.addEventListener('click', onClickQueueBtn);
refs.btnClearAll.addEventListener('click', onClickClearAll);

export function onClickWatchedBtn() {
  if (refs.watchedBtn.classList.contains('current')) {
    return;
  }
  refs.gallery.innerHTML = '';

  refs.queueBtn.classList.toggle('current');
  refs.watchedBtn.classList.toggle('current');

  onCardWatch();
  location.replace(location.href);
}

export function onClickQueueBtn() {
  if (refs.queueBtn.classList.contains('current')) {
    return;
  }
  refs.gallery.innerHTML = '';

  refs.queueBtn.classList.toggle('current');
  refs.watchedBtn.classList.toggle('current');

  onCardQueue();
}

export function onClickClearAll() {
  if (refs.watchedBtn.classList.contains('current')) {
    localStorage.setItem('watched', JSON.stringify([]));
    refs.gallery.innerHTML = '';
    if (localStorage.getItem('theme') === 'dark-theme') {
      refs.darkWrapper.style.display = 'flex';
    } else {
      refs.wraperMyLib.style.display = 'flex';
    }
    return;
  }
  localStorage.setItem('queue', JSON.stringify([]));
  refs.gallery.innerHTML = '';
  if (localStorage.getItem('theme') === 'dark-theme') {
    refs.darkWrapper.style.display = 'flex';
  } else {
    refs.wraperMyLib.style.display = 'flex';
  }
}

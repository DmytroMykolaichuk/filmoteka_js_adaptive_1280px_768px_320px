import { refs } from './refs';

export function showPreloader() {
  refs.preloader.classList.remove('done');
}

export function hidePreloader() {
  refs.preloader.classList.add('done');
}

const preloader = document.getElementById('spinner');

export function showPreloader() {
  preloader.classList.remove('done');
};

export function hidePreloader() {
  preloader.classList.add('done');
};

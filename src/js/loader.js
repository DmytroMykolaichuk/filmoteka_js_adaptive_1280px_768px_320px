export function showPreloader() {
  const preloader = document.getElementById('spinner');
  preloader.classList.remove('done');
};

export function hidePreloader() {
  const preloader = document.getElementById('spinner');
  preloader.classList.add('done');
};

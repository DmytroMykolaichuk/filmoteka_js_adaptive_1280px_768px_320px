// FT-14 За натисканням на кнопку "Watched" показуються переглянуті фільми користувача
// FT-15 За натисканням на кнопку "Queue" показуються фільми додані в чергу користувача
const refs = {
  watched: document.querySelector('.watched'),
  queue: document.querySelector('.queue'),
  watchedContainer: document.querySelector('.watchedContainer'),
};
refs.watched.addEventListener('click', onWatched);
refs.qatched.addEventListener('click', onQatched);

refs.watched.addEventListener('click', onWatched);
refs.queue.addEventListener('click', onQueue);

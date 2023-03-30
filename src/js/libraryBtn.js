// FT-14 За натисканням на кнопку "Watched" показуються переглянуті фільми користувача
// FT-15 За натисканням на кнопку "Queue" показуються фільми додані в чергу користувача
const refs = {
  watched: document.querySelector('.watched'),
  queue: document.querySelector('.queue'),
  watchedContainer: document.querySelector('.watchedContainer'),
};
// refs.watched.addEventListener('click', onWatched);
// refs.queue.addEventListener('click', onQueue);

refs.watched.addEventListener('click', onWatched);
refs.queue.addEventListener('click', onQueue);
function onWatched() {
  // Цей рядок з моєї домашки
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];

  refs.watchedContainer.innerHTML = ''; // тут сумніваюсь чи потрібен цей рядок очищать чи ні???

  watchedMovies.forEach(movie => {
    const movieEl = document.createElement('div'); // цей div має бути картка фільму
    // movieEl.textContent =
    //   movie.title || movie.name || movie.original_title; // ось тут не впевнений чи взагалі так можна робити.
    refs.watchedContainer.appendChild(movieEl);
  });
}

function onQueue() {
  // Отримуємо список фільмів з черги перегляду з localStorage
  const queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];

  // Очищаємо контейнер перед відображенням списку фільмів ???
  // refs.watchedContainer.innerHTML = '';

  // Додаємо кожен фільм зі списку до контейнера
  queueMovies.forEach(movie => {
    const movieElement = document.createElement('div'); // цей div має бути картка фільму ??
    movieElement.textContent = movie.title; // ось тут не впевнений чи title чи може якось за ID
    refs.watchedContainer.appendChild(movieElement); // тут теж сумніваюсь
  });
}

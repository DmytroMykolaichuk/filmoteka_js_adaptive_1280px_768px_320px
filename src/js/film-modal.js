// src/js/film-modal.js
import axios from 'axios';
import { genres } from './genres';
import { getVideoInfo } from './trailer';
import { showPreloader, hidePreloader } from './loader';
// import { onWathced, onQueue } from './button-modal';

const filmList = document.querySelector('.film-list');
filmList.addEventListener('click', clickOnFilmCard);

const backdrop = document.querySelector('.overlay');

const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');

const body = document.querySelector('body');

let idCard = '';
let markup = '';

export async function clickOnFilmCard(event) {
  event.preventDefault();
  if (event.target.nodeName === 'UL') return;
  idCard = event.target.closest('.film-card').id;
  showPreloader();

  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${idCard}?api_key=352708f90836dd2b75b209ae082e91df&language=en-US&external_source=imdb_id`
  );
  hidePreloader();
  const modalCard = data.data;

  const mainPoster = `https://image.tmdb.org/t/p/w300${modalCard.poster_path}`;
  const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;

  const styleBtn = {
    textWatched: 'Add to watched',
    textQueue: 'Add to queue',
    classWatched: 'add-to-watched-Btn click-watche btn__watch btn',
    classQueue: 'add-to-queue-Btn click-queue btn__queue btn',
  };

  function statusBtn() {
    const dataWatched = localStorage.getItem('wathced');
    const dataQueue = localStorage.getItem('queue');
    if (!dataWatched || !dataQueue) {
      return;
    }
    const oldWatchedList = JSON.parse(dataWatched);
    const oldQueueList = JSON.parse(dataQueue);
    if (oldWatchedList.includes(idCard)) {
      styleBtn.textWatched = 'remove';
      styleBtn.classWatched =
        'add-to-watched-Btn click-watche btn__watch btn done-watched';
    }
    if (oldQueueList.includes(idCard)) {
      styleBtn.textQueue = 'remove';
      styleBtn.classQueue =
        'add-to-watched-Btn click-watche btn__watch btn done-queue';
    }
  }
  statusBtn();

  markup = `<img src= "${modalCard.poster_path ? mainPoster : posterFake}"
            alt="${
              modalCard.title || modalCard.original_title || modalCard.name
            }" loading="lazy" class="movie-image" />
    <div class="modal-description">
        <h2 class="modal-title">${
          modalCard.title || modalCard.original_title || modalCard.name
        }</h2>
            <div class="film-description">
                <p>
                    <span class="film-property-label">Vote / Votes</span>
                    <span class="film-property-value"
                        ><span class="film-property-bgVote">${modalCard.vote_average.toFixed(
                          1
                        )}</span> /
                        <span class="film-property-bgVotes"> ${
                          modalCard.vote_count
                        }</span></span
                    >
                </p>
                <p>
                    <span class="film-property-label">Popularity</span>
                    <span class="film-property-value">${modalCard.popularity.toFixed(
                      1
                    )}</span>
                </p>
                <p>
                    <span class="film-property-label">Original Title</span>
                    <span class="film-property-value">${
                      modalCard.title ||
                      modalCard.original_title ||
                      modalCard.name
                    }</span>
                </p>
                <p>
                    <span class="film-property-label">Genre</span>
                    <span class="film-property-value">${modalCard.genres
                      .map(genre => genre.name)
                      .join(', ')}</span>
                </p>
            </div>
            <div class="movie-description">
                <p class="mov-desc-title">About</p>
                <p class="mov-desc-text">${modalCard.overview}</p>
            </div>
            <div class="modal-Btn">
            <button type="button" class="trailer-Btn btn__queue btn" data-id=${
              modalCard.id
            }>trailer</button>    
            <button type="button" class="${
              styleBtn.classWatched
            } add-to-watched-Btn click-watche btn__watch btn" data-id=${
    modalCard.id
  }>${styleBtn.textWatched}</button>
                <button type="button" class="${
                  styleBtn.classQueue
                } add-to-queue-Btn click-queue btn__queue btn" data-id=${
    modalCard.id
  }>${styleBtn.textQueue}</button>
                
            </div>
            
    </div>`;

  // backdrop.classList.remove('is-hidden');
  // modal.classList.add('active');

  modal.removeAttribute('hidden', '');
  window.addEventListener('keydown', pressEscapeKey);

  body.classList.toggle('no-scroll');
  backdrop.classList.toggle('is-hidden');

  modalBody.innerHTML = '';
  modalBody.insertAdjacentHTML('beforeend', markup);

  getVideoInfo(idCard).catch(() => {
    const trailerMovieBtn = document.querySelector('.trailer-Btn');
    trailerMovieBtn.classList.add('trailer-btn-none');
  });

  const btnWatched = document.querySelector('.click-watche');
  const btnQueue = document.querySelector('.click-queue');

  btnQueue.addEventListener('click', onQueue);
  btnWatched.addEventListener('click', onWathced);

  function onQueue() {
    const dataQueue = localStorage.getItem('queue');
    if (!dataQueue) {
      const arrQueue = [];
      arrQueue.push(idCard);
      localStorage.setItem('queue', JSON.stringify(arrQueue));
      btnQueue.classList.add('done-queue');
      btnQueue.textContent = 'remove';
      btnQueue.blur();
      return;
    }
    let oldQueueList = JSON.parse(dataQueue);
    if (oldQueueList.includes(idCard)) {
      oldQueueList = oldQueueList.filter(el => el !== idCard);
      localStorage.setItem('queue', JSON.stringify(oldQueueList));
      btnQueue.classList.remove('done-queue');
      btnQueue.textContent = 'Add to queue';
      btnQueue.blur();
      return;
    }
    const newQueueList = oldQueueList;
    newQueueList.push(idCard);
    localStorage.setItem('queue', JSON.stringify(newQueueList));
    btnQueue.classList.add('done-queue');
    btnQueue.textContent = 'remove';
    btnQueue.blur();
  }

  function onWathced() {
    const dataWatched = localStorage.getItem('wathced');
    if (!dataWatched) {
      const arrWathced = [];
      arrWathced.push(idCard);
      localStorage.setItem('wathced', JSON.stringify(arrWathced));
      btnWatched.classList.add('done-watched');
      btnWatched.textContent = 'remove';
      btnWatched.blur();
      return;
    }
    let oldWathcedList = JSON.parse(dataWatched);
    if (oldWathcedList.includes(idCard)) {
      oldWathcedList = oldWathcedList.filter(el => el !== idCard);
      localStorage.setItem('wathced', JSON.stringify(oldWathcedList));
      btnWatched.classList.remove('done-watched');
      btnWatched.textContent = 'Add to watched';
      btnWatched.blur();
      return;
    }
    const newWathcedList = oldWathcedList;
    newWathcedList.push(idCard);
    localStorage.setItem('wathced', JSON.stringify(newWathcedList));
    btnWatched.classList.add('done-watched');
    btnWatched.textContent = 'remove';
    btnWatched.blur();
  }
}

const closeModalOnClick = document.querySelector('.js-modal-close');
closeModalOnClick.addEventListener('click', closeModal);

window.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

function closeModal() {
  // Скрыть модальное окно
  closeModalOnClick.setAttribute('hidden', '');

  body.classList.toggle('no-scroll');
  backdrop.classList.toggle('is-hidden');
  // Удалить обработчики событий
  window.removeEventListener('click', clickOutsideModal);
  window.removeEventListener('keydown', pressEscapeKey);
}

// Функция для проверки, находится ли щелчок за пределами модального окна
function clickOutsideModal(event) {
  if (event.target === modal) {
    closeModal();
  }
}

// Функция для проверки, была ли нажата клавиша ESC
function pressEscapeKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// const btn = document.querySelectorAll('.btn');
// btn.forEach(el => {
//   el.addEventListener('mouseout', () => btn.blur());
// })

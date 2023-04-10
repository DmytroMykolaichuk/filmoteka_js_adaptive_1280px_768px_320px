import { filmCard, getVideoInfo } from './api';
import { showPreloader, hidePreloader } from './loader';
import { refs } from './refs';

refs.gallery.addEventListener('click', stuffOnFilmCard);
refs.closeModalOnClick.addEventListener('click', closeModal);

let idCard = '';
let markup = '';
export async function stuffOnFilmCard(event) {
  event.preventDefault();
  if (event.target.nodeName === 'UL') return;
  idCard = event.target.closest('.film-card').id;
  showPreloader();

  const data = await filmCard(idCard);
  hidePreloader();
  const modalCard = data.data;

  const mainPoster = `https://image.tmdb.org/t/p/w300${modalCard.poster_path}`;
  const posterFake = `https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg`;

  const styleBtn = {
    textWatched: 'Add to watched',
    textQueue: 'Add to queue',
    classWatched: 'add-to-watched-Btn click-watche btn__watch btn',
    classQueue: 'add-to-queue-Btn click-queue btn__queue btn',
  };

  function statusBtn() {
    const dataWatched = localStorage.getItem('watched');
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

  refs.modalBody.innerHTML = '';
  refs.modalBody.insertAdjacentHTML('beforeend', markup);

  refs.modal.removeAttribute('hidden', '');
  window.addEventListener('keydown', pressEscapeKey);

  refs.body.classList.toggle('no-scroll');
  refs.backdropFilmCard.classList.toggle('is-hidden');

  getVideoInfo(idCard).catch(() => {
    hidePreloader();
    refs.trailerMovieBtn.classList.add('trailer-btn-none');
    refs.preloader.classList.add('.done');
  });

  const btnWatched = document.querySelector('.click-watche');
  const btnQueue = document.querySelector('.click-queue');

  btnQueue.addEventListener('click', onQueue);
  btnWatched.addEventListener('click', onWatched);

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

  function onWatched() {
    const dataWatched = localStorage.getItem('watched');
    if (!dataWatched) {
      const arrWatched = [];
      arrWatched.push(idCard);
      localStorage.setItem('watched', JSON.stringify(arrWatched));
      btnWatched.classList.add('done-watched');
      btnWatched.textContent = 'remove';
      btnWatched.blur();
      return;
    }
    let oldWatchedList = JSON.parse(dataWatched);
    if (oldWatchedList.includes(idCard)) {
      oldWatchedList = oldWatchedList.filter(el => el !== idCard);
      localStorage.setItem('watched', JSON.stringify(oldWatchedList));
      btnWatched.classList.remove('done-watched');
      btnWatched.textContent = 'Add to watched';
      btnWatched.blur();
      return;
    }
    const newWatchedList = oldWatchedList;
    newWatchedList.push(idCard);
    localStorage.setItem('watched', JSON.stringify(newWatchedList));
    btnWatched.classList.add('done-watched');
    btnWatched.textContent = 'remove';
    btnWatched.blur();
  }
}

window.addEventListener('click', event => {
  hidePreloader();
  if (event.target === refs.backdropFilmCard) {
    closeModal();
  }
});

function closeModal() {
  refs.closeModalOnClick.setAttribute('hidden', '');

  refs.body.classList.toggle('no-scroll');
  refs.backdropFilmCard.classList.toggle('is-hidden');
  window.removeEventListener('click', clickOutsideModal);
  window.removeEventListener('keydown', pressEscapeKey);
}

function clickOutsideModal(event) {
  if (event.target === refs.modal) {
    closeModal();
  }
}

function pressEscapeKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// src/js/film-modal.js
import axios from 'axios';
import { genres } from './genres';
import { getVideoInfo } from './trailer';
import { showPreloader, hidePreloader } from './loader';

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
            <button type="button" class="add-to-watched-Btn btn__watch btn" data-id=${
              modalCard.id
            }>Add to watched</button>
                <button type="button" class="add-to-queue-Btn btn__queue btn" data-id=${
                  modalCard.id
                }>Add to queue</button>
                
            </div>
            
    </div>`;

  backdrop.classList.add('active');
  modal.classList.add('active');

  modal.removeAttribute('hidden', '');
  window.addEventListener('keydown', pressEscapeKey);

  body.classList.toggle('no-scroll');

  modalBody.innerHTML = '';
  modalBody.insertAdjacentHTML('beforeend', markup);

  getVideoInfo(idCard).catch(() => {
    const trailerMovieBtn = document.querySelector('.trailer-Btn');
    trailerMovieBtn.classList.add('trailer-btn-none');
  });
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
  modal.setAttribute('hidden', '');
  backdrop.classList.remove('active');
  modal.classList.remove('active');

  body.classList.toggle('no-scroll');
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

const btn = document.querySelectorAll('.btn');
btn.forEach(el => {
  el.addEventListener('mouseout', () => btn.blur());
});

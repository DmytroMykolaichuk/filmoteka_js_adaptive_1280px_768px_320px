import axios from 'axios';
import { genres } from './genres';

const filmList = document.querySelector('.film-list');
filmList.addEventListener('click', clickOnFilmCard);
const backdrop = document.querySelector('.modal-container');

let idCard = '';
let markup = '';

export async function clickOnFilmCard(event) {
  event.preventDefault();
  if (event.target.nodeName === 'UL') return;
  idCard = event.target.closest('.film-card').id;
  //   console.log(idCard);
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${idCard}?api_key=352708f90836dd2b75b209ae082e91df&language=en-US&external_source=imdb_id`
  );
  const modalCard = data.data;
  // console.log(data.data);
  // console.log(modalCard.genres.id);

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
                    <span class="film-property-value">${
                      modalCard.genres.id
                    }</span>
                </p>
            </div>
            <div class="movie-description">
                <p class="mov-desc-title">About</p>
                <p class="mov-desc-text">${modalCard.overview}</p>
            </div>
            <div class="modal-Btn">
            <button type="button" class="trailer-Btn btn__queue" data-id=${
              modalCard.id
            }>trailer</button>    
            <button type="button" class="add-to-watched-Btn btn__watch" data-id=${
              modalCard.id
            }>Add to watched</button>
                <button type="button" class="add-to-queue-Btn btn__queue" data-id=${
                  modalCard.id
                }>Add to queue</button>
                
            </div>
            
    </div>`;

  backdrop.style.display = 'block';
  const modal = document.querySelector('.modal-body');

  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', markup);
}

const closeModal1 = document.querySelector('.modal-close');
closeModal1.addEventListener('click', () => (backdrop.style.display = 'none'));

function closeModal() {
  // Скрыть модальное окно
  closeModal1.setAttribute('hidden', '');
  // Удалить обработчики событий
  document.removeEventListener('click', clickOutsideModal);
  document.removeEventListener('keydown', pressEscapeKey);
}

// Функция для проверки, находится ли щелчок за пределами модального окна
function clickOutsideModal(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// Функция для проверки, была ли нажата клавиша ESC
function pressEscapeKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

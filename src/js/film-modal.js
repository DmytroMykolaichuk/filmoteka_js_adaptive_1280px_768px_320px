import axios from 'axios';

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
  //   console.log(data.data);

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
                        ><span class="film-property-bgVote">${
                          modalCard.vote_average
                        }</span> /
                        <span class="film-property-bgVotes"> ${
                          modalCard.vote_count
                        }</span></span
                    >
                </p>
                <p>
                    <span class="film-property-label">Popularity</span>
                    <span class="film-property-value">${
                      modalCard.popularity
                    }</span>
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
                      modalCard.filmGenres
                    }</span>
                </p>
            </div>
            <div class="movie-description">
                <p class="mov-desc-title">About</p>
                <p class="mov-desc-text">${modalCard.overview}</p>
            </div>
            <div class="modal-Btn">
                <button type="button" class="add-to-watched-Btn btn__watch" data-id=${
                  modalCard.id
                }>Add to watched</button>
                <button type="button" class="add-to-queue-Btn btn__queue" data-id=${
                  modalCard.id
                }>Add to queue</button>
            </div>
            <div class="film__trailer">
                <a class="btn btn-large btn-primary film__trailer__btn"  data-id =${idCard} href="#">
                watch trailer
                </a>
            </div>
    </div>`;

  backdrop.style.display = 'block';
  const modal = document.querySelector('.modal-body');
  console.log(modal);
  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', markup);
}

const closeModal = document.querySelector('.modal-close');
closeModal.addEventListener('click', () => (backdrop.style.display = 'none'));

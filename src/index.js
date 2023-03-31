import { getPopularFilms } from './js/api';
import { renderFilmList } from './js/renderFilmList';
import axios from 'axios';

async function addItem() {
  let data = await getPopularFilms();
  renderFilmList(data);
}

addItem();


const filmList = document.querySelector('.film-list')
// console.log(filmList)
filmList.addEventListener('click', onClick)
let idCard =''
let markup = ''
async function onClick(event) {
  event.preventDefault()
  if (event.target.nodeName === 'UL') return;
  idCard = event.target.closest('.film-card').id;
  // console.log(idCard)
  const data =  await axios.get(`https://api.themoviedb.org/3/movie/${idCard}?api_key=352708f90836dd2b75b209ae082e91df&language=en-US&external_source=imdb_id`)
  const modalCard = data.data
  console.log(data.data)
  const mainPoster = `https://image.tmdb.org/t/p/w300${modalCard.poster_path}`;
  const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
  
  markup = `<img
  src="${modalCard.poster_path ? mainPoster : posterFake}"
  alt="${modalCard.title || modalCard.original_title || modalCard.name}"
  loading="lazy"
  class="movie-image"
/>
<div class="modal-description">
  <h2 class="modal-title">A FISTFUL OF LEAD</h2>
  <div class="film-description">
    <p>
      <span class="film-property-label">Vote / Votes</span>
      <span class="film-property-value"
        ><span class="film-property-bgVote">7.3</span> /
        <span class="film-property-bgVotes"> 1260</span></span
      >
    </p>
    <p>
      <span class="film-property-label">Popularity</span>
      <span class="film-property-value">100.2</span>
    </p>
    <p>
      <span class="film-property-label">Original Title</span>
      <span class="film-property-value">A FISTFUL OF LEAD</span>
    </p>
    <p>
      <span class="film-property-label">Genre</span>
      <span class="film-property-value">Western</span>
    </p>
  </div>
  <div class="movie-description">
    <p class="mov-desc-title">About</p>
    <p class="mov-desc-text">
      Four of the West’s most infamous outlaws assemble to steal a huge
      stash of gold from the most corrupt settlement of the gold rush
      towns. But not all goes to plan one is killed and the other three
      escapes with bags of gold hide out in the abandoned gold mine where
      they happen across another gang of three – who themselves were
      planning to hit the very same bank! As tensions rise, things go from
      bad to worse as they realise the bags of gold are filled with
      lead... they’ve been double crossed – but by who and how?
    </p>
  </div>
  <div class="modal-Btn">
    <button
      type="button"
      class="add-to-watched-Btn btn__watch"
      data-id="${modalCard.id}"
    >
      Add to watched
    </button>
    <button
      type="button"
      class="add-to-queue-Btn btn__queue"
      data-id="${modalCard.id}"
    >
      Add to queue
    </button>
  </div>
  <div class="film__trailer">
    <a class="btn btn-large btn-primary film__trailer__btn" href="#">
      <i class="fa-brands fa-youtube fa-3x"></i>
      <p class="film__trailer__text">watch trailer</p>
    </a>
  </div>
</div>`
const modal= document.querySelector('.modal-body')
// console.log(modal)
modal.innerHTML=''
modal.insertAdjacentHTML('beforeend',markup)
}


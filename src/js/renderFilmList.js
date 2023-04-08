// src/js/renderFilmList.js
import { fetchGenres } from './api';

const gallery = document.querySelector('.film-list');

export async function renderFilmList(data) {
  // console.log(data);
  let markup = '';
  const genres = await fetchGenres();
  data.results
    .map(el => {
      let release = Number.parseInt(el.release_date || el.first_air_date);
      const mainPoster = `https://image.tmdb.org/t/p/w300${el.poster_path}`;
      const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;

      const genreMarkup = el.genre_ids
        .map(genreId => {
          const genre = genres[genreId];
          return genre ? genre : '';
        })
        .filter(Boolean);

      markup += ` <li class ="film-item">
        <a id='${el.id}' class="film-card" href="#">
          <div class='thumb'>
          <img
              class = 'poster'
              src= "${el.poster_path ? mainPoster : posterFake}"
              alt="${el.title}"
              loading="lazy"
            /></div>
            <div class='film-data'>
              <h2 class="title-film">${el.title || el.name}</h2>
              <p>
                <span class='info-film'>${genreMarkup.join(', ')} | ${release}</span> 
                <span class ="rating">IMDB:<br>${el.vote_average.toFixed(1)}</span>
              </p>
            </div>
          </a>
      </li>`;
    })
    .join('');
  gallery.innerHTML=''
  gallery.insertAdjacentHTML('beforeend', markup);
}

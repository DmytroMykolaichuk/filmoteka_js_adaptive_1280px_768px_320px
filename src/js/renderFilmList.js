// src/js/renderFilmList.js
import { fetchGenres } from './api';
import { refs } from './refs';

export async function renderFilmList(data) {
  let markup = '';
  const genres = await fetchGenres();
  data.results
    .map(el => {
      const {
        release_date,
        first_air_date,
        poster_path,
        genre_ids,
        id,
        title,
        name,
        vote_average,
      } = el;
      let release = Number.parseInt(release_date || first_air_date);
      const mainPoster = `https://image.tmdb.org/t/p/w300${poster_path}`;
      const posterFake = `https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg`;

      const genreMarkup = genre_ids
        .map(genreId => {
          const genre = genres.find(genre => genre.id === genreId);
          return genre ? genre.name : '';
        })
        .filter(Boolean);

      markup += ` <li class ="film-item">
        <a id='${id}' class="film-card" href="#">
          <div class='thumb'>
          <img
              class = 'poster'
              src= "${poster_path ? mainPoster : posterFake}"
              alt="${title}"
              loading="lazy"
            /></div>
            <div class='film-data'>
              <h2 class="title-film">${title || name}</h2>
              <p>
                <span class='info-film'>${genreMarkup.join(
                  ', '
                )} | ${release}</span> 
                <span class ="rating">IMDB:<br>${vote_average.toFixed(1)}</span>
              </p>
            </div>
          </a>
      </li>`;
    })
    .join('');
  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

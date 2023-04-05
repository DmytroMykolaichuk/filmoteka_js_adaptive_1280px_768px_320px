import axios from 'axios';
import { fetchGenres } from './api';
import { showPreloader, hidePreloader } from './loader';
import { initSearchPagination, updatePaginationButtons } from './pagination';

const gallery = document.querySelector('.film-list');
const choiceGanre = document.querySelector('.choice-ganre');
const ganreContainer = document.querySelector('.ganre-container');
const totalPagesToLoad = 10;

let allMovies = [];

function initGenrePagination(totalItems, onPageChange) {
  const pagination = document.querySelector('.tui-pagination');
  const options = {
    totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    onPageChange,
  };

  if (pagination) {
    pagination.innerHTML = '';
    new tui.Pagination(pagination, options);
  }
}

async function fetchMoviesByGenre(genreId) {
  allMovies = [];

  for (let page = 1; page <= totalPagesToLoad; page += 1) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=352708f90836dd2b75b209ae082e91df&language=en-US&page=${page}&include_adult=false`
    );

    const movies = response.data.results.filter(movie =>
      movie.genre_ids.includes(+genreId)
    );
    allMovies.push(...movies);
  }
}

function getMoviesByPage(page) {
  const startIndex = (page - 1) * 20;
  const endIndex = startIndex + 20;
  return allMovies.slice(startIndex, endIndex);
}

function renderMovies(movies, genres) {
  let markup = '';

  movies.forEach(movie => {
    const release = Number.parseInt(movie.release_date || movie.first_air_date);
    const mainPoster = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
    const genreMarkup = movie.genre_ids
      .map(genreId => {
        const genre = genres[genreId];
        return genre ? genre : '';
      })
      .filter(Boolean);

    markup += ` <li class ="film-item">
      <a id='${movie.id}' class="film-card" href="#">
        <div class='thumb'>
          <img
            class='poster'
            src='${movie.poster_path ? mainPoster : posterFake}'
            alt='${movie.title}'
            loading='lazy'
          />
        </div>
        <div class='film-data'>
          <h2 class="title-film">${movie.title}</h2>
          <p>
            <span class='info-film'>${genreMarkup.join(
              ', '
            )} | ${release}</span>
            <span class="rating">IMDB:<br>${movie.vote_average.toFixed(
              1
            )}</span>
          </p>
        </div>
      </a>
    </li>`;
  });

  gallery.innerHTML = '';
  gallery.insertAdjacentHTML('beforeend', markup);
}

let currentGenreId = null;

choiceGanre.addEventListener('click', () =>
  ganreContainer.classList.toggle('visually-hidden')
);

ganreContainer.addEventListener('click', onClickInGanre);

export async function onClickInGanre(e) {
  if (e.target.nodeName === 'DIV') return;

  showPreloader();
  const genres = await fetchGenres();
  const genreId = e.target.id;
  currentGenreId = genreId;

  await fetchMoviesByGenre(genreId);
  const movies = getMoviesByPage(1);
  renderMovies(movies, genres);

  const totalItems = allMovies.length;
  initGenrePagination(totalItems, async currentPage => {
    showPreloader();
    const movies = getMoviesByPage(currentPage);
    renderMovies(movies, genres);
    hidePreloader();
    updatePaginationButtons(totalItems, currentPage);
  });

  hidePreloader();
}

// choiceGanre.addEventListener('click', () =>
//   ganreContainer.classList.toggle('visually-hidden')
// );

// ganreContainer.addEventListener('click', onClickInGanre);

// export async function onClickInGanre(e) {
//   if (e.target.nodeName === 'DIV') return;
//   showPreloader();
//   const genres = await fetchGenres();
//   let markup = '';
//   let page = 1;
//   const choiceUser = e.target.id;

//   for (let i = 0; i < 20; i += 1) {
//     const data = await axios.get(
//       `https://api.themoviedb.org/3/movie/popular?api_key=352708f90836dd2b75b209ae082e91df&language=en-US&page=${page}&include_adult=false`
//     );
//     // console.log(data)

//     data.data.results.forEach(el => {
//       page += 1;
//       let release = Number.parseInt(el.release_date || el.first_air_date);
//       const mainPoster = `https://image.tmdb.org/t/p/w300${el.poster_path}`;
//       const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
//       const genreMarkup = el.genre_ids
//         .map(genreId => {
//           const genre = genres[genreId];
//           return genre ? genre : '';
//         })
//         .filter(Boolean);
//       if (el.genre_ids.includes(+choiceUser)) {
//         markup += ` <li class ="film-item">
//       <a id='${el.id}' class="film-card" href="#">
//         <div class='thumb'>
//         <img
//             class = 'poster'
//             src= "${el.poster_path ? mainPoster : posterFake}"
//             alt="${el.title}"
//             loading="lazy"
//           /></div>
//           <div class='film-data'>
//             <h2 class="title-film">${el.title}</h2>
//             <p>
//             <span class='info-film'>${genreMarkup.join(
//               ', '
//             )} | ${release}</span>
//             <span class ="rating">IMDB:<br>${el.vote_average.toFixed(1)}</span>
//             </p>
//         </div>
//       </a>
//     </li>`;
//       }
//     });
//   }

//   gallery.innerHTML = '';

//   gallery.insertAdjacentHTML('beforeend', markup);
//   hidePreloader();
// }

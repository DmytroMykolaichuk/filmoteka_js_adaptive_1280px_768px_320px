const gallery = document.querySelector('.film-list');

let markup = '';

export function renderFilmList(data) {
  console.log(data);

  data.results
    .map(el => {
      let release = Number.parseInt(el.release_date || el.first_air_date);
      const mainPoster = `https://image.tmdb.org/t/p/w300${el.poster_path}`;
      const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
      markup += ` <li class ="film-item">
        <a class="film-card" href="">
          <div>
            <img
              src= "${el.poster_path ? mainPoster : posterFake}"
              alt="${el.title}"
              loading="lazy"
            />
            <div>
              <h2>${el.title}</h2>
              <p>
                <span>${el.genre_ids}</span> 
                <span>| ${release}</span>
                <span>${el.vote_average.toFixed(1)}</span>
              </p>
            </div>
          </div>
        </a>
      </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

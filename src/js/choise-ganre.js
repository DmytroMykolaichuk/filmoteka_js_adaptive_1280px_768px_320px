import axios from "axios";
import { genres } from "./genres";

const gallery = document.querySelector('.film-list');

const choiceGanre = document.querySelector('.choice-ganre')
const ganreContainer = document.querySelector('.ganre-container')
choiceGanre.addEventListener('click',()=> ganreContainer.classList.toggle('visually-hidden'))

ganreContainer.addEventListener('click', onClickInGanre)

export async function onClickInGanre(e){
  if (e.target.nodeName === 'DIV') return;

  let markup = ''
  let page = 1 
  const choiceUser = e.target.id

  for(let i =0; i<20; i+=1){
    const data = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=352708f90836dd2b75b209ae082e91df&language=en-US&page=${page}&include_adult=false`)
      // console.log(data)
  data.data.results.forEach(el=>{
      page += 1
      let release = Number.parseInt(el.release_date || el.first_air_date);
      const mainPoster = `https://image.tmdb.org/t/p/w300${el.poster_path}`;
      const posterFake = `https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg`;
      let genreMarkup = [];
      genres.forEach(genre => {
        if (el.genre_ids.includes(genre.id)) {
          genreMarkup.push(genre.name);
        }
      });
    
      if(el.genre_ids.includes(+choiceUser)){
      markup += ` <li class ="film-item">
      <a id='${el.id}' class="film-card" href="#">
        <div>
        <div class='thumb'>
        <img
            class = 'poster'
            src= "${el.poster_path ? mainPoster : posterFake}"
            alt="${el.title}"
            loading="lazy"
          /></div>
          <div class='film-data'>
            <h2 class="title-film">${el.title}</h2>
            <p>
              <span class='info-film'>${genreMarkup.join(', ')} | ${release}</span> 
              <span class ="rating">${el.vote_average.toFixed(1)}</span>
            </p>
          </div>
        </div>
      </a>
    </li>`;
    }
    
  })
  }
  
  gallery.innerHTML=''
  gallery.insertAdjacentHTML('beforeend', markup)
}
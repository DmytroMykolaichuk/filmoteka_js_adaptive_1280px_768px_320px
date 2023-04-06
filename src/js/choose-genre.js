import axios from "axios";
import { renderFilmList } from "./renderFilmList";
import { showPreloader, hidePreloader} from "./loader";

const chooseGanresBtn = document.querySelector('.choose-genre-btn');
const genreContainer = document.querySelector('.genre-container');
const listGenres = document.querySelector('.list-genre');

chooseGanresBtn.addEventListener('click', () => {genreContainer.classList.toggle('visually-hidden')});
listGenres.addEventListener('click', onClickGenreBtn);


export async function  onClickGenreBtn(e){
    if (e.target.nodeName !== 'BUTTON') return;
    showPreloader();
    
    let noActiveBtn = document.querySelector('.active-btn-genre') || null;
    if(noActiveBtn){
        noActiveBtn.classList.remove('active-btn-genre')
    };
    e.target.classList.add('active-btn-genre');

    const genreId = e.target.id;
    const data = await fetchMoviesByGenre(genreId);
    renderFilmList(data);
    hidePreloader();
};

async function fetchMoviesByGenre(genreId){
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=352708f90836dd2b75b209ae082e91df&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`);
    return response.data;
};   
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import axios from 'axios';
import { renderFilmList } from './renderFilmList';
import { searchPlagination,name } from './search';
import { genreId } from './choose-genre';
const containerPlagination = document.getElementById('pagination');

const options={
  totalItems: 2000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
          '</a>'
      }
};
const pagination = new Pagination('pagination',options) 
// let searchOnHome=true;
// let searchOnSearch=false;
// let serchOnGenre=false;
let currentPage=0;
// let totalItem = 0;

pagination.on('afterMove', onCkickPlagination)
export async function onCkickPlagination(event){
  // console.log(2)
  currentPage = event.page;
  if(searchPlagination){
    const data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=352708f90836dd2b75b209ae082e91df&query=${name}&page=${currentPage}`)
  // console.log(data.data)
    renderFilmList(data.data)
    return
  } else if (genreId){
    const data = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=352708f90836dd2b75b209ae082e91df&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&page=${currentPage}`)
  // console.log(data.data)
    renderFilmList(data.data)
    return
  }else{
    const data = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=352708f90836dd2b75b209ae082e91df&page=${currentPage}`)
    renderFilmList(data.data)
  // console.log(data.data)
  }
};

// pagination.setTotalItems(totalItem)
// pagination.reset(totalItem)

pagination.on('beforeMove',OnClickPlaginationBefore)
export async function OnClickPlaginationBefore(event){
  // console.log(1)
  if(searchPlagination){
    // genreId=null
    const data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=352708f90836dd2b75b209ae082e91df&query=${name}&page=1`)
    const totalItem = data.data.total_results < 2001 ? data.data.total_results : 2000
    pagination.setTotalItems(totalItem)
    return
  }else if (genreId){
    // searchPlagination=false
    const data = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=352708f90836dd2b75b209ae082e91df&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&page=1`)
    const totalItem = data.data.total_results < 2001 ? data.data.total_results : 2000
    pagination.setTotalItems(totalItem)
    return
  } else {
  pagination.setTotalItems(2000)
}
};
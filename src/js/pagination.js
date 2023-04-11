import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { renderFilmList } from './renderFilmList';
import { searchPagination, name } from './search';
import { genreId } from './choose-genre';
import {
  afterForGenreIdPagination,
  afterForSearchPagination,
  afterForPagination,
  beforeForGenreIdPagination,
  beforeForSearchPagination,
} from './api';

const options = {
  totalItems: 2000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
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
      '</a>',
  },
};
const pagination = new Pagination('pagination', options);

let currentPage = 0;

pagination.on('afterMove', onCkickPlagination);
export async function onCkickPlagination(event) {
  currentPage = event.page;
  if (searchPagination) {
    const data = await afterForSearchPagination(name, currentPage);
    renderFilmList(data.data);
    return;
  } else if (genreId) {
    const data = await afterForGenreIdPagination(genreId, currentPage);
    renderFilmList(data.data);
    return;
  } else {
    const data = await afterForPagination(currentPage);
    renderFilmList(data.data);
  }
}

pagination.on('beforeMove', OnClickPlaginationBefore);
export async function OnClickPlaginationBefore(event) {
  if (searchPagination) {
    const data = await beforeForSearchPagination(name);
    const totalItem =
      data.data.total_results < 2001 ? data.data.total_results : 2000;
    pagination.setTotalItems(totalItem);
    return;
  } else if (genreId) {
    const data = await beforeForGenreIdPagination(genreId);
    const totalItem =
      data.data.total_results < 2001 ? data.data.total_results : 2000;
    pagination.setTotalItems(totalItem);
    return;
  } else {
    pagination.setTotalItems(2000);
  }
}

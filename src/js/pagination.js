// js/pagination.js

import tui from 'tui-pagination';
import { addItem } from '../index';

export function initPagination(totalPages, currentPage = 1) {
  const container = document.getElementById('pagination-container');

  if (!container) return;

  const options = {
    totalItems: 500,
    itemsPerPage: 10,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span></a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span></span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span></a>',
    },
  };

  const pagination = new tui(container, options);

  pagination.on('beforeMove', async event => {
    const newPage = event.page;
    if (currentPage !== newPage) {
      currentPage = newPage;
      await addItem(currentPage);
    }
  });
}

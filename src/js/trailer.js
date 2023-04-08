import { getVideoInfo } from './api';
import * as basicLightbox from 'basiclightbox';
import '../css/basicLightbox.min.css';
import { showPreloader, hidePreloader } from './loader';
import { refs } from './refs';

export const playVideoTrailer = refs.modal.addEventListener(
  'click',
  async event => {
    const button = document.querySelector('.trailer-Btn');

    if (event.target.matches('.trailer-Btn')) {
      const movieId = button.dataset.id;
      try {
        const videoKey = await getVideoInfo(movieId);
        if (!videoKey) {
          button.classList.add('trailer-btn-none');
          return;
        }
        const videoHtml = `
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/${videoKey}"
            frameborder="0" 
            allow="autoplay; encrypted-media" 
            allowfullscreen>
          </iframe>
        `;
        const instance = basicLightbox.create(videoHtml);
        instance.show();
        window.addEventListener('keydown', e => {
          if (e.code !== 'Escape') {
            return;
          }
          instance.close();
        });
      } catch (error) {
        console.error('Ошибка получения информации з видео:', error);
      }
    }
  }
);

import * as basicLightbox from 'basiclightbox';
import '../css/basicLightbox.min.css';
import { getVideoInfo } from './api';
import { refs } from './refs';

export const playVideoTrailer = refs.modal.addEventListener('click', event => {
  const button = document.querySelector('.trailer-Btn');

  if (event.target.matches('.trailer-Btn')) {
    const movieId = button.dataset.id;
    getVideoInfo(movieId)
      .catch(error => {
        console.error('Ошибка получения информации з видео:', error);
        throw error;
      })
      .then(videoKey => {
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
        const istance = basicLightbox.create(videoHtml);
        istance.show();
        window.addEventListener('keydown', e => {
          if (e.code !== 'Escape') {
            return;
          }

          istance.close();
        });
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }
});

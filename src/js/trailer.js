import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import '../css/basicLightbox.min.css';

const modal = document.querySelector('.modal-container');

export function getVideoInfo(movieId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=352708f90836dd2b75b209ae082e91df`
    )
    .then(response => {
      const videoKey = response.data.results[0].key;
      return videoKey;
    })
    .catch(error => {
      console.error('Ошибка получения информации з видео:', error);
      throw error;
    });
}

export const playVideoTrailer = modal.addEventListener('click', event => {
  const button = document.querySelector('.trailer-Btn');

  if (event.target.matches('.trailer-Btn')) {
    const movieId = button.dataset.id;
    getVideoInfo(movieId)
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
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }
});

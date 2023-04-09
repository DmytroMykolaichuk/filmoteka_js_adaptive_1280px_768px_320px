import { refs } from './refs';

refs.modalOpenBtn.addEventListener('click', openTeamModal);
refs.closeButton.addEventListener('click', closeModal);

export function openTeamModal(event) {
  event.preventDefault();

  refs.modalFooter.removeAttribute('hidden', '');
  window.addEventListener('keydown', pressEscapeKey);

  refs.body.classList.toggle('no-scroll');
  refs.backdrop.classList.toggle('is-hidden');
}

window.addEventListener('click', event => {
  if (event.target === refs.backdrop) {
    closeModal();
  }
});

function closeModal() {
  // Скрыть модальное окно
  refs.closeButton.setAttribute('hidden', '');

  refs.body.classList.toggle('no-scroll');
  refs.backdrop.classList.toggle('is-hidden');
  // Удалить обработчики событий
  window.removeEventListener('click', clickOutsideModal);
  window.removeEventListener('keydown', pressEscapeKey);
}

// Функция для проверки, находится ли щелчок за пределами модального окна
function clickOutsideModal(event) {
  if (event.target === modalFooter) {
    closeModal();
  }
}

// Функция для проверки, была ли нажата клавиша ESC
function pressEscapeKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}
//-----------------------------------

const modalOpenBtn = document.querySelector('.footer__btn');
modalOpenBtn.addEventListener('click', openTeamModal);

const closeButton = document.querySelector('.js-modal-team-close');
closeButton.addEventListener('click', closeModal);

const modal = document.querySelector('.modal-team');

const backdrop = document.querySelector('.overlay-team-modal');
const body = document.querySelector('body');

export function openTeamModal(event) {
  event.preventDefault();

  modal.removeAttribute('hidden', '');
  window.addEventListener('keydown', pressEscapeKey);

  body.classList.toggle('no-scroll');
  backdrop.classList.toggle('is-hidden');
}

window.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

function closeModal() {
  // Скрыть модальное окно
  closeButton.setAttribute('hidden', '');

  body.classList.toggle('no-scroll');
  backdrop.classList.toggle('is-hidden');
  // Удалить обработчики событий
  window.removeEventListener('click', clickOutsideModal);
  window.removeEventListener('keydown', pressEscapeKey);
}

// Функция для проверки, находится ли щелчок за пределами модального окна
function clickOutsideModal(event) {
  if (event.target === modal) {
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

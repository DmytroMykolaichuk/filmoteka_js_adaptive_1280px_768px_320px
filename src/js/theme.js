export const click = document
  .querySelector('.click-btn')
  .addEventListener('click', event => {
    event.preventDefault();
    console.log('click');
    if (localStorage.getItem('theme') === 'dark-theme') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', 'dark-theme');
    }
    addDarkClassToHTML();
  });

export function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark-theme') {
      document.querySelector('html').classList.add('dark-theme');
      document.querySelector('html').classList.remove('light-theme');
    } else {
      document.querySelector('html').classList.add('light-theme');
      document.querySelector('html').classList.remove('dark-theme');
    }
  } catch (err) {}
}

// const btn = document.querySelector('.click-btn');

// function initialState(themeName) {
//   localStorage.setItem('theme', themeName);
//   document.documentElement.className = themeName;
//   localStorage.setItem('theme', themeName);
// }

// export function toggleTheme() {
//   if (localStorage.getItem('theme') === 'dark-theme') {
//     initialState('light-theme');
//   } else {
//     initialState('dark-theme');
//   }
// }

// export const chooseTheme = btn.addEventListener('click', e => {
//   e.preventDefault();
//   toggleTheme();
//   console.log('click');
// });

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

import { gsap } from 'gsap';
import { Timeline } from 'gsap/gsap-core';

const animate = gsap.timeline({ paused: true });
const animateBackground = new Timeline({ paused: true });
document
  .getElementsByClassName('switch')[0]
  .addEventListener('click', onCkickTumbler);

animateBackground.set('.switch', {
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
});
animate
  .to('.toggle-button', 0.2, { scale: 0.7 }, 0)
  .set('.toggle', { backgroundColor: '#FFF' })
  .set('.circle', { display: 'none' })
  .to('.moon-mask', 0.2, { translateY: -10, translateX: 20 }, 0.2)
  .to('.toggle-button', 0.2, { translateY: 49 }, 0.2)
  .to('.toggle-button', 0.2, { scale: 0.9 });

export function onCkickTumbler() {
  if (localStorage.getItem('theme') === 'dark-theme') {
    animate.reverse();
    animateBackground.reverse();
    localStorage.removeItem('theme');
  } else {
    animate.restart();
    animateBackground.restart();
    localStorage.setItem('theme', 'dark-theme');
  }

  addDarkClassToHTML();
}

export function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark-theme') {
      document.querySelector('html').classList.add('dark-theme');
      document.querySelector('html').classList.remove('light-theme');
    } else {
      document.querySelector('html').classList.remove('dark-theme');
      document.querySelector('html').classList.add('light-theme');
    }
  } catch (err) {
    console.log(err);
  }
}

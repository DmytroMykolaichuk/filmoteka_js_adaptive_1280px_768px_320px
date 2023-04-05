import gsap from 'gsap';
const funcAnimeLogo = gsap.to('.logo__icon', {
  x: 0, // рохмітка по осі Х
  y: 0, // рохмітка по осі Y
  rotation: 360, // обертання навколо осі
  duration: 5, // тривалість події
  repeat: -1, // кількість повторів, при " мінусовому значенні повторюється безкінечно"
  repeatDelay: 2, // затримка перед початком нового ціклу
  ease: 'bounce.inOut',
  yoyo: true,
});

const funcAnimeHeart = gsap.to('.anime-svg', 1, {
  scale: 2,
  y: -1,
  yoyo: true,
  repeat: -1,
  ease: 'power1.inOut',
  delay: 1,
});
const funcAnimeHaederLib = gsap.to('.logo__icon_hed', {
  x: 0, // рохмітка по осі Х    //  anime-svg //  footer__icon
  y: 0,
  rotation: 360,
  duration: 5,
  repeat: -1,
  repeatDelay: 2,
  ease: 'bounce.inOut',
  yoyo: true,
});
export { funcAnimeLogo, funcAnimeHeart, funcAnimeHaederLib };

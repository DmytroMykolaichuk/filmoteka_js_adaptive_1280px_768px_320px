var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=e.parcelRequire930e;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in r){var a=r[e];delete r[e];var s={id:e,exports:{}};return t[e]=s,a.call(s.exports,s,s.exports),s.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){r[e]=t},e.parcelRequire930e=a);var s=a("7rYDH"),n=a("4S0r6");a("jgWM8"),(i=a("krGWQ")).refs.watchedBtn.addEventListener("click",(function(){if(i.refs.watchedBtn.classList.contains("current"))return;i.refs.gallery.innerHTML="",i.refs.queueBtn.classList.toggle("current"),i.refs.watchedBtn.classList.toggle("current"),f(),location.replace(location.href)})),i.refs.queueBtn.addEventListener("click",(function(){if(i.refs.queueBtn.classList.contains("current"))return;i.refs.gallery.innerHTML="",i.refs.queueBtn.classList.toggle("current"),i.refs.watchedBtn.classList.toggle("current"),p()})),i.refs.btnClearAll.addEventListener("click",(function(){if(i.refs.watchedBtn.classList.contains("current"))return localStorage.setItem("watched",JSON.stringify([])),i.refs.gallery.innerHTML="",void("dark-theme"===localStorage.getItem("theme")?i.refs.darkWrapper.style.display="flex":i.refs.wraperMyLib.style.display="flex");localStorage.setItem("queue",JSON.stringify([])),i.refs.gallery.innerHTML="","dark-theme"===localStorage.getItem("theme")?i.refs.darkWrapper.style.display="flex":i.refs.wraperMyLib.style.display="flex"})),a("422V3"),a("37v9V");var l=a("gjiCh");a("baGT8");var i=a("krGWQ");const o=JSON.parse(localStorage.getItem("watched"))||[],c=JSON.parse(localStorage.getItem("queue"))||[];function d(e){const t=JSON.parse(localStorage.getItem(`${e}`))||[];!localStorage.getItem(`${e}`)||t.length<1?"dark-theme"===localStorage.getItem("theme")?(i.refs.darkWrapper.style.display="flex",i.refs.wraperMyLib.style.display="none"):(i.refs.darkWrapper.style.display="none",i.refs.wraperMyLib.style.display="flex"):"dark-theme"===localStorage.getItem("theme")?i.refs.darkWrapper.style.display="none":i.refs.wraperMyLib.style.display="none"}async function f(){(0,l.showPreloader)(),i.refs.gallery.innerHTML="",d("watched");let e="";for(const t of o){const r=await(0,s.getWatchedFilms)(t);let a=Number.parseInt(r.release_date||r.first_air_date);const n=`https://image.tmdb.org/t/p/w300${r.poster_path}`,l="https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg";let i=[];r.genres.forEach((e=>{i.push(e.name)})),e+=` <li class ="film-item">\n                <a id='${r.id}' class="film-card" href="#">\n                  <div class='thumb'>\n                  <img\n                      class = 'poster'\n                      src= "${r.poster_path?n:l}"\n                      alt="${r.title}"\n                      loading="lazy"\n                    /></div>\n                    <div class='film-data'>\n                      <h2 class="title-film">${r.title}</h2>\n                      <p class="text">\n                        <span class='info-film'>${i.join(", ")} | ${a}</span>\n                        <span class ="rating">IMDB:<br>${r.vote_average.toFixed(1)}</span>\n                      </p>\n                    </div>\n                  </a>\n              </li>`}i.refs.gallery.insertAdjacentHTML("beforeend",e),(0,l.hidePreloader)()}async function p(){(0,l.showPreloader)(),i.refs.gallery.innerHTML="",d("queue");let e="";for(const t of c){const r=await(0,s.getWatchedFilms)(t);let a=Number.parseInt(r.release_date||r.first_air_date);const n=`https://image.tmdb.org/t/p/w300${r.poster_path}`,l="https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg";let i=[];r.genres.forEach((e=>{i.push(e.name)})),e+=` <li class ="film-item">\n              <a id='${r.id}' class="film-card" href="#">\n                <div class='thumb'>\n                <img\n                    class = 'poster'\n                    src= "${r.poster_path?n:l}"\n                    alt="${r.title}"\n                    loading="lazy"\n                  /></div>\n                  <div class='film-data'>\n                    <h2 class="title-film">${r.title}</h2>\n                    <p class="text">\n                      <span class='info-film'>${i.join(", ")} | ${a}</span>\n                      <span class ="rating">IMDB:<br>${r.vote_average.toFixed(1)}</span>\n                    </p>\n                  </div>\n                </a>\n            </li>`}i.refs.gallery.insertAdjacentHTML("beforeend",e),(0,l.hidePreloader)()}(0,l.hidePreloader)(),f();window.addEventListener("scroll",(()=>{window.scrollY>100?i.refs.button.style.display="block":i.refs.button.style.display="none"})),i.refs.button.addEventListener("click",(()=>{window.scroll({top:0,left:0,behavior:"smooth"})})),(0,n.addDarkClassToHTML)();
//# sourceMappingURL=my-library.8ee0d2af.js.map

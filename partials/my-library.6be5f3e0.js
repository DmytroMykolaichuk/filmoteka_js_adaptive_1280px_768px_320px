var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequire930e;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequire930e=r);var a=r("2shzp");const i=document.querySelector(".secondary"),s=document.querySelector(".lib-btn.current"),o=document.querySelector(".btn-clear-all"),c=document.querySelector(".mylib-wrapper");i.addEventListener("click",(function(){if(i.classList.contains("current"))return;c.innerHTML="",i.classList.toggle("current"),s.classList.toggle("current")})),s.addEventListener("click",(function(){if(s.classList.contains("current"))return;c.innerHTML="",i.classList.toggle("current"),s.classList.toggle("current"),f()})),o.addEventListener("click",(function(){if(s.classList.contains("current"))return localStorage.removeItem("wathced"),void(c.innerHTML="");localStorage.removeItem("queue")}));var l=r("ezyJp");r("422V3"),r("37v9V"),r("gjiCh");const d=document.querySelector(".film-list"),u=JSON.parse(localStorage.getItem("wathced"));async function f(){d.innerHTML="";for(const e of u){const t=await p(e);let n=Number.parseInt(t.release_date||t.first_air_date);const r=`https://image.tmdb.org/t/p/w300${t.poster_path}`,a="https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg";let i=[];l.genres.forEach((e=>{t.genres.includes(e.id)&&i.push(e.name)}));let s="";s+=` <li class ="film-item">\n                <a id='${t.id}' class="film-card" href="#">\n                  <div class='thumb'>\n                  <img\n                      class = 'poster'\n                      src= "${t.poster_path?r:a}"\n                      alt="${t.title}"\n                      loading="lazy"\n                    /></div>\n                    <div class='film-data'>\n                      <h2 class="title-film">${t.title}</h2>\n                      <p>\n                         <span class='info-film'>${i.join(", ")} | ${n}</span>\n                        <span class ="rating">IMDB:<br>${t.vote_average.toFixed(1)}</span>\n                      </p>\n                    </div>\n                  </a>\n              </li>`,d.insertAdjacentHTML("beforeend",s)}}async function p(e){try{const{data:t}=await a.default.get(`https://api.themoviedb.org/3/movie/${e}?api_key=352708f90836dd2b75b209ae082e91df&language=en-US`);return t}catch(e){console.log(e)}}f();
//# sourceMappingURL=my-library.6be5f3e0.js.map

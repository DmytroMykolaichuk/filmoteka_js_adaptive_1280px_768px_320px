!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequire930e;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){r[e]=t},t.parcelRequire930e=a);var c=a("bpxeT"),o=a("2TvXO"),s=a("dIxxU"),i=document.querySelector(".secondary"),l=document.querySelector(".lib-btn.current"),u=document.querySelector(".btn-clear-all"),d=document.querySelector(".film-list");l.addEventListener("click",(function(){if(l.classList.contains("current"))return;i.classList.toggle("current"),l.classList.toggle("current"),w()})),i.addEventListener("click",(function(){if(i.classList.contains("current"))return;d.innerHTML="",i.classList.toggle("current"),l.classList.toggle("current")})),u.addEventListener("click",(function(){if(l.classList.contains("current"))return localStorage.removeItem("wathced"),d.innerHTML="",void location.replace(location.href);localStorage.removeItem("queue"),d.innerHTML="",location.replace(location.href)})),a("twtVq"),a("1Gwk9"),a("cDXQO");var p=a("kvC6y"),f=document.querySelector(".empty-wrapper"),h=document.querySelector(".film-list"),v=JSON.parse(localStorage.getItem("wathced")),g=(JSON.parse(localStorage.getItem("queue")),"https://api.themoviedb.org/3/movie/"),m="352708f90836dd2b75b209ae082e91df";function b(e){return y.apply(this,arguments)}function y(){return(y=e(c)(e(o).mark((function t(n){var r;return e(o).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(0,p.showPreloader)(),e.next=4,s.default.get("".concat(g).concat(n,"?api_key=").concat(m,"&language=en-US"));case 4:return r=e.sent.data,(0,p.hidePreloader)(),e.abrupt("return",r);case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),t,null,[[0,9]])})))).apply(this,arguments)}function w(){return x.apply(this,arguments)}function x(){return(x=e(c)(e(o).mark((function t(){var n,r,a,c,s,i,l,u,d,p,f;return e(o).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:h.innerHTML="",n="",r=!0,a=!1,c=void 0,e.prev=3,s=v[Symbol.iterator]();case 5:if(r=(i=s.next()).done){e.next=20;break}return l=i.value,e.next=9,b(l);case 9:u=e.sent,d=Number.parseInt(u.release_date||u.first_air_date),p="https://image.tmdb.org/t/p/w300".concat(u.poster_path),"https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg",f=[],u.genres.forEach((function(e){f.push(e.name)})),n+=' <li class ="film-item">\n                <a id=\''.concat(u.id,"' class=\"film-card\" href=\"#\">\n                  <div class='thumb'>\n                  <img\n                      class = 'poster'\n                      src= \"").concat(u.poster_path?p:"https://shop-cdn1.vigbo.tech/shops/48947/products/18863233/images/2-be392e7cfe9a0fa843b29c1e22be8909.jpg",'"\n                      alt="').concat(u.title,'"\n                      loading="lazy"\n                    /></div>\n                    <div class=\'film-data\'>\n                      <h2 class="title-film">').concat(u.title,"</h2>\n                      <p>\n                        <span class='info-film'>").concat(f.join(", ")," | ").concat(d,'</span>\n                        <span class ="rating">IMDB:<br>').concat(u.vote_average.toFixed(1),"</span>\n                      </p>\n                    </div>\n                  </a>\n              </li>"),h.insertAdjacentHTML("beforeend",n);case 17:r=!0,e.next=5;break;case 20:e.next=26;break;case 22:e.prev=22,e.t0=e.catch(3),a=!0,c=e.t0;case 26:e.prev=26,e.prev=27,r||null==s.return||s.return();case 29:if(e.prev=29,!a){e.next=32;break}throw c;case 32:return e.finish(29);case 33:return e.finish(26);case 34:case"end":return e.stop()}}),t,null,[[3,22,26,34],[27,,29,33]])})))).apply(this,arguments)}(0,p.hidePreloader)(),function(){var e=JSON.parse(localStorage.getItem("wathced"));if(console.log(e),localStorage.getItem("wathced")||e[0])return f.style.display="none",void w();f.style.display="flex"}();var L=document.querySelector(".btn-scroll");window.addEventListener("scroll",(function(){window.scrollY>100?L.style.display="block":L.style.display="none"})),L.addEventListener("click",(function(){window.scroll({top:0,left:0,behavior:"smooth"})}))}();
//# sourceMappingURL=my-library.44a4a89f.js.map
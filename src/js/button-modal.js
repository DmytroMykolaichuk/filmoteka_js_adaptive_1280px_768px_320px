
  export function onWathced(numFilm){
    console.log(5)
    localStorage.setItem('watched',`${numFilm}`)
  }

  export function onQueue(numFilm){
    console.log(7)
    localStorage.setItem('queue',`${numFilm}`)
  }
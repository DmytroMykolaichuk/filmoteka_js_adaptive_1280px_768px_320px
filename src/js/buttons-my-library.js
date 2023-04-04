import { onCardWatch, onCardQueue } from "./my-library";

const queueBtn= document.querySelector('.secondary')
const watchedBtn= document.querySelector('.lib-btn.current')
const btnClearAll = document.querySelector('.btn-clear-all')
const mylibWrapper = document.querySelector('.film-list')

watchedBtn.addEventListener('click', onClickWatchedBtn)
queueBtn.addEventListener('click', onClickQueueBtn)
btnClearAll.addEventListener('click', onClickClearAll)


export function onClickWatchedBtn(){
  if(watchedBtn.classList.contains('current')){return}
  // mylibWrapper.innerHTML=''
  queueBtn.classList.toggle('current')
  watchedBtn.classList.toggle('current')
  onCardWatch()
}


export function onClickQueueBtn(){
  if(queueBtn.classList.contains('current')){return}
  mylibWrapper.innerHTML=''
  queueBtn.classList.toggle('current')
  watchedBtn.classList.toggle('current')
}


export function onClickClearAll() {
  if(watchedBtn.classList.contains('current')){
    localStorage.removeItem('wathced')
    mylibWrapper.innerHTML=''
    location.replace(location.href)
  return}
  localStorage.removeItem('queue')
  mylibWrapper.innerHTML=''
  location.replace(location.href)
  
}
import { onCardWatch, onCardQueue } from "./my-library";

const wraperMyLib = document.querySelector('.empty-wrapper')
const queueBtn= document.querySelector('.secondary')
const watchedBtn= document.querySelector('.lib-btn.current')
const btnClearAll = document.querySelector('.btn-clear-all')
const mylibWrapper = document.querySelector('.film-list')

watchedBtn.addEventListener('click', onClickWatchedBtn)
queueBtn.addEventListener('click', onClickQueueBtn)
btnClearAll.addEventListener('click', onClickClearAll)


export function onClickWatchedBtn(){
  if(watchedBtn.classList.contains('current')){return}
  mylibWrapper.innerHTML=''
  
  queueBtn.classList.toggle('current')
  watchedBtn.classList.toggle('current')
  
  onCardWatch()
  location.replace(location.href)
}


export function onClickQueueBtn(){
  if(queueBtn.classList.contains('current')){return}
  mylibWrapper.innerHTML=''

  queueBtn.classList.toggle('current')
  watchedBtn.classList.toggle('current')

  onCardQueue()
  // location.replace(location.href)
}


export function onClickClearAll() {
  if(watchedBtn.classList.contains('current')){
    localStorage.removeItem('watched')
    mylibWrapper.innerHTML=''
    wraperMyLib.style.display='flex'
  return}
  localStorage.removeItem('queue')
  mylibWrapper.innerHTML=''
  wraperMyLib.style.display='flex'
  
}
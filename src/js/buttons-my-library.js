import { onCardWatch } from "./my-library"

const queueBtn= document.querySelector('.secondary')
const watchedBtn= document.querySelector('.lib-btn.current')
const btnClearAll = document.querySelector('.btn-clear-all')
const mylibWrapper = document.querySelector('.mylib-wrapper')

queueBtn.addEventListener('click', onClickQueueBtn)
export function onClickQueueBtn(){
  if(queueBtn.classList.contains('current')){return}
  mylibWrapper.innerHTML=''
  queueBtn.classList.toggle('current')
  watchedBtn.classList.toggle('current')
}
watchedBtn.addEventListener('click', onClickWatchedBtn)
export function onClickWatchedBtn(){
  if(watchedBtn.classList.contains('current')){return}
  mylibWrapper.innerHTML=''
  queueBtn.classList.toggle('current')
  watchedBtn.classList.toggle('current')
  onCardWatch()
}

btnClearAll.addEventListener('click', onClickClearAll)
export function onClickClearAll(){
  if(watchedBtn.classList.contains('current')){
    localStorage.removeItem('wathced')
    mylibWrapper.innerHTML=''
  return}
  localStorage.removeItem('queue')
}
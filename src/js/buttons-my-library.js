const queueBtn= document.querySelector('.secondary')
const watchedBtn= document.querySelector('.lib-btn.current')
const btnClearAll = document.querySelector('.btn-clear-all')

queueBtn.addEventListener('click', onClickQueueBtn)
export function onClickQueueBtn(){
  if(queueBtn.classList.contains('current')){return}
  queueBtn.classList.toggle('current')
  watchedBtn.classList.toggle('current')
}
watchedBtn.addEventListener('click', onClickWatchedBtn)
export function onClickWatchedBtn(){
  if(watchedBtn.classList.contains('current')){return}
  queueBtn.classList.toggle('current')
  watchedBtn.classList.toggle('current')
}

btnClearAll.addEventListener('click', onClickClearAll)
export function onClickClearAll(){
  if(watchedBtn.classList.contains('current')){
    localStorage.removeItem('wathced')
  return}
  localStorage.removeItem('queue')
}
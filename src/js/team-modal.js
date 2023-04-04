const clickOnBtnTeamModal = document.querySelector('.footer__btn');

clickOnBtnTeamModal.addEventListener('click', openTeamModal);

let markup = '';

function openTeamModal() {
  //   event.preventDefault();
  console.log('clickOnBtnTeamModal');
  //   markup = `<img src= ""
  //             alt="${photoMemberOfTeam}" loading="lazy" class="movie-image" />
  //     <div class="modal-description">
  //         <h2 class="modal-title">${
  //           modalCard.title || modalCard.original_title || modalCard.name
  //         }</h2>
  //             <div class="film-description">
  //                 <p>
  //                     <span class="film-property-label">Vote / Votes</span>
  //                     <span class="film-property-value"
  //                         ><span class="film-property-bgVote">${modalCard.vote_average.toFixed(
  //                           1
  //                         )}</span> /
  //                         <span class="film-property-bgVotes"> ${
  //                           modalCard.vote_count
  //                         }</span></span
  //                     >
  //                 </p>

  //             </div>
  //             <div class="movie-description">
  //                 <p class="mov-desc-title">About</p>
  //                 <p class="mov-desc-text">${modalCard.overview}</p>
  //             </div>
  //             <div class="modal-Btn">
  //             <button type="button" class="trailer-Btn btn__queue btn" data-id=${
  //               modalCard.id
  //             }>trailer</button>
  //             <button type="button" class="${
  //               styleBtn.classWatched
  //             } add-to-watched-Btn click-watche btn__watch btn" data-id=${
  //     modalCard.id
  //   }>${styleBtn.textWatched}</button>
  //                 <button type="button" class="${
  //                   styleBtn.classQueue
  //                 } add-to-queue-Btn click-queue btn__queue btn" data-id=${
  //     modalCard.id
  //   }>${styleBtn.textQueue}</button>

  //             </div>

  //     </div>`;

  //   modal.removeAttribute('hidden', '');
  //   window.addEventListener('keydown', pressEscapeKey);
}

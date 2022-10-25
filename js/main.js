/**
 * https://ithelp.ithome.com.tw/articles/10280490
 */

function get_cards() {
  return document.querySelectorAll("#call-blocks .column.is-3 .card");
}
function card(title, content) {
  return `
<div class="column is-3">
  <div class="card" data-title="${title}" data-content="${content}">
    <div class="card-content">
      <div class="is-flex">
        <p class="title is-4 is-flex-grow-1">
        ${title}
        </p>
        <button class="button is-white btn-edit" aria-label="edit">
          <span class="icon">
            <i class="material-symbols-outlined">
              edit
            </i>
          </span>
        </button>
        <button class="button is-white btn-copy" aria-label="copy">
          <span class="icon is-small">
            <i class="material-symbols-outlined">
              content_copy
            </i>
          </span>
        </button>
      </div>
      <div class="content">
      ${content}
      </div>
    </div>
  </div>
</div>`;
}

function card_events() {
  card_edit();
  card_copy();
}
function card_add() {}
function card_copy() {
  (document.querySelectorAll("#call-blocks .btn-copy") || []).forEach(
    ($btn) => {
      $btn.addEventListener("click", () => {
        const $card = $btn.parentElement.parentElement.parentElement;
        navigator.clipboard
          .writeText($card.dataset.content)
          .then(() => {
            // console.log("success");
            showCopied();
          })
          .catch((e) => alert("Copy failed.", e));
      });
    }
  );
}
function card_edit() {
  (document.querySelectorAll("#call-blocks .btn-edit") || []).forEach(
    ($btn) => {
      $btn.addEventListener("click", () => {
        const $card = $btn.parentElement.parentElement.parentElement;
      });
    }
  );
}
function card_modal_save() {
  // model - save
}
function card_modal_delete() {
  // model - delete
}

function search() {}

function import_json() {}
function export_json() {}
function share() {}

function loaded() {
  document.addEventListener("DOMContentLoaded", () => {
    card_events();
  });
}
loaded();

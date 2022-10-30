/**
 * https://ithelp.ithome.com.tw/articles/10280490
 */

import * as StorageAPI from "./js/storage.js";
import * as AnimateAPI from "./js/animation.js";
import * as ModalAPI from "./js/modal.js";
let current_mode = "";
/** Click: copy text */
function card_copy(isPrivete) {
  let selector = "#call-blocks .btn-copy";
  if (isPrivete)
    selector =
      "#call-blocks .column.is-3:not(.is-func):not(.is-public) .btn-copy";
  (document.querySelectorAll(selector) || []).forEach(($btn) => {
    $btn.addEventListener("click", () => {
      const $card = $btn.parentElement.parentElement.parentElement;
      const c = $card.dataset.content;
      navigator.clipboard
        .writeText(c)
        .then(() => {
          // console.log("success");
          AnimateAPI.notifiy(`Copy completed: "${c}"`);
        })
        .catch((e) => AnimateAPI.notifiy(`Error: "${e.name} - ${e.message}"`));
    });
  });
}

/** Click: open add card modal */
function card_add() {
  (document.querySelectorAll("#call-blocks .btn-add") || []).forEach(($btn) => {
    $btn.addEventListener("click", () => {
      // const $card = $btn.parentElement.parentElement.parentElement;
      ModalAPI.openModal_add(
        document.getElementById("modal_tag"),
        $btn.parentElement.parentElement.parentElement
      );
      // modal_add_save();
      current_mode = "add";
    });
  });
}

/** Click: open edit modal */
function card_edit(isPrivete) {
  let selector = "#call-blocks .btn-edit";
  if (isPrivete)
    selector =
      "#call-blocks .column.is-3:not(.is-func):not(.is-public) .btn-edit";
  (document.querySelectorAll(selector) || []).forEach(($btn) => {
    $btn.addEventListener("click", () => {
      const $card = $btn.parentElement.parentElement.parentElement;
      ModalAPI.openModal_edit(
        document.getElementById("modal_tag"),
        $card,
        $card.dataset.title,
        $card.dataset.content
      );
      // modal_update_save();
      current_mode = "update";
    });
  });
}

/** Func: save to storage & update ui */
function modal_save() {
  function click() {
    console.log("modal_add_save");
    const k = document.getElementById("modal_input_title").value;
    const v = document.getElementById("modal_input_content").value;
    let r;
    if (current_mode === "add") r = StorageAPI.addItem(k, v);
    else if (current_mode === "update") r = StorageAPI.updateItem(k, v);

    if (r) {
      AnimateAPI.notifiy(`Error: ${r}`);
      return;
    }

    if (current_mode === "add") {
      AnimateAPI.notifiy(`Add completed. title: "${k}", content: ${v}`);
    } else if (current_mode === "update") {
      AnimateAPI.notifiy(`Update completed. title: "${k}", content: ${v}`);
    }

    cardEventRegister();
  }

  (document.querySelectorAll("#modal_tag .btn-save") || []).forEach(($btn) => {
    $btn.addEventListener("click", click);
  });
}

/** Func: delete from storage & update ui */
function modal_delete() {
  // model - delete
  (document.querySelectorAll("#modal_tag .btn-delete") || []).forEach(
    ($btn) => {
      $btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("modal_delete");
        if (window.confirm("Do you really want to delete?")) {
          const k = document.getElementById("modal_input_title").value;
          const v = document.getElementById("modal_input_content").value;
          const r = StorageAPI.deleteItem(k);

          if (r) {
            AnimateAPI.notifiy(`Error: ${r}`);
          } else {
            AnimateAPI.notifiy(
              `Delete completed. title: "${k}", content: ${v}`
            );
            cardEventRegister();
          }
        } else {
          // nothing
        }
      });
    }
  );
}

function search() {
  let input = document.getElementById("input_search");
  input.addEventListener("input", updateValue);
  function updateValue(e) {
    (
      document.querySelectorAll("#call-blocks .column.is-3:not(.is-func)") || []
    ).forEach((ele) => {
      if (!input.value) {
        ele.classList.remove("d-none");
      }

      if (
        ele
          .querySelector(".title")
          .textContent.toLowerCase()
          .includes(input.value.toLowerCase()) ||
        ele
          .querySelector(".content")
          .textContent.toLowerCase()
          .includes(input.value.toLowerCase())
      ) {
        ele.classList.remove("d-none");
      } else {
        ele.classList.add("d-none");
      }
    });
  }
}

function initPrivateCards() {
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

  (
    document.querySelectorAll(
      "#call-blocks .column.is-3:not(.is-func):not(.is-public)"
    ) || []
  ).forEach((ele) => {
    ele.remove();
  });

  const items = StorageAPI.getItems();
  if (!items) return;
  Object.entries(items).forEach(([k, v]) => {
    $("#call-blocks").append(card(k, v));
  });
}

function cardEventRegister() {
  ModalAPI.closeAllModals();
  initPrivateCards();
  card_edit();
  card_copy();
}

function import_json() {}
function export_json() {}
function share() {
  let btn = document.getElementById("btn-share");

  btn.addEventListener("click", (e) => {
    let jsonobj = StorageAPI.getItems();
    let queryString = Object.keys(jsonobj)
      .map((key) => key + "=" + jsonobj[key])
      .join("&");
    let url = encodeURI(`${window.location.href}?${queryString}`);

    // url 在不同瀏覽器有長度限制，超過改為下載檔案
    if (url.length > 8000) {
      let jsonse = JSON.stringify(jsonobj);
      var blob = new Blob([jsonse], { type: "application/json" });
      var url2 = URL.createObjectURL(blob);

      let btn = document.getElementById("btn-download");
      btn.href = url2;
      btn.download = "ddtools_callStorage.json";
      btn.click();
    } else {
      navigator.share({
        title: document.title,
        text: "DD Tools Json File",
        url: url,
      });
    }
  });
}
function merge(){

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  for(const entry of urlParams.entries()) {
    console.log(`${entry[0]}: ${entry[1]}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ModalAPI.modalOnLoaded();
  modal_delete();
  modal_save();
  card_add();
  cardEventRegister();
  search();
  share();
  merge();
});

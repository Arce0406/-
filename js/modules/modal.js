function closeModal($el) {
  $el.classList.remove("is-active");
}

function closeAllModals() {
  (document.querySelectorAll(".modal") || []).forEach(($modal) => {
    closeModal($modal);
  });
}

function openModal($el) {
  // modal
  $el.classList.add("is-active");
}

function openModal_card($el, card) {
  // delete button
  let btn_delete = $el.querySelector("button.btn-delete");
  if (
    card.parentElement.classList.contains("is-public") ||
    card.parentElement.classList.contains("is-func")
  ) {
    btn_delete.disabled = true;
  } else {
    btn_delete.disabled = false;
  }

  // modal
  $el.classList.add("is-active");
}

function openModal_add($el, card) {
  $el.dataset.mode = "add";
  document.getElementById("modal_input_title").value = "";
  document.getElementById("modal_input_content").value = "";
  // header
  (document.querySelectorAll(".is-add-mode") || []).forEach(($trigger) => {
    $trigger.classList.remove("d-none");
  });
  (document.querySelectorAll(".is-edit-mode") || []).forEach(($trigger) => {
    $trigger.classList.add("d-none");
  });
  openModal_card($el, card);
}

function openModal_edit($el, card, title, content) {
  $el.dataset.mode = "edit";
  document.getElementById("modal_input_title").value = title;
  document.getElementById("modal_input_content").value = content;

  // header
  (document.querySelectorAll(".is-add-mode") || []).forEach(($trigger) => {
    $trigger.classList.add("d-none");
  });
  (document.querySelectorAll(".is-edit-mode") || []).forEach(($trigger) => {
    $trigger.classList.remove("d-none");
  });
  openModal_card($el, card);
}

function modalOnLoaded() {
  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".modal-button") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button:is(.btn-cancel)"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
}

// document.addEventListener("DOMContentLoaded", () => {});

export {
  modalOnLoaded,
  closeAllModals,
  openModal,
  openModal_add,
  openModal_edit,
};

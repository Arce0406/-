document.addEventListener("DOMContentLoaded", () => {
  function openTab($el) {
    $el.classList.add("is-active");
  }

  function closeTab($el) {
    $el.classList.remove("is-active");
  }

  function closeAllTabs(group) {
    (document.querySelectorAll(".tabs ul li") || []).forEach(($modal) => {
      closeTab($modal);
    });

    if (group === "section") {
      (document.querySelectorAll(".tab-panel") || []).forEach(($modal) => {
        closeTab($modal);
      });
    } else {
    }
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".tabs ul li") || []).forEach(($trigger) => {
    const tab_id = $trigger.dataset.target;
    const group = $trigger.dataset.group;
    const $target = document.getElementById(tab_id);
    $trigger.addEventListener("click", () => {
      // console.log(tab_id, $target);
      closeAllTabs(group);
      openTab($trigger);
      openTab($target);
      closeAllMessage();
    });
  });

});

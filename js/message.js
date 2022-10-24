document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".notification-wrapper .notification button.delete").forEach(($trigger) => {   
        $trigger.addEventListener("click", (e) => {
            // console.log(e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.style.display = "none";
        });
    });
});

function closeAllMessage(){    
  (document.querySelectorAll(".notification-wrapper") || []).forEach(
    ($trigger) => {
      $trigger.style.display = "none";
    }
  );
}
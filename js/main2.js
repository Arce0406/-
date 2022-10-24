document.addEventListener("DOMContentLoaded", () => {
  let tb_cc_script = document.getElementById("tb_cc_script");
  let btn_cc_script = document.getElementById("btn_cc_script");
  let n = document.getElementById("notifiy");

  //   console.log(tb_cc_script.value);
  btn_cc_script.addEventListener("click", () => {
    navigator.clipboard
      .writeText(tb_cc_script.value)
      .then(() => {
        // console.log("success");
        n.style.display = "block";
        n.animate(
          [
            // keyframes
            { bottom: "-2em",  opacity: 0 },
            { bottom: "1em",  opacity: 1 },
          ],
          {
            // timing options
            duration: 180,
            fill: "forwards"
          }
        );
      })
      .catch((e) => alert("Copy failed.", e));
  });
});

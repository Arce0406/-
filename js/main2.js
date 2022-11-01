import * as AnimateAPI from "./modules/animation.js";

document.addEventListener("DOMContentLoaded", () => {
  let tb_cc_script = document.getElementById("tb_cc_script");
  let btn_cc_script = document.getElementById("btn_cc_script");
  
  //   console.log(tb_cc_script.value);
  btn_cc_script.addEventListener("click", () => {
    navigator.clipboard
      .writeText(tb_cc_script.value)
      .then(() => {
        // console.log("success");
        AnimateAPI.notifiy('Script copied!');
      })
      .catch((e) => alert("Copy failed.", e));
  });
});

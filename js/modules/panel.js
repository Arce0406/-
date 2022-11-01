/**
 * https://github.com/federicomassi/Bulma-Addons
 * @param {*} label
 */
function panelDigger(label) {
  var y = document.querySelectorAll(".panel-tab");
  var x = document.querySelectorAll(".panel-tab.panel-" + label);
  var z = document.querySelectorAll(".panel-block");
  var w = document.querySelectorAll(".panel-block.panel-" + label);
  for (i = 0; i < y.length; i++) {
    y[i].classList.remove("is-active");
  }
  for (i = 0; i < x.length; i++) {
    x[i].classList.add("is-active");
  }
  for (i = 0; i < z.length; i++) {
    z[i].classList.add("is-hidden");
  }
  for (i = 0; i < w.length; i++) {
    w[i].classList.remove("is-hidden");
  }
}

export { panelDigger };

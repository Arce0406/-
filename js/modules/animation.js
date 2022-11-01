const keyframe1 = [
  { bottom: "-3em", opacity: 0 },
  { bottom: "1em", opacity: 1 },
];
const keyframe2 = [
  { bottom: "1em", opacity: 1 },
  { bottom: "-2em", opacity: 0 },
];
const option1 = {
  // timing options
  duration: 200,
  fill: "forwards",
};

function notifiy(text){
  let n = document.getElementById("notifiy");
  document.querySelector("#notifiy div p").textContent = text;
  n.style.display = "block";
  //   let r = await n.animate(keyframe1, option1).finished;
  let a1 = n.animate(keyframe1, option1);
  a1.onfinish = (event) => {
    setTimeout(function () {
      if (n.style.display === "none") return;
      let a2 = n.animate(keyframe2, option1);
      a2.onfinish = (event) => {
        n.style.display = "none";
      };
    }, 5000);
  };
}

export { notifiy };

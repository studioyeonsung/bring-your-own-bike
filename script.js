const wheel = document.getElementById("wheel");
let rotation = 0;

window.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    rotation += event.deltaY * 0.12;
    wheel.style.transform = `rotate(${rotation}deg)`;
  },
  { passive: false }
);

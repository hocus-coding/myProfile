// Scroll 3D

let zSpacing = -1000;
let lastPosition = zSpacing / 5;
let $frames = document.getElementsByClassName('frame');
frames = Array.from($frames);
zVals = [];

window.onscroll = function () {
  let top = document.documentElement.scrollTop;
  let delta = lastPosition - top;

  lastPosition = top;

  frames.forEach(function (n, i) {
    zVals.push((i * zSpacing) + zSpacing);
    zVals[i] += delta * -5;
    let frame = frames[i];
    let transform = `translateZ(${zVals[i]}px)`;
    let opacity = zVals[i] < Math.abs(zSpacing) / 2 ? 1 : 0;
    frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`);
  });
};

window.scrollTo(0, 1);

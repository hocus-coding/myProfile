// Scroll 3D

let page = document.querySelector('.page');
let popup = document.querySelector('.form__container');
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

  let pageHeight = page.clientHeight;
  let scrollH = page.scrollHeight;
  let scrolled = page.scrollHeight - top;

  // console.log(scrollH + ' скрол высота');
  // console.log(top + ' скрол топ');
  // console.log(pageHeight + ' клиент высота');
  // console.log(scrolled + ' сколько осталось скрола');

  function comparison() {

    let arr = [
      parseInt(scrolled),
      parseInt(scrolled) + 1,
      parseInt(scrolled) - 1,
    ];

    return arr.includes(pageHeight) ? true : false;
  }

  if (comparison()) {
    popup.classList.add('form__container--show');
    console.log('конец скрола');
  } else {
    popup.classList.remove('form__container--show');
    console.log('скрол не кончился');
  }
};

window.scrollTo(0, 1);



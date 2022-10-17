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

// Form Validation

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
  }

  function formValidate(form) {
    let error = 0;
    let formRequed = document.querySelectorAll('.field-item__input--requed');

    for (let index = 0; index < formRequed.length; index++) {
      const input = formRequed[index];
      formRemoveError(input);

      if (input.classList.contains('field-item__input--email')) {

      }
    }
  }

  function formAddError(input) {
    input.classList.add('field-item__input--error');
  }

  function formRemoveError(input) {
    input.classList.remove('field-item__input--error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

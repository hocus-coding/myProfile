// Scroll 3D

let page = document.querySelector('.page');
let footer = document.querySelector('.main-footer');
let popup = document.querySelector('.form__container');
let alertSuccess = document.querySelector('.popup--success');
let alertFailed = document.querySelector('.popup--failed');
let mp3Button = document.querySelector('.main-header__button');
let mp3Audio = document.querySelector('.main-header__audio');
let zSpacing = -1000;
let lastPosition = zSpacing / 5;
let $frames = document.getElementsByClassName('frame');
frames = Array.from($frames);
zVals = [];

footer.classList.add('main-footer--hidden');

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
    footer.classList.remove('main-footer--hidden');
    console.log(pageHeight + ' клиент хеит');
    console.log(scrolled + ' скрол топ');
  } else {
    console.log(pageHeight + ' клиент хеит');
    console.log(scrolled + ' скрол топ');
    popup.classList.remove('form__container--show');
    footer.classList.add('main-footer--hidden');
  }
};

window.scrollTo(0, 1);

// Form Send


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    if (error === 0) {
      alertSuccess.classList.add('popup--success-show');
      setTimeout(() => {
        alertSuccess.classList.remove('popup--success-show');
      },
        6000
      );
      form.classList.add('feedback--sending');
      Email.send({
        SecureToken: 'ab62c18f-42ed-4ba0-b73c-922452d4f357',
        To: 'lysogordmitry@gmail.com',
        From: 'hoqus.coding@gmail.com',
        Subject: 'Вам Важное Письмо',
        Body: 'Subject: ' + document.getElementById('subject').value
          + '<br> Name: ' + document.getElementById('name').value
          + '<br> Email: ' + document.getElementById('email').value
          + '<br> Message: ' + document.getElementById('message').value
      }).then(
        form.reset(),
        form.classList.remove('feedback--sending'),
      );

    } else {
      alertFailed.classList.add('popup--failed-show');
      setTimeout(() => {
        alertFailed.classList.remove('popup--failed-show');
      },
        6000
      );
      form.classList.remove('feedback--sending')
    }
  }

  // Form Validation

  function formValidate(form) {
    let error = 0;
    let formRequed = document.querySelectorAll('.field-item__input--requed');

    for (let index = 0; index < formRequed.length; index++) {
      const input = formRequed[index];
      formRemoveError(input);

      if (input.classList.contains('field-item__input--email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
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

// Audio mp3

mp3Button.addEventListener('click', e => {
  mp3Button.classList.toggle('main-header__button--pause');
  mp3Audio.paused ? mp3Audio.play() : mp3Audio.pause();
})

window.onfocus = function () {
  mp3Button.classList.contains('main-header__button--pause') ? mp3Audio.pause() : mp3Audio.play();
}

window.onblur = function () {
  mp3Audio.pause();
}


/* Email send SmtpJS.com - v3.0.0 */
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

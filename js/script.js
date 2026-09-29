(function () {
  var $ = function (s) { return document.querySelector(s) };
  var WA = '919899668444';
  var state = { bill: 4000, biz: false, kw: 3 };

  function inr(n) { return '₹' + Math.round(n).toLocaleString('en-IN') }
  function lakh(n) { return n >= 100000 ? '₹' + parseFloat((n / 100000).toFixed(2)) + ' L' : inr(n) }

  function update(src) {
    var RATE = 7, PER_KW = 60000, YIELD = 120;
    var bill = state.bill;
    var units = bill / RATE;
    var kw = Math.max(1, Math.ceil(units / YIELD * 2) / 2);
    var cost = kw * PER_KW;
    var sub = state.biz ? 0 : Math.min(kw, 2) * 30000 + (kw > 2 ? Math.min(kw - 2, 1) * 18000 : 0);
    var gen = kw * YIELD;
    var save = Math.min(bill, gen * RATE);
    var pay = (cost - sub) / (save * 12);
    var co2 = gen * 12 * 0.7 / 1000;
    state.kw = kw;
    var hb = $('#hBill'), b = $('#bill');
    if (src !== 'h') hb.value = Math.min(bill, +hb.max);
    if (src !== 'm') b.value = bill;
    $('#hBillOut').textContent = inr(Math.min(bill, +hb.max));
    $('#billOut').textContent = inr(bill);
    $('#hSize').textContent = kw + ' kW'; $('#hUnits').textContent = gen;
    $('#hSave').textContent = inr(save); $('#hSub').textContent = state.biz ? 'Homes only' : inr(sub);
    $('#rSize').textContent = kw + ' kW'; $('#rUnits').textContent = gen;
    $('#rSave').textContent = inr(save); $('#rCost').textContent = lakh(cost);
    $('#rSub').textContent = state.biz ? 'Not applicable' : inr(sub);
    $('#rPay').textContent = pay.toFixed(1) + ' yrs'; $('#rCo2').textContent = co2.toFixed(1) + ' t';
    var msg = 'Hello Sun Shakti Solar, my monthly bill is about Rs ' + bill + ' (' + (state.biz ? 'shop/factory' : 'home') + '). The calculator suggests about ' + kw + ' kW. Please share a quote.';
    $('#calcWa').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  }
  $('#hBill').addEventListener('input', function (e) { state.bill = +e.target.value; update('h') });
  $('#bill').addEventListener('input', function (e) { state.bill = +e.target.value; update('m') });
  function tog(biz) { state.biz = biz; $('#tHome').setAttribute('aria-pressed', !biz); $('#tBiz').setAttribute('aria-pressed', biz); update() }
  $('#tHome').addEventListener('click', function () { tog(false) });
  $('#tBiz').addEventListener('click', function () { tog(true) });

  // fill the proposal form from the estimate
  document.querySelectorAll('[data-fill]').forEach(function (a) {
    a.addEventListener('click', function () {
      $('#fbill').value = state.bill;
      $('#ftype').value = state.biz ? 'Shop / office' : 'Home';
      var m = $('#fmsg'); if (!m.value) m.value = 'Looking at about ' + state.kw + ' kW.';
    });
  });

  // menu
  var nav = $('#nav'), mb = $('#menuBtn');
  mb.addEventListener('click', function () { var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', o) });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false') } });

  // form -> WhatsApp
  function toast(t) { var e = $('#toast'); e.textContent = t; e.classList.add('on'); setTimeout(function () { e.classList.remove('on') }, 3500) }
  $('#quoteForm').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var n = $('#fname').value.trim(), p = $('#fphone').value.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
    var ok = true; $('#eName').textContent = ''; $('#ePhone').textContent = '';
    if (n.length < 2) { $('#eName').textContent = 'Enter your name.'; ok = false }
    if (!/^[6-9]\d{9}$/.test(p)) { $('#ePhone').textContent = 'Enter a 10-digit mobile number.'; ok = false }
    if (!ok) return;
    var b = $('#fbill').value.trim(), a = $('#farea').value.trim(), m = $('#fmsg').value.trim();
    var msg = 'Hello Sun Shakti Solar, I want a solar proposal.\nName: ' + n + '\nMobile: ' + p + '\nProperty: ' + $('#ftype').value + (b ? '\nMonthly bill: Rs ' + b : '') + (a ? '\nArea: ' + a : '') + (m ? '\nNote: ' + m : '');
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    toast('Opening WhatsApp. Send the message there.');
  });

  $('#yr').textContent = new Date().getFullYear();
  update();
})();



const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

});

backToTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});
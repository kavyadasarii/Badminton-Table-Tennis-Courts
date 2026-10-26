
(function(){

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ observer.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  var LAUNCH = new Date('2026-12-15T06:00:00+05:30').getTime();

  var els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs')
  };
  function pad(n){ return String(n).padStart(2, '0'); }
  var timer;
  function tick(){
    var diff = Math.max(0, LAUNCH - Date.now());
    els.days.textContent = pad(Math.floor(diff / 86400000));
    els.hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    els.mins.textContent = pad(Math.floor((diff % 3600000) / 60000));
    els.secs.textContent = pad(Math.floor((diff % 60000) / 1000));
    if (diff <= 0) clearInterval(timer);
  }
  tick();
  timer = setInterval(tick, 1000);

  var form = document.getElementById('notifyForm');
  var input = document.getElementById('notifyEmail');
  var success = document.getElementById('notifySuccess');
  if (form) {
    var valid = function(){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()); };
    input.addEventListener('input', function(){ if (form.classList.contains('invalid')) form.classList.toggle('invalid', !valid()); });
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (!valid()) { form.classList.add('invalid'); input.focus(); return; }
      form.classList.remove('invalid');

      success.classList.add('show');
      form.reset();
    });
  }

})();

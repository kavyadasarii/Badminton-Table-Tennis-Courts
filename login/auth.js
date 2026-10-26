
(function(){

  document.querySelectorAll('.eye').forEach(function(btn){
    btn.addEventListener('click', function(){
      var input = btn.closest('.control').querySelector('input');
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.classList.toggle('is-shown', show);
      btn.setAttribute('aria-pressed', String(show));
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  var form = document.getElementById('auth-form');
  if (!form) return;
  var mode = form.getAttribute('data-mode');

  var rules = {
    name:     function(v){ return v.trim().length > 1; },
    email:    function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
    phone:    function(v){ return /^[+\d][\d\s-]{8,}$/.test(v.trim()); },
    password: function(v){ return mode === 'signup' ? v.length >= 8 : v.length > 0; },
    confirm:  function(v){ var p = form.querySelector('[name="password"]'); return v.length > 0 && v === p.value; },
    terms:    function(v, el){ return el.checked; }
  };

  function check(el){
    var rule = rules[el.name];
    if (!rule) return true;
    var ok = rule(el.value, el);
    var wrap = el.closest('.field') || el.closest('.check-field');
    if (wrap) wrap.classList.toggle('invalid', !ok);
    return ok;
  }

  var inputs = form.querySelectorAll('input[name]');
  inputs.forEach(function(el){
    var evt = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener('blur', function(){ if (el.type !== 'checkbox' && el.value !== '') check(el); });
    el.addEventListener(evt, function(){
      var wrap = el.closest('.field') || el.closest('.check-field');
      if (wrap && wrap.classList.contains('invalid')) check(el);
      if (el.name === 'password') {
        updateStrength(el.value);
        var c = form.querySelector('[name="confirm"]');
        if (c && c.value) check(c);
      }
    });
  });

  var meter = document.getElementById('strength');
  var label = document.getElementById('strength-label');
  function updateStrength(v){
    if (!meter) return;
    var s = 0;
    if (v.length >= 8) s++;
    if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
    if (/\d/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v) || v.length >= 12) s++;
    if (!v) s = 0;
    meter.setAttribute('data-level', String(s));
    label.textContent = ['Use at least 8 characters', 'Weak', 'Fair', 'Good', 'Strong'][s];
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var first = null, valid = true;
    inputs.forEach(function(el){
      if (!check(el)) { valid = false; if (!first) first = el; }
    });
    if (!valid) { first.focus(); return; }

    window.location.href = form.getAttribute('data-next');
  });

  document.querySelectorAll('.social-btn').forEach(function(btn){
    btn.addEventListener('click', function(){

    });
  });
})();

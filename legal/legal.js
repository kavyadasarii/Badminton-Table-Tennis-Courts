
(function(){
  var links = document.querySelectorAll('.toc a');
  var sections = document.querySelectorAll('.l-section');
  if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function(a){ byId[a.getAttribute('href').slice(1)] = a; });

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      links.forEach(function(a){ a.classList.remove('active'); });
      var link = byId[entry.target.id];
      if (link) link.classList.add('active');
    });
  }, { rootMargin: '-96px 0px -65% 0px', threshold: 0 });

  sections.forEach(function(s){ observer.observe(s); });
})();

(function () {
  'use strict';

  /* Get Advice bar.
     Hides the persistent bar while the closing block is on screen, so the
     same button is never shown twice. No-ops on pages without both.

     Accordions are native <details> and need no script. */

  function initAdviceBar() {
    var bar = document.querySelector('[data-advice-bar]');
    var end = document.querySelector('[data-advice-cta]');

    if (!bar || !end || !('IntersectionObserver' in window)) return;

    new IntersectionObserver(function (entries) {
      bar.classList.toggle('is-hidden', entries[0].isIntersecting);
    }).observe(end);
  }

  /* Directory filter.
     Used by the provider lists on Searching for accommodation. Progressive
     enhancement only: the search field ships hidden and is revealed here, so
     a page served without this script still shows every entry. Matching is a
     plain substring test over each row's own text, all terms must hit. */

  function normalise(value) {
    return (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function initDirectory(root) {
    var tools = root.querySelector('[data-directory-tools]');
    var input = root.querySelector('[data-directory-search]');
    var count = root.querySelector('[data-directory-count]');
    var empty = root.querySelector('[data-directory-empty]');
    var nodes = root.querySelectorAll('[data-directory-item]');

    if (!tools || !input || !nodes.length) return;

    var rows = Array.prototype.map.call(nodes, function (el) {
      return { el: el, text: normalise(el.textContent) };
    });
    var total = rows.length;

    function apply() {
      var terms = normalise(input.value).split(' ').filter(Boolean);
      var shown = 0;

      rows.forEach(function (row) {
        var hit = terms.every(function (term) {
          return row.text.indexOf(term) > -1;
        });
        row.el.hidden = !hit;
        if (hit) shown += 1;
      });

      if (count) {
        count.textContent = terms.length
          ? 'Showing ' + shown + ' of ' + total
          : total + ' listed';
      }
      if (empty) empty.hidden = shown !== 0;
    }

    tools.hidden = false;
    input.addEventListener('input', apply);
    apply();
  }

  function initDirectories() {
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-directory]'),
      initDirectory
    );
  }

  function init() {
    initAdviceBar();
    initDirectories();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

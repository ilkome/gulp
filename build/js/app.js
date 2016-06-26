'use strict';

// Fix header jumping on mobile browsers
// =================================================================================================
function fixHeaderHeight(className) {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (userAgent.match(/Android/i) || userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
    var block = $(className);
    var blockHeight = block.outerHeight();

    block.css('height', blockHeight);
    block.css('min-height', 'auto');
  }
}

// Run animation with reveal plugin
// =================================================================================================
function initAnimation() {
  var sr = ScrollReveal({
    viewFactor: 0.3
  });

  // Header avatar
  sr.reveal('.js-headerAvaAnim', {
    origin: 'top',
    distance: '50px',
    duration: 1500
  });

  // Header text
  sr.reveal('.js-headerTextAnim', {
    origin: 'center',
    distance: '0',
    duration: 1500,
    delay: 1000
  });

  // Header menu
  sr.reveal('.js-headerMenuAnim', {
    origin: 'bottom',
    distance: '50px',
    duration: 1500,
    delay: 1800
  });

  // Skills
  sr.reveal('.js-skillAnim', {
    origin: 'top',
    distance: '50px',
    duration: 1000
  }, 300);

  // Portfolio
  sr.reveal('.js-portfolioAnim', {
    origin: 'bottom',
    distance: '100px',
    duration: 1000,
    delay: 200
  });

  // Contacts
  sr.reveal('.js-contactsAnim', {
    origin: 'bottom',
    distance: '100px',
    duration: 1000
  });
}

// DOM ready
// =================================================================================================
$(function () {
  // Fix header height on mobile devices
  fixHeaderHeight('.js-header');

  new Blazy({
    selector: '.js-belazy',
    offset: 500,
    successClass: 'js-belazy-loaded'
  });
});

// Everything ready
// =================================================================================================
$(window).load(function () {
  initAnimation();
});
//# sourceMappingURL=app.js.map

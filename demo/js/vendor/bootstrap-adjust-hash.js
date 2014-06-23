
//
// # Bootstrap Adjust Hash
// by @niftylettuce
//
// Requires: [jquery.ba-hashchange.min.js][1] and [jquery.scrollTo-min.js][2]
// [1]: https://raw.github.com/cowboy/jquery-hashchange/v1.3/jquery.ba-hashchange.min.js
// [2]: http://demos.flesler.com/jquery/scrollTo/js/jquery.scrollTo-min.js
//

// Adjust the hash if mobile and has a fixed navbar
function bootstrapAdjustHash() {
  var $navbarFixedTop = $('.navbar-fixed-top')
    , offset          = ($(window).width() > 480 && $navbarFixedTop.length > 0) ? $navbarFixedTop.height() + 20 : 0;
  if (window.location.hash) {
    // check if an anchor exists with the respective hash
    var $anchor = $('a[name="' + window.location.hash.substr(1) + '"]');
    if ($anchor.length > 0) {
      // scroll to the $anchor with the respective offset
      var scrollToOffset = $anchor.offset().top - offset
      setTimeout(function() {
        $.scrollTo(scrollToOffset);
      }, 1);
    }
  }
}

$(function() {
  $('a').each(function() {
    var $anchor = $(this)
      , name    = $anchor.attr('name')
      , href    = $anchor.attr('href');
    if (href === '#' + name) {
      if (!$anchor.hasClass('accordion-toggle')) {
        $anchor.on('click', function(ev) {
          ev.preventDefault();
          window.location.hash = href;
          bootstrapAdjustHash();
        });
      }
    }
  });
});

$(bootstrapAdjustHash);
$(window).bind('hashchange.bootstrap', bootstrapAdjustHash);

$(function() {
  // reset hash so the user's page location always ends up at the hash
  if (location.hash && location.hash !== '')
    location.hash = location.hash;
});

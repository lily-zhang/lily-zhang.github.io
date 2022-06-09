var pages = {
   // 'About' : 'index.html',
   'Drawing' : 'drawing.html',
   'Photography' : 'photos.html',
   'About' : 'about.html',
   // 'Playlist' : 'music.html',
   // 'Web Design' : 'development.html'
}

var isMobile;

$(document).ready(function() {
   isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || $(window).width() < 500;
   $('link#stylesheet')[0].href = isMobile ? 'mobile.css' : 'site.css';

   $('#nav_menu').append(render_links(pages, 'nav_menu_item'));

   if (isMobile) {
      $('#hamburger').on({
         mouseenter: function () { $(this).addClass('hamburger_hover'); },
         mouseleave: function () { $(this).removeClass('hamburger_hover'); }
      });

      $('#hamburger').click(function () {
         if ($('#nav_menu').css('display') == 'none') {
            $('#nav_menu').css('display', 'flex');
         } else {
            $('#nav_menu').css('display', 'none');
         }
      });
   }

   document.title = 'Lily Zhang';
});

function render_links(obj, klass) {
   return Object.keys(obj).reduce(function (acc, title) {
      return `${acc}<a href="${obj[title]}" class="${klass}">${title}</a>`
   }, '');
}

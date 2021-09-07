var pages = {
   'About' : 'index.html',
   'Drawing' : 'drawing.html',
   'Photography' : 'photos.html',
   'Playlist' : 'music.html',
   'Web Design' : 'development.html'
}

$(document).ready(function() {
   $('#nav_menu').append(render_links(pages, 'nav_menu_item'));

   document.title = 'Lily Zhang';
   // $('#nav_title').text('Lily Zhang');
});

function render_links(obj, klass) {
   return Object.keys(obj).reduce(function (acc, title) {
      return `${acc}<a href="${obj[title]}" class="${klass}">${title}</a>`
   }, '');
}

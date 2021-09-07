var web_design = {
   'Import GUI' : 'import_gui.html',
   'Dashboard' : 'dashboard.html',
   'Release Info' : 'version_info.html'
}

var mobile_dev = {
   'Audio Editor' : 'audio_editor.html',
   'Stories Reader' : 'stories.html'
}

function render_menu_items(obj, klass) {
   return Object.keys(obj).reduce(function (acc, title) {
      return `${acc}<span class="${klass}" file="${obj[title]}">${title}</span>`;
   }, '');
}

$(document).ready(function() {

   if($('#nav_icon').css('display') != 'none') {
      $('#content').css('display', 'flex');
      $('#content').css('flex-direction', 'row');
   }

   // Populate writing menu
   $('#writing_menu').append('<h1>Web</h1>');
   $('#writing_menu').append(render_menu_items(web_design, 'writing_menu_item'));

   $('#writing_menu').append('<h1>Mobile</h1>');
   $('#writing_menu').append(render_menu_items(mobile_dev, 'writing_menu_item'));

   // Change link color on hover
   $('.writing_menu_item').css('cursor', 'pointer');
   $('.writing_menu_item').on({
      mouseenter: function () { $(this).addClass('writing_menu_item_hover'); },
      mouseleave: function () { $(this).removeClass('writing_menu_item_hover'); }
   });

   // Populate writing display
   $('.writing_menu_item').click(function() {
      $('.writing_menu_item').css('text-decoration', 'none');
      $(this).css('text-decoration', 'underline dotted');

      // Clear and populate display
      $('#writing_display').empty();
      $.ajax({
        url: `./development/${$(this).attr('file')}`,
        success: function(data) {
          var title = $(`<h1>${$(this).text()}</h1>`).hide();
          var text = $(`<p>${data}</p>`).hide()
          $('#writing_display').append(title, text);
          title.fadeIn();
          text.fadeIn();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          var text = $(`<p>Content unavailable</p>`).hide()
          $('#writing_display').append(text);
          text.fadeIn();
        }
      });
   });
});

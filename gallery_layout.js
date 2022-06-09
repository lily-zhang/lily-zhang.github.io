var files, album_directory, directory_name;

function render_albums(obj, klass) {
   return Object.keys(obj).reduce(function (acc, key) {
      return `${acc}<span class="${klass}">${key}</span>`;
   }, '');
}

function render_thumbnails(obj, album_name, klass) {
   return Object.keys(obj).reduce(function (acc, path) {
      return `${acc}<img src="./${directory_name}/${album_directory[album_name]}/${path}" filename="${path}" class="${klass}" />`;
   }, '');
}

$(document).ready(function() {

   if(!isMobile) {
      $('#content').css('display', 'flex');
      $('#content').css('flex-direction', 'row');
   }

   // Populate album menu
   $('#album_menu').append(render_albums(files, 'album_item'));

   // Cursor, hover
   $('.album_item').css('cursor', 'pointer');
   $('.album_item').on({
      mouseenter: function () { $(this).addClass('album_item_hover'); },
      mouseleave: function () { $(this).removeClass('album_item_hover'); }
   });

   // Populate thumbnail gallery
   $('.album_item').click(function () {
      // Mark link in menu
      $('.album_item').css('text-decoration', 'none');
      $(this).css('text-decoration', 'underline dotted');

      var album_name = $(this).text();
      var album = files[album_name];

      if (isMobile) {
         // Clear thumbnail gallery
         $('#image_menu').fadeOut(300, function() {
            $(this).empty();
            $(this).fadeIn(300);

            // Render thumbnails, re-populate gallery
            var thumbnails = $(render_thumbnails(album, album_name, 'thumbnail')).hide();
            $('#image_menu').append(thumbnails);
            thumbnails.fadeIn(300);

            $('img.thumbnail').on({
               mouseenter: function () { $(this).animate({ opacity: 0.3 }, 150); },
               mouseleave: function () { $(this).animate({ opacity: 1.0 }, 150); }
            });

            // Add listeners to thumbnails
            $('img.thumbnail').click(function () {
               $('#image_display').empty();

               var image = $(`<img src="${$(this).attr('src')}" class="displayed_image" />`);
               var caption = $(`<div class="image_caption">${album[$(this).attr('filename')]}</div>`);

               var image_display = $('#image_display');

               image_display.append(image, caption);
               image_display.fadeIn(150);

               image_display.click(function () {
                  image_display.fadeOut(150);
               });
            });
         });

      } else {
         // Clear image display
         $('#image_display').fadeOut(300, function () {
            $(this).empty();
            $(this).fadeIn(300);
         })
         // Clear thumbnail gallery
         $('#image_menu').fadeOut(300, function() {
            $(this).empty();
            $(this).fadeIn(300);

            // Render thumbnails, re-populate gallery
            var thumbnails = $(render_thumbnails(album, album_name, 'thumbnail')).hide();
            $('#image_menu').append(thumbnails);
            thumbnails.fadeIn(300);

            $('img.thumbnail').on({
               mouseenter: function () { $(this).animate({ opacity: 0.3 }, 150); },
               mouseleave: function () { $(this).animate({ opacity: 1.0 }, 150); }
            });

            // Add listeners to thumbnails
            $('img.thumbnail').click(function () {
               $('#image_display').empty();

               var image = $(`<img src="${$(this).attr('src')}" class="displayed_image" />`).hide();
               var caption = $(`<div class="image_caption">${album[$(this).attr('filename')]}</div>`).hide();

               $('#image_display').append(image, caption);

               image.fadeIn(300);
               caption.fadeIn(300);
            });

            $('img.thumbnail').first().click();
         });
      }
   });

   // Open the first album
   $('.album_item').first().click();
});

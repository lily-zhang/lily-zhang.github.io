var photos = {
   'B/W' : {
      'sculpture.jpg' : '',
      'roses.png' : '',
      'hallway.jpg' : '',
      'multiverse1.png' : '',
      'portrait1.jpg' : '',
      'basketball.jpg' : '',
      'multiverse2.png' : '',
      'flower.png' : '',
   },
   'Campus' : {
      'campus1.jpg' : '',
      'campus2.jpg' : '',
      'campus3.jpg' : '',
      'campus4.jpg' : '',
      'campus5.jpg' : 'Sun rising over Commons',
      'campus6.jpg' : '',
      'campus7.jpg' : '',
      'campus8.jpg' : '',
      'campus9.jpg' : '',
      'campus10.jpg' : '',
      'campus11.jpg' : '',
      'campus12.jpg' : '',
      'campus13.jpg' : '',
      'campus14.jpg' : '',
      'campus15.jpg' : 'Physics in the summer',
      'campus16.jpg' : '',
      'campus17.jpg' : '',
      'campus18.jpg' : '',
      'campus19.jpg' : '',
      'campus20.jpg' : '',
      'campus21.jpg' : '',
      'campus22.jpg' : '',
      'campus23.jpg' : '',
      'campus25.jpg' : '',
      'campus26.jpg' : '',
      'campus27.jpg' : '',
      'campus28.jpg' : '',
      'campus30.jpg' : '',
      'campus31.jpg' : '',
      'campus32.jpg' : ''
   },
   'Travels' : {
      'travels1.jpg' : 'Driving around Oahu',
      'travels2.jpg' : '',
      'travels3.jpg' : '',
      'travels4.jpg' : '',
      'travels5.jpg' : '',
      'travels6.jpg' : '',
      'travels7.jpg' : 'Montpellier – Promenade du Peyrou',
      'travels8.jpg' : '',
      'travels9.jpg' : 'Place du Panthéon',
      'travels10.jpg' : 'Belleville',
      'travels11.jpg' : '',
      'travels12.jpg' : '',
      'travels13.jpg' : ''
   }
   ,'Misc.' : {
      'misc18.jpg' : '',
      'misc19.jpg' : '',
      'misc1.jpg' : '',
      'misc2.jpg' : '',
      'misc3.jpg' : '',
      'misc4.jpg' : '',
      'misc5.jpg' : '',
      'misc6.jpg' : 'Archives in the summer',
      'misc7.jpg' : '',
      'misc8.jpg' : '',
      'misc9.jpg' : '',
      'misc10.jpg' : '',
      'misc11.jpg' : '',
      'misc12.jpg' : '',
      'misc13.jpg' : '',
      'misc14.jpg' : '',
      'misc15.jpg' : '',
      'misc16.jpg' : '',
      'misc17.jpg' : '',
      'misc20.jpg' : ''
   }
}

var album_path = {
   'B/W' : 'bw/',
   'Campus' : 'campus/',
   'Misc.' : 'misc/',
   'Travels' : 'travels/'
}

function render_albums(obj, klass) {
   return Object.keys(obj).reduce(function (acc, key) {
      return `${acc}<span class="${klass}">${key}</span>`;
   }, '');
}

function render_thumbnails(obj, album_name, klass) {
   return Object.keys(obj).reduce(function (acc, path) {
      return `${acc}<img src="./photos/${album_path[album_name]}/${path}" filename="${path}" class="${klass}" />`;
   }, '');
}

$(document).ready(function() {

   if($('#nav_icon').css('display') != 'none') {
      $('#content').css('display', 'flex');
      $('#content').css('flex-direction', 'row');
   }

   // Populate album menu
   $('#album_menu').append(render_albums(photos, 'album_item'));

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
      var album = photos[album_name];

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

         // $('img.thumbnail').hover(function () {
         //    $(this).animate({ opacity: 1.0 }, 500);
         // });

         $('img.thumbnail').on({
            mouseenter: function () { $(this).animate({ opacity: 1.0 }, 300); },
            mouseleave: function () { $(this).animate({ opacity: 0.5 }, 150); }
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
   });
});

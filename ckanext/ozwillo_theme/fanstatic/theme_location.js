"use strict";

/* theme_location
 *
 * This JavaScript module gets a geojson from osm given a location name
 *
 */

ckan.module('theme_location', function ($) {
  return {
    initialize : function () {
      var autocomplete = new kt.OsmNamesAutocomplete(
          'search', 'https://search.osmnames.org/fr/', 'xS5b3xnPgEUW5zi0GvWa');
      autocomplete.registerCallback(function(item) {
          // alert(JSON.stringify(item, ' ', 2));
          var name = item.name;
          var pre_link = 'https://nominatim.openstreetmap.org/search/';
          var post_link = '?polygon_geojson=1&format=json';
          var link = pre_link + name + post_link;
          console.log(link);
          $.get( "https://nominatim.openstreetmap.org/search/nice?polygon_geojson=1&format=json", function( data ) {
              var value = data[0]['geojson'];
          }).fail(function() {
              // If fail, return a simplified geojson of france
              var value = '{"type": "Polygon","coordinates": [[[2.5268554687499996,50.999928855859636],' +
                  '[-1.5600585937499998,48.73445537176822],[-4.94384765625,48.45835188280866],' +
                  '[-0.94482421875,46.07323062540835],[-1.58203125,43.27720532212024],' +
                  '[3.14208984375,42.47209690919285],[4.0869140625,43.54854811091286],' +
                  '[6.240234374999999,43.08493742707592],[7.6025390625,43.723474896114794],' +
                  '[6.30615234375,46.45299704748289],[8.173828125,48.8936153614802],' +
                  '[2.5268554687499996,50.999928855859636]]]}';
          });
          // jquery.get(url:"https://nominatim.openstreetmap.org/search?q=nice");
      });
    }
  };
});
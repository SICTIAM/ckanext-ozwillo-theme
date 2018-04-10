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
          console.log(item);
          console.log(item.name);
          // jquery.get(url:"https://nominatim.openstreetmap.org/search?q=nice");
      });
    }
  };
});
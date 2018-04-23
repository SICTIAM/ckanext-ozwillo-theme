"use strict";

/* theme_location
 *
 * This JavaScript module gets a geojson from osm given a location name
 *
 */

ckan.module('theme_location', function ($) {
  return {
    initialize : function () {
      var obj = document.getElementById("search");
      var val = document.getElementById("spatial-name");
      obj.onchange = function(){nominatim(val.value)};
      val.onchange = function(){autocompletion()};

      var element = document.getElementById('custom_fields');
      element.firstElementChild.firstElementChild.style.display = 'none';

  $( function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp"
    ];
    $( "#spatial-name" ).autocomplete({
      source: availableTags
    });
  } );

      function nominatim(city) {
        var url = 'https://nominatim.openstreetmap.org/search/' + city + '?polygon_geojson=1';
        $.getJSON(url, {
          format:"json"
        })
        .done(function(data) {
          document.getElementById("field-extras-0-key").value = 'spatial';
          document.getElementById("field-extras-0-value").value = JSON.stringify(data[0]['geojson']);
          console.log(JSON.stringify(data[0]['geojson']));
        })
         .fail(function(jqXhr, textStatus, error) {
           console.log("Error: " + textStatus + ", " + error);
        });
      }
    }
  };
});
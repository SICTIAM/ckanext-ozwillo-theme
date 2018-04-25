"use strict";

/* theme_location
 *
 * This JavaScript module gets a geojson from osm given a location name
 * TODO: Find how to manage properly the required field,
 *       Manage the case when the user click nowhere else than validate after typing the location
 *       For now, the request always fails, find why
 *       Find how to manage errors popup language
 *
 */

ckan.module('theme_location', function ($) {
  return {
    initialize : function () {
      var val = document.getElementById("field-spatial-name");
      val.onchange = function(){nominatim(val.value)};
      var myform = document.getElementById("dataset-edit");
      myform.onsubmit = function(){return validateForm()};
      var element = document.getElementById('custom_fields');
      element.firstElementChild.firstElementChild.style.display = 'none';

      $( function() {
        $( "#field-spatial-name" ).autocomplete({
          minLength: 2,
          source: function (request, response) {
            var query = request.term;
            var url = 'https://search.osmnames.org/fr/q/' + query + '.js?key=xS5b3xnPgEUW5zi0GvWa';
            $.ajax( {
              url: url,
              success: function( data ) {
                var results = data['results'];
                var source_result = [];
                results.forEach( function (i) {
                  if (i['type'] === 'administrative') {
                    source_result.push({
                        label: i['display_name'],
                        value: i['display_name']
                    })
                  }
                });
                response( source_result );
              }
            })
          }
        });
      });

      function nominatim(city) {
        var url = 'https://nominatim.openstreetmap.org/search/' + city + '?polygon_geojson=1';
        $.getJSON(url, {
          format:"json"
        })
        .done(function(data) {
          try {
            document.getElementById("field-extras-0-key").value = 'spatial';
            document.getElementById("field-extras-0-value").value = JSON.stringify(data[0]['geojson']);
          } catch (TypeError) {
            alert('Unknown location, please use the suggestions')
          }
        })
        .fail(function(jqXhr, textStatus, error) {
          console.log("Error: " + textStatus + ", " + error);
        });
      }

      function validateForm() {
        if (val.value === '') {
          alert('Please enter a location for your dataset');
          return false;
        }
      }
    }
  };
});
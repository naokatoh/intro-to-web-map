mapboxgl.accessToken = 'pk.eyJ1IjoibmsyOTcwIiwiYSI6ImNreDR4ZTZ4dDBhbngydnF1dzBxNzJvMDkifQ.GXAfMWbXTZ7FOAj3rI2oIg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nk2970/cl3ykyyqn002815p48ctk0pd3',
    zoom: 3.5,
    maxZoom:9,
    minZoom:3,
    center: [-100.5, 37.7]
});

// map1
map.on("load", function () {
    map.addLayer(
      {
        id: "County_Typology_Codes",
        type: "line",
        source: {
          type: "geojson",
          data: "data/countyTypologyCodes.geojson",
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 0.05,
        },
      },
      "waterway" // Here's where we tell Mapbox where to slot this new layer
    ); 
  
    map.addLayer(
      {
        id: "pop_loss",
        type: "fill",
        source: {
          type: "geojson",
          data: "data/countyTypologyCodes.geojson",
        },
        // maxzoom: 6,
        paint: {
          "fill-color": [
            "match",
            ["get", "Pop_Loss_2010"],
            0, "#f1b8b8", //pink
            1, "#dc4e4e", //red
            "#ffffff",
          ],
          "fill-outline-color": "#ffffff",
          "fill-opacity": 0.7,
      },
    },
 "County_Typology_Codes"
 
);
});



//  // Create the popup------------------------------------------
map.on('click', 'pop_loss', function (e) {
    var poploss = e.features[0].properties.Pop_Loss_2010;
    var statename = e.features[0].properties.STATE_NAME;
    var countyname = e.features[0].properties.NAME;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(statename + '<br>' 
        + '<h2>' + countyname + '</h2>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over 
map.on('mouseenter', 'pop_loss', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'pop_loss', function () {
    map.getCanvas().style.cursor = '';
});




// map2
var map2 = new mapboxgl.Map({
  container: 'map2',
  style: 'mapbox://styles/nk2970/cl3zar7m8004r14n9td0sljj5',
  zoom: 5,
  maxZoom:9,
  minZoom:3,
  center: [31.829, 48.770]
});


map2.on("load", function () {
  let layers = map.getStyle().layers;
  let firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          break;
      }
  }



map2.addLayer(
  {
    id: "ukraine",
    type: "circle",
    source: {
      type: "geojson",
      data: "data/ukraineBorderCrossings.geojson",
    },
    'paint': {
      'circle-color': '#ffd700',
      'circle-stroke-color': '#0057b7',
      'circle-stroke-width': 2,
      'circle-radius': 6,

      'circle-radius': ['interpolate', ['exponential', 2], ['zoom'],
      10, ['interpolate', ['linear'], ['get', 'ENTRIES_DIFF'],
          -1, 10,
          -0.4, 1
      ],
      15, ['interpolate', ['linear'], ['get', 'ENTRIES_DIFF'],
          -1, 25,
          -0.4, 12
      ]
  ],
  },
    // minzoom: 3,
  },firstSymbolId
  
);
});



// popup-----------------------------------------------
map2.on('click', 'ukraine', function (e) {
  let countryName = e.features[0].properties.Country;
  let englishName = e.features[0].properties['Name - English'];
  let ukranianName = e.features[0].properties['Name - Ukrainian'];
  
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + countryName + '</h4>'
          +'<p>English Name: <b>'+  englishName + '</b></p>'
          + '<p>Ukraian Name: <b>' + ukranianName + '</b></p>')
      .addTo(map2);
});
// Change the cursor to a pointer when the mouse is over 
map2.on('mouseenter', 'turnstileData', function () {
  map2.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map2.on('mouseleave', 'turnstileData', function () {
  map2.getCanvas().style.cursor = '';
});
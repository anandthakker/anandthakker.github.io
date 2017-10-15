/* global mapboxgl */

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q'

var hoverStyle = {
  version: 8,
  name: 'Basic',
  sources: {
    'states': {
      'type': 'vector',
      'url': 'mapbox://devseed.6qvmq8pf'
    }
  },
  sprite: '',
  glyphs: '',
  layers: [{
    id: 'background',
    type: 'background',
    paint: { 'background-color': '#5b6b6b' }
  }, {
    id: 'states',
    type: 'line',
    source: 'states',
    'source-layer': 'US-States',
    interactive: true,
    paint: { 'line-color': '#314040' }
  }, {
    id: 'states-hover',
    type: 'fill',
    source: 'states',
    'source-layer': 'US-States',
    paint: { 'fill-color': '#0b1a1a' },
    filter: [ 'all',
      [ '==', 'GEOID10', 'NONE' ] // start with a filter that doesn't select anything
    ]
  }]
}

var hovermap = new mapboxgl.Map({
  container: 'hover-map',
  style: hoverStyle,
  center: [-74.50, 40],
  zoom: 4,
  minZoom: 3,
  maxZoom: 8
})

hovermap.on('mousemove', function (e) {
  // query the map for the under the mouse
  hovermap.featuresAt(e.point, { radius: 5, includeGeometry: true }, function (err, features) {
    if (err) throw err
    console.log(e.point, features)
    var ids = features.map(function (feat) { return feat.properties.GEOID10 })

    // set the filter on the hover style layer to only select the features
    // currently under the mouse
    hovermap.setFilter('states-hover', [ 'all',
      [ 'in', 'GEOID10' ].concat(ids)
    ])
  })
})

var choroStyle = {
  version: 8,
  name: 'Basic',
  sources: {
    'us-counties': {
      'type': 'vector',
      'url': 'mapbox://devseed.us-counties'
    }
  },
  sprite: '',
  glyphs: '',
  layers: [{
    id: 'background',
    type: 'background',
    paint: { 'background-color': '#000' }
  }]
}

var breaks = [0, 4, 16, 64, 256, 1024, 4096, 16384, 65536]

for (var p = 0; p < breaks.length; p++) {
  var filters
  if (p < breaks.length - 1) {
    filters = [ 'all',
      [ '>=', 'pop_density', breaks[p] ],
      [ '<', 'pop_density', breaks[p + 1] ]
    ]
  } else {
    filters = [ 'all',
      [ '>=', 'pop_density', breaks[p] ]
    ]
  }
  choroStyle.layers.push({
    id: 'counties-pop-' + p,
    type: 'fill',
    source: 'us-counties',
    'source-layer': 'counties',
    paint: {
      'fill-color': '#5b6b6b',
      'fill-opacity': (p + 1) / breaks.length
    },
    filter: filters
  })
}

var choro = new mapboxgl.Map({
  container: 'color-map',
  style: choroStyle,
  center: [-90, 38.5],
  zoom: 3 // starting zoom
})


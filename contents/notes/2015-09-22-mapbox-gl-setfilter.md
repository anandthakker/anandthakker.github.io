---
title: "Interative & Data-driven Styles with Mapbox GL JS"
date: 2015-09-22
template: article.jade
filename: /:year/:month/:day/:title/index.html
tags:
  - maps
  - javascript
  - gl
scripts:
  - https://api.tiles.mapbox.com/mapbox-gl-js/v0.11.0/mapbox-gl.js
  - /notes/mapbox-gl-data-driven/script.js
styles:
  - https://api.tiles.mapbox.com/mapbox-gl-js/v0.11.0/mapbox-gl.css
---

**tl;dr:** Mapbox GL JS feels like the future of web maps, promising
data-driven styles (e.g. a color scale) and interaction-driven styles (e.g.
`:hover`).  They're still in the works as first-class features of the API, but
it's possible--through some mild workarounds--to make them work today.
Examples with code [below](#hover).

## Interactivity vs Rich Visual Style

[Mapbox GL JS][1] is awesome.  Until it came along, there often seemed to be
deep, difficult tradeoffs in web maps between interactivity and rich visual
styling.  For interactivity, you could send your geographic data to the browser
as GeoJSON (or something) and render it there, but that meant there were real
limits to how much you could feasibly visualize on your map.  Alternatively, you
could use a tool like [Mapbox Studio
Classic][2] to render rich,
beautiful, data-driven maps that could be served to the browser efficiently as
image tiles, but then you don't have the underlying data, and thus you can't
have interactivity.

Libraries like [Leaflet][3] (and [Mapbox.js][4], and many
others) do a pretty great job at helping do both of these at once, but as great
as those libraries are, it's still a weird dance decomposing a map into some
layers that are static and richly visualized, and others that are interactive
but leaner, data-wise.  And maintaining such a setup over time can quickly
progress from annoying to unmanageable.

## Have & Eat Cake

With Mapbox GL, instead of having to juggle these two approaches, we genuinely
get the best of both worlds.  The server side serves up the geo data with
astonishing efficiency using [vector tiles][5], and the client side styles and
renders it. It's an elegant and effective, and it's the right division of
responsibilities between . (Read more here: [What's in a Mapbox Studio Style][6].)

Mapbox GL JS is easily badass enough already to be used for many production
applications--e.g. at [Dev Seed](https://developmentseed.org) we used it to make
an interactive visualization of electricity use in 600,000 villages across India
every month for the past 20 years. It's pretty easy to get started with it, too:
it's already documented with [good examples of basic usage](https://www.mapbox.com/mapbox-gl-js/examples/), and nice, complete [API documentation](https://www.mapbox.com/mapbox-gl-js/api/).

But there are a couple of key pieces that are still in the works: namely,
[**data-driven styles**][7] and [**interaction-driven styles**][8].  In the near
future, it looks like both of these will be made first-class features of the
API.  When that happens, it will be possible to design these things directly
from the new hotness that is [Mapbox Studio][9] (which is in private beta at the
time I'm writing this). In the meantime, though, it's actually not too hard to
do it now. I'll show how below, but if you've never touched Mapbox GL JS,
it's probably worth looking through the basic examples first.

## Layers and Filters

The key to doing both of these is the [`filter`][10] feature of Mapbox GL
styles.  Each layer in a Mapbox GL style pulls features from a data source and
paints them according to style rules (like `fill-opacity`, or `text-size`).
Until data-driven styling is implemented, the values for these style rules have
to be constant for each layer.  But layers also have a `filter` property that
lets us set up rules for *which* features they actually pull from the source,
and these rules are data driven: they're basically simple functions of the
features' properties.

## Hover

<div style="width: 100%; height: 400px; position: relative;">
<div id="hover-map" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%"></div>
</div>

Here's a simple example of a 'hover' style.  It works by making two copies of
the layer of interest: one with the normal style, and one with the special hover
style.  Then, on `mousemove`, we use the `featuresAt` method to see what
feature(s) we're hovering over, and use that information to update the hover
layer's `filter` property to only select those features.  In code:

```javascript
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
  }, { // this is our normal layer to draw the states
    id: 'states',
    type: 'line',
    source: 'states',
    'source-layer': 'US-States',
    interactive: true,
    paint: { 'line-color': '#314040' }
  }, { // this layer will only styled the state that's currently hovered
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
```

[Full code here.](http://bl.ocks.org/anandthakker/69afa4bfb0c4f5778785)

## Data-driven color scale

<div style="width: 100%; height: 400px; position: relative;">
<div id="color-map" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%"></div>
</div>

Here's an example of making a color scale based on
population density (stored as the `pop_density` property on each feature).
Similar to the hover, it works by creating multiple layers--in this case, one
for *each level* of the color scale.  Then, for each level, we set the filter to
select only the features that have a `pop_density` value in the relevant range
for that level.  In code:

```javascript
var chorostyle = {
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

// the logarithmic scale we'll use
var breaks = [0, 4, 16, 64, 256, 1024, 4096, 16384, 65536]

// for each level, we set the filter to choose features with population
// density values between two consecutive values from the scale
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
      // set the opacity based on the level
      'fill-opacity': (p + 1) / breaks.length
    },
    filter: filters
  })
}

var choro = new mapboxgl.Map({
  container: 'color-map',
  style: choroStyle,
  center: [-74.50, 40],
  zoom: 3
})
```

[Full code here.](http://bl.ocks.org/anandthakker/52d26ae7b71b7e23c279)

## More

These are just the simplest examples of the data-rich, interactive maps enabled
by Mapbox GL JS. To take this stuff a bit further, check out Justin Miller's [Anatomy of a travel map](http://justinmiller.io/posts/2015/01/20/anatomy-of-a-travel-map/), which
walks through a more complete (and complex) application of these techniques, and also
nicely explains how to create and upload your own vector tile data.

[1]: https://www.mapbox.com/mapbox-gl-js/api/
[2]: https://www.mapbox.com/mapbox-studio-classic/#darwin
[3]: http://leafletjs.com/
[4]: https://www.mapbox.com/mapbox.js/api/v2.2.2/
[5]: https://www.mapbox.com/developers/vector-tiles/
[6]: https://www.mapbox.com/blog/whats-in-a-mapbox-studio-style/
[7]: https://github.com/mapbox/mapbox-gl-js/milestones/Data%20Driven%20Styles
[8]: https://github.com/mapbox/mapbox-gl-js/issues/200
[9]: https://www.mapbox.com/studio/
[10]: https://www.mapbox.com/mapbox-gl-style-spec/#filter

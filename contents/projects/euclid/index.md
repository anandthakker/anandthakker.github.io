---
title: "Euclidean geometry in JS."
date: 2014-12-03
type: project
template: article.jade
github: anandthakker/euclid
description: >
  Model Euclidean geometry, and draw/interact with it in the browser using d3.
  (The dynamic background on the home page is an example of this.)
tags:
  - d3js
  - geometry
  - visual
---

After seeing the [incredible geometric designs][1] throughout the Alhambra in
Granada, I wanted to try to explore some of the underlying symmetry and
geometry. I could have jumped straight to the tessellations, but it felt like
a deeper way to get into it would be to build up from basic constructions, and
so, over the course of a few train rides, I started with this little library for
building and rendering plane geometry scenes. [Demo][2] / [Code][3].

Example:

```javascript
var geom = require('euclid'),
    svg = document.querySelector('svg'),
    scene = new geom.Scene({left: 0, right: 500, top: 0, bottom: 500}),
    render = geom.renderer(scene, svg);
    
scene
  .point(200, 250)
  .point(300, 250)
  .segment(0,1)
  .circle(0,1)
  .circle(1,0)
  .line(0,2)
  .segment(0,3)
  .segment(4,1)
  .segment(2,6)
  
render();
```

`point()` takes coordinates; `circle`, 
`line`, and `segment` each take two point indexes.  E.g., `circle(1,0)` adds
a circle centered at point 1 and with point 0 on the circle.  As shapes are added,
any new intersections points are added to the scene, which is how things like 
`segment(2,6)` can work even though we only created two initial points.  

## Problems
1. This API is too simplistic, because as you drag points around, it's possible to change the number of intersections, which of course breaks things. I'll change this soon to something like:
   ```javascript
   scene.point('A',x1,y1)
   .point('B',x2,y2)
   .circle({center: 'A', radius: 'AB'})
   .circle({center: 'B', radius: 'BA'})
   .intersection('C', [{circle: 'A'}, {circle: 'B'}]) // would arbitrarily choose one?
   ```
   That's a less ambiguous way to define a diagram, and then objects depending on an intersection can just be invalidated when they cease to exist and added back if they reappear. (Or actions that would remove a labeled intersection could be prevented.)

2. It's a little slow right now because it calculates intersections between every pair of objects each frame; I expect I'll need to optimize that with a modified `sweepline` algorithm when I start upping the number of objects in the scene.

## Next up, based on this:
1. A tessellation builder using this that will, hopefully, be simultaneously simple to use
  and true to the underlying geometry.
2. A geometry proof parser that attempts to generate diagrams based on the text in 
  a proof. (This is very ambitious, but would be very cool.)


[1]: https://www.google.com/search?q=alhambra+geometry&espv=2&tbm=isch&tbo=u&source=univ&sa=X&ei=pXR_VL-TGob5asH2guAG&ved=0CDgQsAQ&biw=1146&bih=672
[2]: https://github.com/anandthakker/euclid
[3]: http://anandthakker.github.io/euclid/

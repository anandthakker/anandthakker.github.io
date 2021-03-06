---
title: "Euclidean geometry in JS."
date: 2014-12-03
type: project
template: experiment.jade
github: anandthakker/euclid
description: >
  Model Euclidean geometry, and draw/interact with it in the browser using d3.
  (The dynamic background on the home page is an example of this.)
tags:
  - d3js
  - node
  - geometry
  - visual
scripts:
  - http://d3js.org/d3.v3.min.js
  - /js/geometry.js
  - script.js
styles:
  - style.css
---

<svg class="geometry" viewbox="0 0 500 500" preserveAspectRatio="xMidYMin meet">
</svg>

After seeing the [incredible geometric designs][1] throughout the Alhambra in
Granada, I wanted to try to explore some of the underlying symmetry and
geometry. I could have jumped straight to the tessellations, but it felt like
a deeper way to get into it would be to build up from basic constructions, and
so, over the course of a few train rides, I started with this little 
library--**EuclidJS**--for building and rendering plane geometry scenes.
[Code on Github][3].

Building the scene can be done programmatically with a [simple API][2], or by
describing the it with a (sort of) friendly grammar that Euclid can parse.
The diagram above comes from the text below (which you can edit, at your own
risk!).

<div class="message">
</div>
<textarea class="code">
[main-figure]
Let a = (150, 100).
Let b = (350, 300).
Let c = (300, 400).
Draw a segment joining a and b.
Draw a segment with endpoints b and c.
Draw a segment from a to c.

[guides]
Let k be a circle through b centered at a.
Let l be a circle containing a with center b.
Let m be the circle centered at b through c.
Let n be the circle centered at c containing b.
d = the intersection of k and l
e = the intersection of k and l that is not d
f = the intersection of m and n
g = the intersection of m and n that is not f

[result]
Let O be the intersection of line d-e and line f-g
Draw the circle centered at O containing a.
</textarea>



## Next up:
1. I'd still like to make the grammar more flexible (and thus concise), with, e.g.,
   things like "Let d and e be the points where circles a and b intersect",
   or even "Let v be the line determined by the points where circles a and b 
   intersect".
1. A tessellation builder using this that will, hopefully, be simultaneously simple to use
  and true to the underlying geometry.
2. A geometry proof parser that attempts to generate diagrams based on the text in 
  a proof. (This is very ambitious, but would be very cool.)


[1]: https://www.google.com/search?q=alhambra+geometry&espv=2&tbm=isch&tbo=u&source=univ&sa=X&ei=pXR_VL-TGob5asH2guAG&ved=0CDgQsAQ&biw=1146&bih=672
[2]: https://anandthakker.github.io/euclid/
[3]: https://github.com/anandthakker/euclid
[4]: https://anandthakker.github.io/euclid/parse.html

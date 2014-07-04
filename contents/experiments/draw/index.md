---
title: "Drawing simplified lines"
description: "Using line simplification and Bezier curves to capture smooth user-drawn curves."
tags:
  - line-simplification
  - canvas
date: 2014-06-19
template: experiment.jade
scripts:
  - /js/vendor/simplify.js
  - script.js
styles:
  - style.css
---

Draw something in the box below. As you draw, the mouse/touch coordinates
are captured at *each* mouseMove.  When you stop drawing, the resulting array
of points is simplified using [Simplify.js][1]


<canvas id="canvas" width="900" height="600">
</canvas>


[1]:http://mourner.github.io/simplify-js/

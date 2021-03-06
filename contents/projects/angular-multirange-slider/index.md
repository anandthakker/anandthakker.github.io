---
title: "AngularJS multi-range slider"
date: 2014-03-02
type: experiment
template: article.jade
github: anandthakker/angular-multirange-slider
description: >
  An Angular directive for a multi-range slider widget, to allow user to input
  multiple ranges that add to a fixed total.
tags:
  - AngularJS
  - widget
  - front-end
---

I needed a slider that could be used to choose choose a list of
probabilities that always add up to 1. I could have used a text input or
slider for each probability and link it up so that changing one would
update the others, but that's a fairly clunky interaction. This approach
isn't perfect, but I think it's better...

Code: [Codepen](http://codepen.io/anandthakker/pen/marlo)
| [Github](https://github.com/anandthakker/angular-multirange-slider)


##Usage

```html
<slider model="arrayOfValues"></slider>
```

`arrayOfValues` is an array of numbers: the range values, in order from
left to right.

or

```html
<slider model="arrayOfObjects" property="prop"></slider>
```

`arrayOfObjects` is an array of objects and `prop` is the property from
which to pull the range value from each object.

Either of these can also take a `step` attribute, which locks the values
into multiples of the given step size.

For styling: the markup generated is a
containing `div` (`.slider-control`), a `div` for the actual slider bar
(`.slider`, the js sets `position: relative`), and an
absolutely-positioned `div` for each handle (`.slider-handle`). The
handles are children of the slider div, and their positioning is a
percentage of the slider's width, so the whole
thing *should* stretch/shrink to fit its containing element. For
example:

```html
    <div class="slider-control ng-isolate-scope" model="otherProbs">
      <div class="slider" style="position: relative;">
        <div class="slider-handle" style="position: absolute; left: 30%; top: -8px;"></div>
        <div class="slider-handle" style="position: absolute; left: 60%; top: -8px;"></div>
      </div>
    </div>
```

**Todo**
--------

-   Allow comprehension expressions as a more flexible (and common)
    alternative to the `model`/`property`approach.
-   Option for labeling ranges?

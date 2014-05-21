---
title: "WTF: position: fixed and z-index on Safari"
date: 2014-04-22
template: article.jade
filename: /:year/:month/:day/:title/index.html
tags:
  - browser quirks
  - css
  - safari
  - wtf

type: regular
---

Safari seems not to respect z-indexes until after browser window is
resized. Open up [this file](/experiments/safari-position-fixed-z-index-issue.html) in
Safari 7.0.3 on OS X.

To investigate next: what else, besides browser resize, will force the
z-index layering to be correct?  Modifying the style of the relevant
elements (either before scrolling up or after)?   Any repaint (again,
either before scrolling up or after)?



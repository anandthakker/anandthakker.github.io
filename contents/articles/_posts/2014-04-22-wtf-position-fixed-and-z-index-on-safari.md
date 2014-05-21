---
title: "WTF- position- fixed and z-index on Safari"
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
resized. Copy the following code into an HTML file and open it up in
Safari 7.0.3 on OS X.

    <!DOCTYPE html>
    <html>
      <head>
        <style>
          h1 {
            position: fixed;
            z-index: 100;
            background: red;
          }
          header {
            min-height: 100px;
          }
          p {
            position: relative;
            z-index: 200;
            min-height: 1000px;
            background: blue;
          }
        </style>
      </head>

      <body>
        <header>
          <h1>Title 1</h1>
        </header>
        <p>Open this up in Safari (7.0.3 at time of writing) and scroll down.  The blue box is layered beneath the red header, even though
          it has a higher z-index.  If you resize the browser window, suddenly the layering is correct.  What's up with that?</p>
      </body>

    </html>

To investigate next: what else, besides browser resize, will force the
z-index layering to be correct?  Modifying the style of the relevant
elements (either before scrolling up or after)?   Any repaint (again,
either before scrolling up or after)?



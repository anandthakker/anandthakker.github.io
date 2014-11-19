---
title: "AngularJS Click-Off Directive"
description: An ngClick-like directive for when user clicks OFF the element.
date: 2014-02-25
type: experiment
tags:
  - AngularJS
template: experiment.jade
scripts:
  - http://code.angularjs.org/angular-1.0.1.js
  - script.js
styles:
  - style.css
---

Here's a reusable little counterpart to `ng-click` for invoking JS when user
clicks *off* an element.  Useful for dismissable messages.

**Example:**

```html
<div ng-app="myApp">
  <div class="button" 
      ng-click="show=true;"
      click-off="show=false;">
      Click Me
  </div>
  <div class="message" ng-show="show" ng-init="show = false">
    You clicked on the button. Now click anywhere else...
  </div>
</div>
```

**Result:**

<div ng-app="myApp">
  <div class="button" 
      ng-click="show=true;"
      click-off="show=false;">
      Click Me
  </div>
  <div class="message" ng-show="show" ng-init="show = false">
    You clicked on the button. Now click anywhere else...
  </div>
</div>


**Code:**
```javascript
var myApp = angular.module('myApp',[]);

myApp.directive('clickOff', function($parse, $document) {
    var dir = {
        compile: function($element, attr) {
          // Parse the expression to be executed
          // whenever someone clicks _off_ this element.
          var fn = $parse(attr["clickOff"]);
          return function(scope, element, attr) {
            // add a click handler to the element that
            // stops the event propagation.
            element.bind("click", function(event) {
              event.stopPropagation();
            });
            angular.element($document[0].body).bind("click",                                                                 function(event) {
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            });
          };
        }
      };
    return dir;
});
```

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var canvas, circles, clear, ctx, dist, drawing, mouseCoords, move, render, start, stop;
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    circles = [];
    drawing = false;
    mouseCoords = function(canvas, e) {
      var rect, x, y, _ref, _ref1, _ref2, _ref3;
      rect = canvas.getBoundingClientRect();
      x = (_ref = e.clientX) != null ? _ref : (_ref1 = e.changedTouches) != null ? _ref1[0].clientX : void 0;
      y = (_ref2 = e.clientY) != null ? _ref2 : (_ref3 = e.changedTouches) != null ? _ref3[0].clientY : void 0;
      return [(x - rect.left) / rect.width * canvas.width, (y - rect.top) / rect.height * canvas.height];
    };
    clear = function() {
      return ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    render = function(_arg) {
      var radius, x, y, _ref;
      (_ref = _arg.center, x = _ref[0], y = _ref[1]), radius = _arg.radius;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, radius, 0, 6.29);
      ctx.stroke();
      return ctx.closePath();
    };
    dist = function(x1, y1, x2, y2) {
      var dx, dy;
      console.log(x1, y1, x2, y2);
      dx = x1 - x2;
      dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    };
    move = function(e) {
      var circle, x, y, _i, _len, _ref, _results;
      if (!drawing) {
        return;
      }
      e.preventDefault();
      _ref = mouseCoords(this, e), x = _ref[0], y = _ref[1];
      circle = circles[circles.length - 1];
      circle.radius = dist(x, y, circle.center[0], circle.center[1]);
      clear();
      _results = [];
      for (_i = 0, _len = circles.length; _i < _len; _i++) {
        circle = circles[_i];
        _results.push(render(circle));
      }
      return _results;
    };
    start = function(e) {
      drawing = true;
      return circles.push({
        center: mouseCoords(this, e),
        radius: 0
      });
    };
    stop = function() {
      var circle, _i, _len, _results;
      drawing = false;
      clear();
      _results = [];
      for (_i = 0, _len = circles.length; _i < _len; _i++) {
        circle = circles[_i];
        _results.push(render(circle));
      }
      return _results;
    };
    canvas.addEventListener('mousemove', move, false);
    canvas.addEventListener('touchmove', move, false);
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('mouseup', stop);
    return canvas.addEventListener('touchend', stop);
  });

}).call(this);

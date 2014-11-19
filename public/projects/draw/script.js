(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var canvas, ctx, drawing, info, lines, mouseCoords, move, printCoords, render, start, stop;
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    info = d3.select('#info');
    info.append('div').attr('class', 'original-line').append('h4').text('original');
    info.append('div').attr('class', 'simplified-line').append('h4').text('simplified');
    printCoords = function(parent, line) {
      var el, fmt, txt;
      fmt = d3.format('.0f');
      txt = function(d, i) {
        return "" + (fmt(d.x)) + "," + (fmt(d.y));
      };
      el = d3.select(parent).selectAll('div').data(line).text(txt);
      el.enter().append('div').text(txt);
      return el.exit().remove();
    };
    mouseCoords = function(canvas, e) {
      var rect, x, y, _ref, _ref1, _ref2, _ref3;
      rect = canvas.getBoundingClientRect();
      x = (_ref = e.clientX) != null ? _ref : (_ref1 = e.changedTouches) != null ? _ref1[0].clientX : void 0;
      y = (_ref2 = e.clientY) != null ? _ref2 : (_ref3 = e.changedTouches) != null ? _ref3[0].clientY : void 0;
      return [(x - rect.left) / rect.width * canvas.width, (y - rect.top) / rect.height * canvas.height];
    };
    drawing = false;
    lines = [];
    render = function(line) {
      var x, y, _i, _len, _ref;
      ctx.beginPath();
      for (_i = 0, _len = line.length; _i < _len; _i++) {
        _ref = line[_i], x = _ref.x, y = _ref.y;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      return ctx.closePath();
    };
    move = function(e) {
      var currentLine, prev, x, y, _ref;
      if (!drawing) {
        return;
      }
      e.preventDefault();
      _ref = mouseCoords(this, e), x = _ref[0], y = _ref[1];
      currentLine = lines[lines.length - 1];
      currentLine.push({
        x: x,
        y: y
      });
      if (!(currentLine.length > 1)) {
        return;
      }
      prev = currentLine[currentLine.length - 2];
      ctx.beginPath();
      ctx.lineTo(prev.x, prev.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      return ctx.closePath();
    };
    start = function() {
      drawing = true;
      return lines.push([]);
    };
    stop = function() {
      var currentLine, line, simplifiedLine, _i, _len, _results;
      drawing = false;
      currentLine = lines[lines.length - 1];
      simplifiedLine = simplify(currentLine, 5);
      printCoords('.original-line', currentLine);
      printCoords('.simplified-line', simplifiedLine);
      lines[lines.length - 1] = simplifiedLine;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      _results = [];
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        _results.push(render(line));
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

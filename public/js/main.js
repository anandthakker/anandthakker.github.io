(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var expandable, html, node, _i, _len, _results;
    html = document.querySelector('html');
    if (!html.classList) {
      html.className = html.className.replace(/(^|\b)js(\b|$)/gi, ' ');
    }

    /* Expand/Collapse */
    expandable = document.querySelectorAll('.resume [data-has-details] h4');
    _results = [];
    for (_i = 0, _len = expandable.length; _i < _len; _i++) {
      node = expandable[_i];
      _results.push(node.addEventListener('click', function(e) {
        var _ref;
        if ((!this.parentElement.classList.contains('collapse')) && ((_ref = window.getSelection()) != null ? _ref.toString().length : void 0) > 0) {
          return;
        }
        return this.parentElement.classList.toggle('collapse');
      }));
    }
    return _results;
  });

}).call(this);

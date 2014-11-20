(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var beforePrint, email, emailstring, expandable, html, mediaQueryList, node, onmouseover, _i, _len;
    html = document.querySelector('html');
    if (!html.classList) {
      html.className = html.className.replace(/(^|\b)js(\b|$)/gi, ' ');
    }

    /* Expand/Collapse */
    expandable = document.querySelectorAll('.resume [data-has-details] h4');
    for (_i = 0, _len = expandable.length; _i < _len; _i++) {
      node = expandable[_i];
      node.addEventListener('click', function(e) {
        var _ref;
        if ((!this.parentElement.classList.contains('collapse')) && ((_ref = window.getSelection()) != null ? _ref.toString().length : void 0) > 0) {
          return;
        }
        return this.parentElement.classList.toggle('collapse');
      });
    }
    emailstring = ['m', 'e', '@', 'a', 'n', 'a', 'n', 'd', '.', 'c', 'o', 'd', 'e', 's'].join('');
    email = document.querySelector('[href^=emailaddress]');
    if (email) {
      email.addEventListener('mouseover', onmouseover = function() {
        this.setAttribute('href', 'mailto:' + emailstring);
        return this.removeEventListener('mouseover', onmouseover);
      });
    }

    /*
    From http://tjvantoll.com/2012/06/15/detecting-print-requests-with-javascript/
     */
    beforePrint = function() {
      var emailNode;
      emailNode = document.querySelector('.email');
      emailNode.innerHTML = emailstring;
    };
    if (window.matchMedia) {
      mediaQueryList = window.matchMedia("print");
      if (mediaQueryList.matches) {
        beforePrint();
      }
      mediaQueryList.addListener(function(mql) {
        if (mql.matches) {
          return beforePrint();
        }
      });
    }
    return window.onbeforeprint = beforePrint;
  });

}).call(this);

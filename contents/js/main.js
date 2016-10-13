document.addEventListener('DOMContentLoaded', function () {
  var html = document.querySelector('html')
  if (!html.classList) {
    // must be < IE 10; remove 'js' class from html element.
    html.className = html.className.replace(/(^|\b)js(\b|$)/ig, ' ')
  }

  // ## Expand/Collapse ###
  document.querySelectorAll('.resume [data-has-details] h4')
  .forEach(node => node.addEventListener('click', e => {
    if (!node.parentElement.classList.contains('collapse') &&
    (window.getSelection() || '').toString().length) {
      return
    } else {
      return node.parentElement.classList.toggle('collapse')
    }
  }))

  // dodge the robots
  var emailstring = [ 'm', 'e', '@', 'a', 'n', 'a', 'n', 'd', '.', 'c', 'o', 'd', 'e', 's' ].join('')
  var email = document.querySelector('[href^=emailaddress]')
  function onmouseover () {
    this.setAttribute('href', 'mailto:' + emailstring)
    return this.removeEventListener('mouseover', onmouseover)
  }
  if (email) { email.addEventListener('mouseover', onmouseover) }

  /*
  From http://tjvantoll.com/2012/06/15/detecting-print-requests-with-javascript/
  */
  var beforePrint = function () {
    var emailNode = document.querySelector('.email')
    emailNode.innerHTML = emailstring
    return
  }

  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print')
    if (mediaQueryList.matches) { beforePrint() }
    mediaQueryList.addListener(function (mql) {
      if (mql.matches) { return beforePrint() }
    })
  }

  window.onbeforeprint = beforePrint
})

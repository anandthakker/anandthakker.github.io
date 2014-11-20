
document.addEventListener 'DOMContentLoaded', ->
  
  html = document.querySelector('html')
  if not html.classList
    # must be < IE 10; remove 'js' class from html element.
    html.className = html.className.replace(/(^|\b)js(\b|$)/gi,' ')
  
  ### Expand/Collapse ###
  expandable = document.querySelectorAll('.resume [data-has-details] h4')
  for node in expandable
    node.addEventListener 'click', (e)->
      return if ((not this.parentElement.classList.contains('collapse')) and
      window.getSelection()?.toString().length > 0)
      
      this.parentElement.classList.toggle('collapse')


  emailstring = [ 'm', 'e', '@', 'a', 'n', 'a', 'n', 'd', '.',
  'c', 'o', 'd', 'e', 's' ].join('')
  email = document.querySelector('[href^=emailaddress]')
  if email then email.addEventListener('mouseover', onmouseover = ->
    @setAttribute('href', 'mailto:'+emailstring)
    @removeEventListener('mouseover', onmouseover)
  )

  ###
  From http://tjvantoll.com/2012/06/15/detecting-print-requests-with-javascript/
  ###
  beforePrint = ->
    emailNode = document.querySelector('.email')
    emailNode.innerHTML = emailstring
    return

  if window.matchMedia
    mediaQueryList = window.matchMedia("print")
    if mediaQueryList.matches then beforePrint()
    mediaQueryList.addListener (mql) ->
      if mql.matches then beforePrint()

  window.onbeforeprint = beforePrint

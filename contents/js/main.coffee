
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

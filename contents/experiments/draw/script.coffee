
document.addEventListener 'DOMContentLoaded', ()->

  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  message = document.getElementById('message')
  log = (s)->
    message.innerHTML = s

  mouseCoords = (canvas, e) ->
    rect = canvas.getBoundingClientRect()
    x = e.clientX ? e.changedTouches?[0].clientX
    y = e.clientY ? e.changedTouches?[0].clientY
    [
      (x - rect.left) / rect.width * canvas.width
      (y - rect.top) / rect.height * canvas.height
    ]


  drawing = false
  lines = []

  render = (line)->
    ctx.beginPath()
    for {x: x,y: y} in line
      ctx.lineTo(x,y)
    ctx.stroke()
    ctx.closePath()

  move = (e)->
    return unless drawing

    e.preventDefault()

    [x,y] = mouseCoords(this, e)

    currentLine = lines[lines.length - 1]
    currentLine.push {x: x,y: y}

    return unless currentLine.length > 1
    prev = currentLine[currentLine.length - 2]
    ctx.beginPath()
    ctx.lineTo(prev.x, prev.y)
    ctx.lineTo(x,y)
    ctx.stroke()
    ctx.closePath()
    # render(currentLine)


  start = ()->
    drawing = true
    lines.push []

  stop = ()->
    drawing = false
    currentLine = lines[lines.length - 1]
    lines[lines.length - 1] = simplify currentLine, 5

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for line in lines
      render(line)


  canvas.addEventListener 'mousemove', move, false
  canvas.addEventListener 'touchmove', move, false
  canvas.addEventListener 'mousedown', start
  canvas.addEventListener 'touchstart', start
  canvas.addEventListener 'mouseup',stop
  canvas.addEventListener 'touchend', stop

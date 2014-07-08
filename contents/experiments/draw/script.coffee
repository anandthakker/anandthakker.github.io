
document.addEventListener 'DOMContentLoaded', ()->

  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  info = d3.select('#info')
  info.append('div').attr('class', 'original-line')
    .append('h4').text('original')
  info.append('div').attr('class', 'simplified-line')
    .append('h4').text('simplified')


  printCoords = (parent, line)->
    fmt = d3.format('.0f')
    txt = (d,i)->"#{fmt(d.x)},#{fmt(d.y)}"
    el = d3.select(parent).selectAll('div')
    .data(line)
    .text txt
    el.enter().append('div')
    .text txt
    el.exit().remove()



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
    simplifiedLine = simplify currentLine, 5

    printCoords('.original-line', currentLine)
    printCoords('.simplified-line', simplifiedLine)

    lines[lines.length - 1] = simplifiedLine

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for line in lines
      render(line)


  canvas.addEventListener 'mousemove', move, false
  canvas.addEventListener 'touchmove', move, false
  canvas.addEventListener 'mousedown', start
  canvas.addEventListener 'touchstart', start
  canvas.addEventListener 'mouseup',stop
  canvas.addEventListener 'touchend', stop

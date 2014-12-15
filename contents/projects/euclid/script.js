function init() {
  var svg = document.querySelector('svg');
  var viewBox = svg.viewBox.baseVal,
    width = viewBox.width,
    height = viewBox.height,
    scene = new geom.Scene({
      left: viewBox.x,
      top: viewBox.y,
      right: viewBox.x + width,
      bottom: viewBox.y + height
    }),
    render = geom.renderer(scene, svg);

  var text = document.querySelector('textarea');
  var message = document.querySelector('.message');
  text.addEventListener('keyup', parse);

  function parse() {
    geom.parse(scene, text.value.trim(), onparsed);
  }

  function onparsed(res, err) {
    if (err) {
      message.innerText = err.line + ':' + err.column + ': ' + err.message;
    } else {
      message.innerText = '';
      update();
    }
  }

  parse();


  function update() {
    scene.update();
    render();
    d3.selectAll('.free-point').call(geom.behavior.move.point(update));
    d3.selectAll('.circle').call(geom.behavior.move.circle(update));
    d3.selectAll('.line').call(geom.behavior.move.line(update));
  }

  update();
}

document.addEventListener('DOMContentLoaded', init)

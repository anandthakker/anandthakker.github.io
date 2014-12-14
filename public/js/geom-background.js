function init() {
  var svg = document.querySelector('svg'),
  viewBox = svg.viewBox.baseVal,
  width = viewBox.width,
  height = viewBox.height;
  
  /* align 0,0 to the "axis" origin */
  var header = document.querySelector('.site-header h1').getBoundingClientRect(),
  svgbox = svg.getBoundingClientRect(),
  shiftx = (header.left - svgbox.left)/svgbox.width*width + 36,
  shifty = (header.bottom - svgbox.top)/svgbox.height*height;
  
  d3.select(svg).append('g')
  .attr('transform', 'translate('+shiftx+','+shifty+')'); // -185, 246
  
  /* setup geom scene */
  var g = document.querySelector('svg g');
  
  var scene = new geom.Scene({
    width: width,
    height: height,
    left: viewBox.x,
    top: viewBox.y,
    right: viewBox.x + width,
    bottom: viewBox.y + height
  })
  var render = geom.renderer(scene, g);
  
  function parse() {
    var text = document.querySelector('.geometry-text').value;
    scene.parse(text);
  }
  
  function update() {
    scene.updateIntersections();
    render();
    d3.selectAll('.free-point').call(geom.behavior.move.point(update));
    d3.selectAll('.circle').call(geom.behavior.move.circle(update));
    d3.selectAll('.line').call(geom.behavior.move.line(update));
  }
  
  geom.behavior.follow(g, scene.P(1), update);
  
  parse();
  update();
}

document.addEventListener('DOMContentLoaded', init)

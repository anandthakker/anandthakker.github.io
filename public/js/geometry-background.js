function init() {
  
  var aboutLink = document.querySelector('.about-background > a')
  aboutLink.addEventListener('click', function(e) {
    this.parentElement.classList.toggle('collapse');
    e.preventDefault();
  });
  
  
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
    left: viewBox.x - shiftx,
    top: viewBox.y - shifty,
    right: viewBox.x + width - shiftx,
    bottom: viewBox.y + height - shifty
  })
  var render = geom.renderer(scene, g);
  
  /* parse textarea into geom scene. */
  function parse() {
    var text = document.querySelector('.geometry-text').value;
    text = text.replace(/#.*$/gm, '');
    scene.parse(text);
  }
  
  /* update rendered scene. */
  function update() {
    scene.update();
    render();
    d3.selectAll('.free-point').call(geom.behavior.move.point(update));
    d3.selectAll('.circle').call(geom.behavior.move.circle(update));
    d3.selectAll('.line').call(geom.behavior.move.line(update));
  }
  
  parse();
  geom.behavior.follow(g, scene.get('b'), update);
  update();
}

document.addEventListener('DOMContentLoaded', init)

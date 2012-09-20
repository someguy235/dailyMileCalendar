//$(document).ready(function() {
  var n = 3, // number of layers
  m = 365,
  
  //data0 = d3.layout.stack().offset("wiggle")(dm_data(n,m)),
  
  //  silhouette - center the stream, as in ThemeRiver.
  //  wiggle - minimize weighted change in slope.
  //  expand - normalize layers to fill the range [0,1].
  //  zero - use a zero baseline, i.e., the y-axis.

  data0 = d3.layout.stack().offset("silhouette")(tmpdata0),
  data1 = d3.layout.stack().offset("zero")(tmpdata1),
  //data1 = d3.layout.stack().offset("wiggle")(dm_data(n,m)),
  //color = d3.interpolateRgb("#daa", "#655");
  color = ['#4FCEF7', '#54CA44', '#009BE0'];
  //console.log("tmpdata length:"+ tmpdata0[0].length);
  //console.log("data0:  "+ JSON.stringify(data0[0]));
  //console.log("dm_data:"+ JSON.stringify(dm_data(n,m)));

var width = 900,
  height = 500,
  mx = m - 1,
  my = d3.max(data0.concat(data1), function(d) {
    return d3.max(d, function(d) {
      return d.y0 + d.y;
    });
  });

var area = d3.svg.area()
  .x(function(d) { return d.x * width / mx; })
  .y0(function(d) { return height - d.y0 * height / my; })
  .y1(function(d) { return height - (d.y + d.y0) * height / my; });

var vis = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

vis.selectAll("path")
  .data(data0)
  .enter().append("path")
  .attr("d", area);

vis.selectAll("path")
  .data([0,1,2])
  .style("fill", function(d){ return color[d] })
  
d3.select("#chart").style("background", "#333");
//});

function transition() {
  console.log("transition");
  d3.selectAll("path")
    .data(function() {
      var d = data1;
      data1 = data0;
      return data0 = d;
    })
  .transition()
  .duration(2500)
  .attr("d", area);
}

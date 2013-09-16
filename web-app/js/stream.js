
var n = 3, // number of layers
m = 365,
  
color = {'swim': '#4FCEF7','bike': '#54CA44', 'run': '#009BE0'};
//color = ['#900', '#090', '#009']

var width = 900/365,
height = 300

var data0 = alldata['swim']

var x = d3.scale.linear()
  .domain([0, 1])
  .range([0, width]);
 
var y = d3.scale.linear()
  .domain([0, 1]) //we'll scale the events as percents instead
  .rangeRound([0, height]);

var chart = d3.select("#chart").append("svg")
  .attr("class", "chart axis")
  .attr("width", width * 365)
  .attr("height", height);

chart.selectAll("rect")
  .data(data0)
  .enter().append("rect")
  .attr("x", function(d, i) { return x(i) - .5; })
  .attr("y", height)
  .attr("width", width)
  .attr("height", function(d) { return y(d.y); })
  .attr("fill", "#AAAAAA")

transition("swim");

var xAxis = d3.svg.axis()
  .scale(
    d3.time.scale()
      .domain([new Date(2013, 0, 1), new Date(2013, 11, 31)])
      .range([0, 900])
  )
  .ticks(d3.time.months, 1)
  //.orient("bottom")
  
d3.select("#chart").style("background", "#aaa");

chart.append("g")
    .call(xAxis)
    
function transition(type) {
  var max = d3.max(alldata[type], function(data){ return data.y; });
  chart.selectAll("rect")
    .data(alldata[type])
    .transition()
    .duration(2500)
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", function(d) { return height - y(d.y)/max + 25; })
    .attr("width", width)
    .attr("height", function(d) { return y(d.y)/max; })
    .style("fill", color[type])
}

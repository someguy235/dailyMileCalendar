
//var n = 3, // number of layers
//m = 365,
  
color = {'swim': '#4FCEF7','bike': '#54CA44', 'run': '#009BE0'};
//color = ['#900', '#090', '#009']

var w = 900,
    h = 300,
    ypad = 25,
    xpad = 40

var data0 = alldata['swim']

var x = d3.scale.linear()
  .domain([0, 365])
  .range([0+xpad, w]);
 
var y = d3.scale.linear()
  .domain([0, 1]) //we'll scale the events as percents instead
  .rangeRound([ypad, h]);

var chart = d3.select("#chart").append("svg")
  .attr("class", "chart")
  .attr("width", w)
  .attr("height", h)
  .style("background", "#ccc");

var xAxis = d3.svg.axis()
  .scale(d3.time.scale()
    .domain([new Date(2013, 0, 1), new Date(2013, 11, 31)])
    .range([0+xpad, w])
  )
  .ticks(d3.time.months, 1)
  .tickFormat(d3.time.format("  %b"))

chart.append("g")
  .attr("class", "xaxis axis")
  .attr("transform", "translate(0," + (h-ypad) + ")")
  .call(xAxis)

var yScale = d3.scale.linear()
  .domain([1000, 0])
  .range([ypad, h]);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  //.ticks(5);

chart.append("g")
  .attr("class", "yaxis axis")
  .attr("transform", "translate(" + xpad + ","+ ((h-ypad)*.05) +")")
  .call(yAxis);

chart.append("g")
  .attr("class", "ygrid axis")
  .attr("transform", "translate("+ xpad +", "+ ((h-ypad)*.05) +")")
  .call(yAxis
    .tickSize(-w+xpad, 0, 0)
    .tickFormat("")
  )

chart.selectAll("rect")
  .data(data0)
  .enter().append("rect")
  .attr("x", function(d, i) { return x(i) - .5; })
  .attr("y", h-ypad)
  .attr("width", w/365)
  .attr("height", function(d) { return 0;})
  .attr("fill", "#ccc")

function transition(type) {
  var max = d3.max(alldata[type], function(data){ return data.y; });

  var yScale = d3.scale.linear()
    .domain([max, 0])
    .range([0, (h-ypad)*.95]);
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    
  chart.selectAll(".yaxis")
  .call(yAxis)
  chart.selectAll(".ygrid")
  .call(yAxis
    .tickSize(-w+xpad, 0, 0)
    .tickFormat("")
  )
  
  chart.selectAll("rect")
    .data(alldata[type])
    .transition()
    .duration(2500)
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", function(d) { return h-(y(d.y/max*.95)); })
    .attr("width", w/365)
    .attr("height", function(d) { return (y(d.y/max*.95))-ypad; })
    .style("fill", color[type])
}

transition("swim");

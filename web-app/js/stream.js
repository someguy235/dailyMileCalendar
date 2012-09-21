
var n = 3, // number of layers
m = 365,
  
//color = ['#4FCEF7', '#54CA44', '#009BE0'];
color = {'swim': '#4FCEF7','bike': '#54CA44', 'run': '#009BE0'};
//color = ['#900', '#090', '#009']

  
var width = 900/365,
height = 300

//var data0 = swimdata
var data0 = alldata['swim']

var x = d3.scale.linear()
  .domain([0, 1])
  .range([0, width]);
 
var y = d3.scale.linear()
  .domain([0, 50])
  .rangeRound([0, height]);

var chart = d3.select("#chart").append("svg")
  .attr("class", "chart")
  .attr("width", width * 365)
  .attr("height", height);
  
chart.selectAll("rect")
  .data(data0)
  .enter().append("rect")
  .attr("x", function(d, i) { return x(i) - .5; })
  .attr("y", function(d) { return height - y(d.y) - .5; })
  .attr("width", width)
  .attr("height", function(d) { return y(d.y); })
  .style("fill", color['swim'])
  

d3.select("#chart").style("background", "#333");

function transition(type) {
  //console.log("transition: "+ JSON.stringify(data1));
  chart.selectAll("rect")
    .data(alldata[type])
    /*.style("fill", function(d, i){ 
      //console.log("i: "+ JSON.stringify(i))
      if(i > 245){ 
        return color[1]
      }else{
        return color[0]
      }
    }
    )*/
    .transition()
    .duration(2500)
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", function(d) { return height - y(d.y) - .5; })
    .attr("width", width)
    .attr("height", function(d) { return y(d.y); })
    .style("fill", color[type])
    //.attr("d", area);
}

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var streamData, showSpinner = false;

var DMCalModule = angular.module('DMCalApp', []);

DMCalModule.factory('DMCalService', function() {  
  var service = {  
    streamData: streamData,
    showSpinner: showSpinner
  }
  return service
})


DMCalModule.controller("FormController", function($scope, $http, DMCalService){
  $scope.username = "";
//  $scope.showSpinner = false;
  
  $scope.getActivities = function(){
    //console.log($scope.username);
    DMCalService.showSpinner = true;
    postData = {
      "username": $scope.username,
      "year": 2013,
      "month": 9
    }
    $http({
      url: '/dailyMileCalendar/user/calendar',
      method: "POST",
      data: JSON.stringify(postData),
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status, headers, config) {
      DMCalService.showSpinner = false;
      DMCalService.streamData = data;
      //console.log(DMCalService.streamData);
      /*
      nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
        
        chart.xAxis
          .tickFormat(d3.format(',f'));

        chart.yAxis
          .tickFormat(d3.format(',.1f'));

        d3.select('#chart1 svg')
          .datum(DMCalService.streamData)
          .transition().duration(500).call(chart)
          .style("background", "#ccc");

        nv.utils.windowResize(chart.update);

        return chart;
      });
      */
      
      nv.addGraph(function() {
        var chart = nv.models.stackedAreaChart()
                      .x(function(d) { return d[0] })
                      .y(function(d) { return d[1] })
                      .clipEdge(true);

        chart.xAxis
            .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });

        chart.yAxis
            .tickFormat(d3.format(',.2f'));

        d3.select('#chart1 svg')
          .datum(DMCalService.streamData)
          .transition().duration(500).call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
      });
     
      
    }).error(function (data, status, headers, config) {

    });
  }
})

DMCalModule.controller("DisplayController", function($scope, $http, DMCalService){
  $scope.DMCalService = DMCalService;
  $scope.showSpinner = DMCalService.showSpinner;
  $scope.$watch('DMCalService.showSpinner', function(newVal, oldVal, scope){
    console.log('watch');
    //if(newVal){
      $scope.showSpinner = newVal;
    //}
  })

/*
  $scope.$watch('DMCalService.streamData', function(newVal, oldVal, scope){
    console.log("watch");
    if(newVal){
      console.log("new data")
      //console.log(DMCalService.streamData);
    }
  })
  */
  /*
  var color = {'swim': '#4FCEF7','bike': '#54CA44', 'run': '#009BE0'};
  var w = 900,
      h = 300,
      ypad = 25,
      xpad = 40
  
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
    
  var trans = "translate(" + xpad + ","+ ((h-ypad)*.05) +")";
  //var trans = "translate(" + xpad + ","+ (-ypad) +")";
  chart.append("g")
    .attr("class", "yaxis axis")
    .attr("transform", trans)
    .call(yAxis);

  chart.append("g")
    .attr("class", "ygrid axis")
    .attr("transform", trans)
    .call(yAxis
      .tickSize(-w+xpad, 0, 0)
      .tickFormat("")
    )
  */
  /*
  //var alldata = {'swim': ${streamJSONList[0]}, 'run': ${streamJSONList[1]}, 'bike': ${streamJSONList[2]} }
  var alldata = {
    'swim': DMCalService.streamData[0],
    'run': DMCalService.streamData[1],
    'bike': DMCalService.streamData[2]
  }
  var data0 = alldata['swim']

  chart.selectAll("rect")
    .data(data0)
    .enter().append("rect")
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", h-ypad)
    .attr("width", w/365)
    .attr("height", function(d) { return 0;})
    .attr("fill", "#ccc")
*/
/*
  $scope.transition = function(type) {
    var alldata = {
      'swim': DMCalService.streamData[0],
      'run': DMCalService.streamData[1],
      'bike': DMCalService.streamData[2]
    }
    
    console.log(alldata[type])
    var max = d3.max(alldata[type], function(data){ return data.y; });
    console.log("max: "+ max)

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
*/
  //transition("swim");

  
  
  
  
  
})

//angular.bootstrap(DMCalApp, ["DMCalApp"]);

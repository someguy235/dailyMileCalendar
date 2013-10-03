/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var streamData, showSpinner = false, showError = false;

var DMCalModule = angular.module('DMCalApp', []);

DMCalModule.factory('DMCalService', function() {  
  var service = {  
    streamData: streamData,
    showSpinner: showSpinner,
    showError: showError
  }
  return service
})

DMCalModule.controller("FormController", function($scope, $http, DMCalService){
  $scope.username = "";
  
  $scope.getActivities = function(){
    DMCalService.showSpinner = true;
    DMCalService.showError = false;
    
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
      /*
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
          .datum(data)
          .transition().duration(500).call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
      });
     */
      nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
          .x(function(d) { return d[0] })
          .y(function(d) { return d[1] })
          .showControls(false).stacked(true)
        chart.xAxis
          .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
        chart.yAxis
          .tickFormat(d3.format(',.1f'));
        d3.select('#chart1 svg')
          .datum(DMCalService.streamData)
          .transition().duration(500).call(chart)
          //.style("background", "#ccc");
        nv.utils.windowResize(chart.update);
        return chart;
      });
      
    }).error(function (data, status, headers, config) {
      DMCalService.showSpinner = false;
      DMCalService.showError = true;
    });
  }
})

DMCalModule.controller("DisplayController", function($scope, $http, DMCalService){
  $scope.DMCalService = DMCalService;
  $scope.showSpinner = DMCalService.showSpinner;
  $scope.showError = DMCalService.showError;
  
  $scope.$watch('DMCalService.showSpinner', function(newVal, oldVal, scope){
    $scope.showSpinner = newVal;
  })
  $scope.$watch('DMCalService.showError', function(newVal, oldVal, scope){
    $scope.showError = newVal;
  })
})

DMCalModule.controller("CalController", function($scope, $http, DMCalService){
  $scope.DMCalService = DMCalService;
  
  /*
  $('#calendar').fullCalendar({
    height: 550,
    theme: true,
    editable: false,
    weekMode: 'liquid',
    month: ${month},
    year: ${year},
    events: [
      <g:each var="entry" in="${entries}">
      {
        title: '${entry[1]}',
        start: new Date(${entry[0].year + 1900}, ${entry[0].month}, ${entry[0].date}),
        color: colors['${entry[2]}']
      },
      </g:each>
    ],
    eventColor: '#aaa'
  })
  */
})
//angular.bootstrap(DMCalApp, ["DMCalApp"]);

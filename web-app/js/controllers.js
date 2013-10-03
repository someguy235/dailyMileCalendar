/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var streamData, showSpinner = false, showError = false, showChart = false;

var DMCalModule = angular.module('DMCalApp', []);

DMCalModule.factory('DMCalService', function() {  
  var service = {  
    streamData: streamData,
    showSpinner: showSpinner,
    showError: showError,
    showChart: showChart
  }
  return service
})

DMCalModule.controller("FormController", function($scope, $http, DMCalService){
  $scope.username = "";
  var events = [];
  var fullCalHandle = null;
  
  $scope.getActivities = function(){
    DMCalService.showSpinner = true;
    DMCalService.showError = false;
    DMCalService.showChart = false;
    DMCalService.username = $scope.username;
    
    if(fullCalHandle){ 
      $("#calendar").fullCalendar('destroy');
      fullCalHandle = null;
    }
    
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
      DMCalService.showChart = true;
      DMCalService.streamData = data;
      events = [];
      
      nv.addGraph(function() {
        //var chart = nv.models.multiBarChart()
        //var chart = nv.models.stackedAreaChart()
        var chart = nv.models.lineWithFocusChart()
          .x(function(d) { return d[0] })
          .y(function(d) { return d[1] })
          //.showControls(false).stacked(true)
        chart.xAxis
          .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
        chart.x2Axis
          .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
        chart.yAxis
          .tickFormat(d3.format(',.1f'));
        d3.select('#chart1 svg')
          .datum(DMCalService.streamData)
          .transition().duration(500).call(chart)
        nv.utils.windowResize(chart.update);
        return chart;
      });
      
      $.each(DMCalService.streamData, function(type, typeData){
        $.each(typeData.values, function(idx, vals){
          if(vals[1] != 0){
            events.push({
              title: typeData.key + ": "+ vals[1] +" mi",
              start: new Date(vals[0]),
              color: typeData.color
            });
          }
        })
      })

      fullCalHandle = $('#calendar').fullCalendar({
        height: 550,
        theme: false,
        editable: false,
        weekMode: 'liquid',
        events: events,
        eventColor: '#aaa'
      })
      
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
  $scope.showChart = DMCalService.showChart;
  $scope.username = DMCalService.username;
  
  $scope.$watch('DMCalService.showSpinner', function(newVal, oldVal, scope){
    $scope.showSpinner = newVal;
  })
  $scope.$watch('DMCalService.showError', function(newVal, oldVal, scope){
    $scope.showError = newVal;
  })
  $scope.$watch('DMCalService.showChart', function(newVal, oldVal, scope){
    $scope.showChart = newVal;
  })
  $scope.$watch('DMCalService.username', function(newVal, oldVal, scope){
    $scope.username = newVal;
  })
})

//angular.bootstrap(DMCalApp, ["DMCalApp"]);

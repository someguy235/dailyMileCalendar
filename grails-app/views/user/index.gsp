<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<meta name="layout" content="main"/>
		<title>DailyMile Calendar</title>
	</head>
	<body >
    <div ng-app="DMCalApp">
      <div ng-controller="FormController" class="row-fluid">
        <div class="main centered span8 offset2">
          <form ng-submit="getActivities()">
            <div class="row-fluid">
              <div class="input-append">
                <input ng-model="username" class="span10" type="text" placeholder="DailyMile Username">
                <button class="btn">Go!</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="row-fluid">&nbsp;</div>
    
      <div ng-controller="DisplayController" class="row-fluid">
        <div class="span8 offset2">
          <div id="spinner" ng-show="showSpinner" style="display: none;">
            <img src="${resource(dir:'images',file:'spinner-small.gif')}" alt="Spinner" />
            <br /><br />
            Getting your workouts...
          </div>

          <div id="error" ng-show="showError" style="display: none;">
            Sorry, something went wrong!
          </div>
          
          <div id="username">
<!--            Info for {{username}}-->
          </div>

          <div id="calendar"></div>

          <div class="row-fluid">&nbsp;</div>
          
          <div id="chart1" ng-show="showChart">
            <svg style="width: 900px; height: 500px;"></svg>
          </div>
          
          
        </div>
      </div>
    
      <div class="row-fluid">&nbsp;</div>
      <div class="row-fluid">&nbsp;</div>
      <div class="row-fluid">&nbsp;</div>
    
    </div>
	</body>
</html>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<meta name="layout" content="main"/>
    <!--
		<g:javascript>
			$(function() {
				//$("#period").buttonset();
			});
		</g:javascript>
		<g:javascript>
			$(function() {
				//$("#numArtists").buttonset();
			});
		</g:javascript>
    -->
		<title>DailyMile Calendar</title>
	</head>
	<body >
    <div ng-app="DMCalApp">
      <div ng-controller="FormController" class="row-fluid">
        <div class="main centered span8 offset2">
          <form ng-submit="getActivities()">
            <div class="row">
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
            <img src="${resource(dir:'images',file:'spinner.gif')}" alt="Spinner" />
          </div>

          <div id="error" ng-show="showError" style="display: none;">
            Sorry, something went wrong!
          </div>

          <div id="chart1">
            <svg style="width: 900px; height: 300px;"></svg>
          </div>
        </div>
      </div>

      <div ng-controller="CalController" class="row-fluid">
        <div class="span8 offset2">
          
          
        </div>
      </div>

      <!--
			<g:form action="calendar">
				<h3>
					<label for="username">DailyMile Username</label>
					<g:textField name="username" />
				</h3>
				<div class="ui-widget">
						<g:select from="${1..12}" value="${curMonth}" name="month" class="ui-button ui-widget-content ui-state-default ui-corner-all"></g:select>
						<g:select from="${2007..curYear}" value="${curYear}" name="year" class="ui-button ui-widget-content ui-state-default ui-corner-all">
						</g:select>
				</div>
				<br />
				<g:if test="${flash.message}">
					<div class="flash">
						${flash.message}
					</div>
				</g:if>
				
				<br />
				<button aria-disabled="false" role="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" id="submit"><span class="ui-button-text">Submit</span></button>
			</g:form>
      -->
    </div>
	</body>
</html>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<meta name="layout" content="main"/>
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
		<title>DailyMile Calendar</title>
	</head>
	<body >
    <div ng-app="DMCalApp">
		<div ng-controller="FormController" class="main centered">
      <form ng-submit="getActivities()">
        <h3>
					<label for="username">DailyMile Username</label>
					<g:textField ng-model="username" name="username" />
				</h3>
        
        
      </form>
    </div>

    <div>&nbsp;</div>
    
    <div ng-controller="DisplayController">
      <div id="spinner" ng-show="showSpinner" style="display: none;">
        <img src="${resource(dir:'images',file:'spinner.gif')}" alt="Spinner" />
      </div>

      <div id="chart1">
        <svg style="width: 900px; height: 500px;"></svg>
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

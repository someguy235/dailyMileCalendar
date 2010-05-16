<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<meta name="layout" content="main"/>
		<g:javascript>
			$(function() {
				$("#period").buttonset();
			});
		</g:javascript>
		<g:javascript>
			$(function() {
				$("#numArtists").buttonset();
			});
		</g:javascript>
		<title>DailyMile Calendar</title>
	</head>
	<body>
		<div class="main centered">
			<g:form action="calendar">
				<h3>
					<label for="username">DailyMile Username</label>
					<g:textField name="username" />
				</h3>
				<div class="ui-widget">
						<g:select from="${1..12}" value="1" name="month" class="ui-button ui-widget-content ui-state-default ui-corner-all"></g:select>
						<g:select from="${2007..2010}" value="2010" name="year" class="ui-button ui-widget-content ui-state-default ui-corner-all">
						</g:select>
				</div>
				<br />
				<g:if test="${flash.message}">
					<div class="flash">
						${flash.message}
					</div>
				</g:if>
				
				<br />
				<!-- <div class="ui-buttonset" id="period">
					<input class="ui-helper-hidden-accessible" id="Overall" value="overall"   name="period" type="radio" checked="checked"><label aria-disabled="false" role="button" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left ui-state-active" aria-pressed="true"  for="Overall"><span class="ui-button-text">Overall</span></label>
					<input class="ui-helper-hidden-accessible" id="7day"    value="7 days"    name="period" type="radio">                  <label aria-disabled="false" role="button" class="ui-button ui-widget ui-state-default ui-button-text-only"                                aria-pressed="false" for="7day">   <span class="ui-button-text">7 Days</span></label>
					<input class="ui-helper-hidden-accessible" id="3month"  value="3 months"  name="period" type="radio">                  <label aria-disabled="false" role="button" class="ui-button ui-widget ui-state-default ui-button-text-only"                                aria-pressed="false" for="3month"> <span class="ui-button-text">3 Months</span></label>
					<input class="ui-helper-hidden-accessible" id="6month"  value="6 months"  name="period" type="radio">                  <label aria-disabled="false" role="button" class="ui-button ui-widget ui-state-default ui-button-text-only"                                aria-pressed="false" for="6month"> <span class="ui-button-text">6 Months</span></label>
					<input class="ui-helper-hidden-accessible" id="12month" value="12 months" name="period" type="radio">                  <label aria-disabled="false" role="button" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right"                aria-pressed="false" for="12month"><span class="ui-button-text">12 Months</span></label>
				</div>
				<br />
				-->
				<button aria-disabled="false" role="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" id="submit"><span class="ui-button-text">Submit</span></button>
			</g:form>
		</div>
	</body>
</html>

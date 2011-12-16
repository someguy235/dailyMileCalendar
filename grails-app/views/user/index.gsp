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
		</div>
	</body>
</html>

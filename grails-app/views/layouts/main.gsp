<html>
    <head>
        <title><g:layoutTitle default="Grails" /></title>
        <link rel="stylesheet" href="${resource(dir:'css',file:'main.css')}" />
        <link rel='stylesheet' href="${resource(dir:'css',file:'fullcalendar.css')}" />
        <link rel='stylesheet' href="${resource(dir:'css',file:'nv.d3.css')}" />
        <link rel='stylesheet' href="${resource(dir:'css',file:'bootstrap.min.css')}" />
        <link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
        
        <g:javascript library="jquery" />
        <g:javascript src='d3.v3.min.js'></g:javascript>
        <g:javascript src='nv.d3.min.js'></g:javascript>
        <g:javascript library="application" />
        <g:javascript src="fullcalendar.min.js" />
        <g:javascript src="angular.min.js" />
        <g:javascript src="controllers.js" />
        <g:layoutHead />
    </head>
    <body>
<!--        	<h1 class="ui-widget-header">DailyMile Calendar</h1>-->
        	<br />
        	<g:layoutBody />
        	<h3 class="footer">
        		All: &copy 2013, Ethan Shepherd
        	</h3>
    </body>
</html>

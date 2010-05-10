<html>
    <head>
        <title><g:layoutTitle default="Grails" /></title>
        <link rel="stylesheet" href="${resource(dir:'css',file:'main.css')}" />
        <link rel="stylesheet" href="${resource(dir:'css/ui-lightness',file:'jquery-ui-1.8.1.custom.css')}" />
        <link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
        <g:javascript library="jquery" />
        <g:javascript library="application" />
        <jq:plugin name="ui" />
        <g:layoutHead />
    </head>
    <body>
        	<div id="spinner" class="spinner" style="display:none;">
            <img src="${resource(dir:'images',file:'spinner.gif')}" alt="Spinner" />
        	</div>
        	<br />
        	<h1>DailyMile Calendar</h1>
        	<br />
        	<g:layoutBody />
        	<h3>
        		All: &copy 2010, Ethan Shepherd
        	</h3>
			<g:javascript>
				var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
				document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
			</g:javascript>
			<g:javascript type="text/javascript">
				try {
					var pageTracker = _gat._getTracker("UA-16289542-1");
					pageTracker._trackPageview();
				} catch(err) {}
			</g:javascript>
    </body>
</html>

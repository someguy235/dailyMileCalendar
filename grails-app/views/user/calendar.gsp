<html>
	<head>
		<title>DailyMile Calendar for ${username}</title>
		<meta name="layout" content="main"/>
		<g:javascript>
			$(document).ready(function() {
	        $('#calendar').fullCalendar({
	          height: 650,
	          theme: true,
	          editable: false,
	          weekMode: 'liquid',
	          month: ${month},
            year: ${year},
	          events: [
	            <g:each var="entry" in="${entries}">
	              {
	                title: '${entry[1]}',
	                start: new Date(${entry[0].year + 1900}, ${entry[0].month}, ${entry[0].date})
	              },
	            </g:each>
	          ]
	        })
	      });
		</g:javascript>
	</head>
	<body>
     <div style="width: 900px; margin: 0 auto;" id='calendar'></div>
	</body>
</html>


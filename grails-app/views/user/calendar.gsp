<html>
  <head>
    <title>DailyMile Calendar for ${username}</title>
    <meta name="layout" content="main"/>
    <link rel='stylesheet' href="${resource(dir:'css',file:'syntax.css')}" />
    <link rel='stylesheet' href="${resource(dir:'css',file:'stream.css')}" />

    <g:javascript src='d3.v3.min.js'></g:javascript>
    <g:javascript>
      $(document).ready(function() {
        var colors = {'Swimming': '#4FCEF7','Cycling': '#54CA44', 'Running': '#009BE0'};

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

        var yards_per_meter = 1.09361;
        var miles_per_km = .621371;

      });
      var alldata = {'swim': ${streamJSONList[0]}, 'run': ${streamJSONList[1]}, 'bike': ${streamJSONList[2]} }
    </g:javascript>

  </head>
  <body>
    <div style="width: 900px; margin: 0 auto;" id='calendar'></div>
      <button class='first last chart_button' onclick='transition("swim")'>Swim</button>
      <button class='first last chart_button' onclick='transition("bike")'>Bike</button>
      <button class='first last chart_button' onclick='transition("run")'>Run</button>
      <!--<button class='first last' onclick='transition("all")'>All</button>-->
    <div class="gallery" id='chart'>
    </div>
  <g:javascript src='stream.js'></g:javascript>
  </body>
</html>


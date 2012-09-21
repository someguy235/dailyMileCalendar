<html>
  <head>
    <title>DailyMile Calendar for ${username}</title>
    <meta name="layout" content="main"/>
    <link href='/css/syntax.css' rel='stylesheet' type='text/css' />
    <link href='/css/stream.css' rel='stylesheet' type='text/css' />

    <script type="text/javascript" src='/js/d3.v2.min.js'></script>
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
          ]
        })

        var yards_per_meter = 1.09361;
        var miles_per_km = .621371;

      });
      var alldata = {'swim': ${streamJSONList[0]}, 'run': ${streamJSONList[1]}, 'bike': ${streamJSONList[2]} }
    </g:javascript>

  </head>
  <body>
    <div style="width: 900px; margin: 0 auto;" id='calendar'></div>
    <div class="gallery" id='chart'>
      <button class='first last' onclick='transition("swim")'>Swim</button>
      <button class='first last' onclick='transition("bike")'>Bike</button>
      <button class='first last' onclick='transition("run")'>Run</button>
    </div>
    <script src='/js/stream.js' type='text/javascript'> </script>
  </body>
</html>


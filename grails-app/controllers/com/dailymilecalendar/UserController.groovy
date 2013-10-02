package com.dailymilecalendar
import grails.converters.JSON;
import java.util.Calendar;

class UserController {
  def COLORS = ['Swimming': '#1E3CAC','Cycling': '#01C825', 'Running': '#FD7500'];

  def index = {
    def cal = Calendar.getInstance()
    def curYear = cal.get(Calendar.YEAR)
    def curMonth = cal.get(Calendar.MONTH)+1
    return [curYear:curYear, curMonth:curMonth]
  }

  def calendar = {
    def params = JSON.parse(request.reader.text)
    println params

    def session = request.session
    if (params.username == ""){
      //redirect(action: 'index')
      //flash.message = "Invalid User Name"
    }
    else{
      def entries = []
      def streamData = ["Swimming":[:], "Running":[:], "Cycling":[:]]
      def userJSON, userURL, woDate, woJday, woType, woDistance, woUnits, woTitle, woMonth, woYear, woTime
      def APIroot = "http://api.dailymile.com/people/"
      def needMoreEntries = true
      def page = 1
      def requestedMonth = params.month.asType(int) - 1
      def requestedYear = params.year.asType(int)
      def jdays = [] as Set
      def returnData = []

      while (needMoreEntries){
        userURL = "${APIroot}${params.username}/entries.json?page=${page}"
        def userResponse = new URL(userURL).getText()
        userJSON = JSON.parse(userResponse)
        userJSON.entries.each{
          woTitle = ""
          woDate = new Date().parse("yyyy-MM-dd", "${it["at"].getAt(0..9)}")
          woJday = woDate.getAt(Calendar.DAY_OF_YEAR)
          jdays.add(woJday)
          woMonth = woDate.month
          woYear = woDate.year+1900
          woType = it.workout?.activity_type
          woDistance = it.workout?.distance?.value
          woUnits = it.workout?.distance?.units
          woTime = it.workout?.duration
          woTitle = woType + " " //+ woDistance + " " + woUnits

          if(woDistance){
            woTitle += (woDistance + " ")
          }
          if(woUnits){
            woTitle += (woUnits + " ")
          }
          if(woTime){
            def woHr = (woTime / 60).toInteger()
            def woMn = String.format("%02d",(woTime % 60))
            woTitle += (woHr +":"+ woMn + " ")
          }

          //if (((woMonth < requestedMonth) && (woYear == requestedYear))
          //     ||(woYear < requestedYear)){
          if(woYear < requestedYear){
            needMoreEntries = false
          }
          entries.add([woDate, woTitle, woType, woDistance, woUnits])

          if(woType == 'Swimming'){
            woDistance/=1760
          }

          if((streamData.keySet().contains(woType)) && (woYear == requestedYear)){
            if(streamData[woType].keySet().contains(woJday)){
              streamData[woType][woJday] += woDistance
            }else{
              streamData[woType] += [(woJday): woDistance]
            }
          }
        }
        if (needMoreEntries){
          page++
        }
      }
      
      streamData.each{ key, vals ->
        def returnObj = [:]
        returnObj['key'] = key
        def returnVals = []
        (0..365).each{day ->
          if(!vals[day]){
            returnVals.push( [x: (day), y: 0] )
          }else{
            returnVals.push( [x: (day), y: vals[day]] )
          }
        }
        returnObj['values'] = returnVals
        returnObj['color'] = COLORS[(key)]
        returnData.push(returnObj)
      }
      //println returnData
      render returnData as JSON
    }
  }
}

  
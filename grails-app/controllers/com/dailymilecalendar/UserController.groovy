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
//    println params

    def session = request.session
    if (params.username == ""){
      params.username = 'who_am_i'
    }
    def entries = []
    def collectData = ["Swimming":[:], "Running":[:], "Cycling":[:]]
    def streamData = ["Swimming":[], "Running":[], "Cycling":[]]
    def userJSON, userURL, woDate, woJday, woType, woDistance, woUnits, woTitle, woMonth, woYear, woTime
    def APIroot = "http://api.dailymile.com/people/"
    def needMoreEntries = true
    def page = 1
    def requestedMonth = params.month.asType(int) - 1
    def requestedYear = params.year.asType(int)
    def jdays = [] as Set
    def allMillis = [] as SortedSet
    def returnData = []
    def lastMillis = 0

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

        if(woYear < requestedYear && woMonth < requestedMonth){
          needMoreEntries = false
        }
        entries.add([woDate, woTitle, woType, woDistance, woUnits])

        if(woType == 'Swimming'){
          woDistance = Math.round((woDistance/1760)*100)/100
        }
        
        def woMillis = woDate.time
        allMillis.add(woMillis)
        lastMillis = woMillis > lastMillis ? woMillis : lastMillis
        if( ( streamData.keySet().contains(woType) ) && 
            ((woYear == requestedYear) || (woYear == requestedYear-1 && woMonth >= requestedMonth))){
          if(collectData[woType].keySet().contains(woMillis)){
            collectData[woType][woMillis] += woDistance
          }else{
            collectData[woType] += [(woMillis): woDistance]
          }
        }

      }
      if (needMoreEntries){
        page++
      }
    }

    (365..0).each{ jday ->
      Long offset = 86400000L * jday
      Long time = lastMillis - offset
      streamData.keySet().each{ type ->
        if(collectData[(type)][(time)]){
          streamData[(type)].push([(time), collectData[(type)][(time)]])
        }else{
          streamData[(type)].push([(time), 0])
        }
      }
    }

    streamData.each{ key, vals ->
      def returnObj = [:]
      returnObj['key'] = key
      returnObj['values'] = streamData[(key)]
      returnObj['color'] = COLORS[(key)]
      returnData.push(returnObj)
    }
//    println returnData
    render returnData as JSON
  }
}

  
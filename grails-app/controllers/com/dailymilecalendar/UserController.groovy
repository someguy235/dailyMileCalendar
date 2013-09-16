package com.dailymilecalendar
import grails.converters.JSON;
import java.util.Calendar;

class UserController {

def index = {
  def cal = Calendar.getInstance()
  def curYear = cal.get(Calendar.YEAR)
  def curMonth = cal.get(Calendar.MONTH)+1
  return [curYear:curYear, curMonth:curMonth]
}
		
def calendar = {
  def session = request.session
  if (params.username == ""){
    redirect(action: 'index')
    flash.message = "Invalid User Name"
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
          woDistance/=100
        }
        
        if((woType in ["Swimming", "Running", "Cycling"]) && (woYear == requestedYear)){
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
    /*
    jdays.each{ day ->
      streamData.each{ type ->
        if(!type.value[day]){
          type.value += [(day):0]
        }
      }
    }  
    */
    //fill in zeroes for days with no data
    (0..365).each { day ->
      streamData.each{ type ->
        if(!type.value[day]){
          type.value += [(day):0]
        }
      }
    }
    
    def streamJSONList = []
    def streamJSON = ""
    
    streamData.each{ type ->
      streamJSON = "["
      type.value.sort{it.key}.eachWithIndex{ wo, idx ->
        if(idx != 0){ streamJSON += ", " }
        streamJSON += "{'x': "+ wo.key +", 'y': "+ wo.value +"}"
      }
      streamJSON += "]"
      
      streamJSONList += streamJSON
    }
    
    return [entries: entries,
            streamData: streamData,
            streamJSONList: streamJSONList,
            username:params.username, 
            month: requestedMonth, 
            year: requestedYear, page:page]
	}
  }
}

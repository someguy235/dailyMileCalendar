package com.dailymilecalendar
import grails.converters.JSON;
import java.util.Calendar;

class UserController {

def index = {
  def cal = Calendar.getInstance()
  def curYear = cal.get(Calendar.YEAR)
  return [curYear:curYear]
}
		
def calendar = {
  def session = request.session
  if (params.username == ""){
    redirect(action: 'index')
    flash.message = "Invalid User Name"
  }
  else{
    def entries = []
    def userJSON, userURL, woDate, woType, woDistance, woUnits, woTitle, woMonth, woYear, woTime
    def APIroot = "http://api.dailymile.com/people/"
    def needMoreEntries = true
    def page = 1
    def requestedMonth = params.month.asType(int) - 1
    def requestedYear = params.year.asType(int)
    
    while (needMoreEntries){
      userURL = "${APIroot}${params.username}/entries.json?page=${page}"
      def userResponse = new URL(userURL).getText()
      userJSON = JSON.parse(userResponse)
      userJSON.entries.each{
        woTitle = ""
        woDate = new Date().parse("yyyy-MM-dd", "${it["at"].getAt(0..9)}")
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

        if (((woMonth < requestedMonth) && (woYear == requestedYear))
             ||(woYear < requestedYear)){
          needMoreEntries = false
        }
        entries.add([woDate, woTitle])
      }
      if (needMoreEntries){
        page++
      }
    }
    //render entries
    return [entries: entries, username:params.username, month: requestedMonth, year: requestedYear, page:page]
	}
  }
}

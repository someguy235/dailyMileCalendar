package com.dailymilecalendar
import grails.converters.JSON;

class UserController {

def index = { }
		
def calendar = {
  def session = request.session
  if (params.username == ""){
    redirect(action: 'index')
    flash.message = "Invalid User Name"
  }
  else{
    def entries = []
    def userJSON, userURL, woDate, woType, woDistance, woUnits, woTitle
    def APIroot = "http://api.dailymile.com/people/"
    def needMoreEntries = true
    def page = 1
    def requestedMonth = params.month.asType(int) - 1
    
    while (needMoreEntries){
		userURL = "${APIroot}${params.username}/entries.json?page=${page}"
		def userResponse = new URL(userURL).getText()
		userJSON = JSON.parse(userResponse)
		userJSON.entries.each{
			//render it.toString()
			//render "<br />"
			woTitle = ""
			woDate = new Date().parse("yyyy-MM-dd", "${it["created_at"].getAt(0..9)}")
			woType = "${it.workout?.type}" 
			woDistance = "${it.workout?.distance?.value}"
			woUnits = "${it.workout?.distance?.units}"
			woTitle = woType + " " + woDistance + " " + woUnits
	    	if (woDate.month < requestedMonth){
    			needMoreEntries = false
    		}
    		else if (woDate.month == requestedMonth){
    			entries.add([woDate, woTitle])
    		}
    	}
    	if (needMoreEntries){
    		page++
    	}
    }
    //render entries
    return [entries: entries, username:params.username, month: requestedMonth]
	}
  }
}

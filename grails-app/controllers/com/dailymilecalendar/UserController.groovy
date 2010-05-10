package com.dailymilecalendar
import grails.converters.*;

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
    	def userJSON
        def APIroot = "http://api.dailymile.com/people/"
        def needMoreEntries = true
        def page = 1
        def userURL
        def woDate, woType, woDistance, woUnits
        def requestedMonth = 4
        
        while (needMoreEntries){
        	userURL = "${APIroot}${params.username}/entries.json?page=${page}"
        	def userResponse = new URL(userURL).getText()
        	userJSON = JSON.parse(userResponse)
        	//render "${userJSON.entries[0]} <br /><br />"
        	userJSON.entries.each{
        		woDate = new Date().parse("yyyy-MM-dd", "${it["created_at"].getAt(0..9)}")
        		woType = "${it["workout"]["type"]} " 
        		woDistance = "${it["workout"]["distance"]["value"]}"
        		woUnits = "${it["workout"]["distance"]["units"]}" 
        		
        		//render "${woDate} <br /> "
        		//render "${woType} <br /> "
        		//render "${woDistance} <br />"
        		//render "${woUnits} "
        		//render "<br /><br />"
        		//render "${woDate.month}<br />"
        		if (woDate.month != requestedMonth){
        			needMoreEntries = false
        		}
        		else{
        			entries.add([woDate, woType, woDistance, woUnits])
        		}
        	}
        	if (needMoreEntries){
        		page++
        	}
        	//userJSON.entries.each{render "${it["workout"]} <br /><br />"}
        	//render "${userJSON}"
        	//parse out entries, add to map
        	//check for entries covering month
        }
    	  
    	  
    	  
    	//render "${entries.toString()}"
    	return [entries: entries, username:params.username]
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	  
      }
    }
}

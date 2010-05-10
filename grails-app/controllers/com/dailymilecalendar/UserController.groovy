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
    	def entries = [:]
    	def userJSON
        def APIroot = "http://api.dailymile.com/people/"
        def needMoreEntries = true
        def page = 1
        
        while (needMoreEntries){
        	def userURL = "${APIroot}${params.username}/entries.json?page=${page}"
        	def userResponse = new URL(userURL).getText()
        	userJSON = JSON.parse(userResponse)
        	//render "${userJSON}"
        	//parse out entries, add to map
        	//check for entries covering month
        	needMoreEntries = false
        }
    	  
    	  
    	  
    	  
    	return [entries: userJSON, username:params.username]
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	  
      }
    }
}

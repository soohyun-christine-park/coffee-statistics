	 $(document).ready(function(){

    var coffee_count = 0;
    var pot_count = 0;
    var curDate = (new Date()).getDate(); 
    var curMonth = (new Date()).getMonth(); curMonth++;
    var prevMonth_enddate = getNumberOfDays(curYear, curMonth);
    if(curMonth <10){curMonth = '0'+curMonth;}
	if(curDate <10){curDate = '0'+curDate;}
    var curYear = (new Date()).getFullYear();
    var curDay = (new Date()).getDay();
    var today = "";

 	var current_weather = "";
 	var weather_condition = ["","","","","","","","","",""];

    function getNumberOfDays(year, month) {
        var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
        return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }
 	

 	//console.log(curDay);


    // curDate = 27;
    // curDay = 5;


 	//Soohyun Park's weather API Key
 	//
 	//3b6709cb1560b9d9


	$.ajax({
        url: 'http://api.wunderground.com/api/3b6709cb1560b9d9/conditions/q/NY/New_York.json',
        dataType: 'jsonp',
        success: function(dataWeGotViaJsonp)
        {
            var data = dataWeGotViaJsonp;

            current_weather = data['current_observation']['weather'];

            if(current_weather.includes("Drizle") || current_weather.includes("Rain") || current_weather.includes("Shower") || current_weather.includes("Squalls") || current_weather.includes("Hail")){
                    current_weather = "rain"
            }else if(current_weather.includes("Snow") || current_weather.includes("Ice")){
                    current_weather = "snow"
            }else if(current_weather.includes("Clear") || current_weather.includes("Sunny")){
                    current_weather = "clear"
            }else if(current_weather.includes("Cloud") || current_weather.includes("Overcast") || current_weather.includes("Fog")){
                    current_weather = "cloud"
            }

            console.log(current_weather);

            if(curDay == 1){
                todayWeather(current_weather,5);
            }else if(curDay == 2){
                todayWeather(current_weather,6);
            }else if(curDay == 3){
                todayWeather(current_weather,7);
            }else if(curDay == 4){
                todayWeather(current_weather,8);
            }else if(curDay == 5){
                todayWeather(current_weather,9);
            }

           

           
           
        },
        error: function(e)
        {  
            $('.h_logo').append("No 'Access-Control-Allow-Origin' header is present on the requested resource.");
        } 
    });



	switch(curDay){
    	case 1:
    		var count_date = 4;
			for(var i=curDate-3; i > curDate-8; i--){
                if(i <= 0){
                    var check_date = curYear+""+(curMonth - 1)+""+(i + prevMonth_enddate);
                }else {  var check_date = curYear+""+curMonth+""+i; }
                console.log("dd1: "+check_date);
				//weather_condition[count_date--] = check_past_weather(check_date);
				check_past_weather(check_date, count_date--);
				//console.log(count_date);
        	}
    		break;
    	case 2:
    		var count_date = 5;
    		for(var i=curDate-1; i > curDate-9; i--){
    			if(i == curDate-2 || i == curDate-3){}else{
    				if(i <= 0){
                        var check_date = curYear+""+(curMonth - 1)+""+(i + prevMonth_enddate);
                    }else {  var check_date = curYear+""+curMonth+""+i; }
                    console.log("dd2: "+check_date);
					check_past_weather(check_date, count_date--);
    			}
        	}
    		break;
    	case 3:
    		var count_date = 6;
    		for(var i=curDate-1; i > curDate-10; i--){
    			if(i == curDate-3 || i == curDate-4){}else{
    				if(i <= 0){
                        var check_date = curYear+""+(curMonth - 1)+""+(i + prevMonth_enddate);
                    }else {  var check_date = curYear+""+curMonth+""+i; }
                    console.log("dd3: "+check_date);
					check_past_weather(check_date, count_date--);
	    		}
        	}
    		break;
    	case 4:
    		var count_date = 7;
    		for(var i=curDate-1; i > curDate-11; i--){
    			if(i == curDate-4 || i == curDate-5){}else{
    				if(i <= 0){
                        var check_date = curYear+""+(curMonth - 1)+""+(i + prevMonth_enddate);
                    }else {  var check_date = curYear+""+curMonth+""+i; }
                    console.log("dd4: "+check_date);
					check_past_weather(check_date, count_date--);
    			}
        	}
    		break;
    	case 5:
    		var count_date = 8;
    		for(var i=curDate-1; i > curDate-12; i--){
    			if(i == curDate-5 || i == curDate-6){}else{
    				if(i <= 0){
                        var check_date = curYear+""+(curMonth - 1)+""+(i + prevMonth_enddate);
                    }else {  var check_date = curYear+""+curMonth+""+i; }
                    console.log("dd5: "+check_date);
					check_past_weather(check_date, count_date--);
    			}
        	}
    		break;
    }



    function todayWeather(today_weather_data,today_tag){
        if(today_weather_data == "clear"){
            $("#tag_" + today_tag).append('<p class="weather_icon">&#xf00d;</p>');
       }else if(today_weather_data == "cloud"){
            $("#tag_" + today_tag).append('<p class="weather_icon">&#xf013;</p>');
       }else if(today_weather_data == "rain"){
            $("#tag_" + today_tag).append('<p class="weather_icon">&#xf019;</p>');
       }else if(today_weather_data == "snow"){
            $("#tag_" + today_tag).append('<p class="weather_icon">&#xf01b;</p>');
       }
    }



    function check_past_weather(date, count_date){
    	console.log(count_date);

    	var weather_string = "";
        var count_clear = 0;
	 	var count_cloudy = 0;
	 	var count_rainy = 0;
	 	var count_snowy = 0;

	 	//console.log(count_date);

    	$.ajax({
	        url: 'http://api.wunderground.com/api/3b6709cb1560b9d9/history_'+date+'/q/NY/New_York.json',
	        dataType: 'jsonp',
	        success: function(dataWeGotViaJsonp)
	        {
	            var data = dataWeGotViaJsonp;
	            var len = data['history']['observations'].length;
	            
	            
	            for(var i=0; i <len; i++){
	            	if(data['history']['observations'][i].date.hour >= 7 && data['history']['observations'][i].date.hour <= 19 ){

	            		// rain
	            		if(data['history']['observations'][i]['conds'].includes("Drizle") || data['history']['observations'][i]['conds'].includes("Rain") || data['history']['observations'][i]['conds'].includes("Shower") || data['history']['observations'][i]['conds'].includes("Squalls") || data['history']['observations'][i]['conds'].includes("Hail")){
	            				count_rainy++;
	            		}else if(data['history']['observations'][i]['conds'].includes("Snow") || data['history']['observations'][i]['conds'].includes("Ice")){
	            				count_snowy++;
	            		}else if(data['history']['observations'][i]['conds'].includes("Clear") || data['history']['observations'][i]['conds'].includes("Sunny")){
	            				count_clear++;
	            		}else if(data['history']['observations'][i]['conds'].includes("Cloud") || data['history']['observations'][i]['conds'].includes("Overcast") || data['history']['observations'][i]['conds'].includes("Fog")){
	            				count_cloudy++;
	            		}


	            		weather_string = weather_string + data['history']['observations'][i]['conds'];
	   						
	            	}
	            }
	            
	           // console.log(data['history']['observaton']['conds']);
	            // console.log(check_estimate_conds(count_rainy, count_snowy, count_clear, count_cloudy));
	           
	           weather_condition[count_date] = check_estimate_conds(count_rainy, count_snowy, count_clear, count_cloudy);

	           console.log("weather_condition["+count_date+"] - "+ date + " : " + weather_condition[count_date]);

               if(weather_condition[count_date] == "clear"){
                    $("#tag_" + (count_date )).append('<p class="weather_icon">&#xf00d;</p>');
               }else if(weather_condition[count_date] == "cloud"){
                    $("#tag_" + (count_date )).append('<p class="weather_icon">&#xf013;</p>');
               }else if(weather_condition[count_date] == "rain"){
                    $("#tag_" + (count_date )).append('<p class="weather_icon">&#xf019;</p>');
               }else if(weather_condition[count_date] == "snow"){
                    $("#tag_" + (count_date )).append('<p class="weather_icon">&#xf01b;</p>');
               }

	        },
	        error: function(e)
	        {  
	            $('.h_logo').append("No 'Access-Control-Allow-Origin' header is present on the requested resource.");

	        } 
	    });               

    }


    function check_estimate_conds(rain, snow, clear, cloud){
    	var conds = [rain, snow, clear, cloud];
    	conds.sort(function(a, b){return b-a})
    	if(conds[0] == rain){
    		return "rain";
    	}else if(conds[0] == snow){
    		return "snow";
    	}else if(conds[0] == clear){
    		return "clear";
    	}else if(conds[0] == cloud){
    		return "cloud";
    	}

    }

 });

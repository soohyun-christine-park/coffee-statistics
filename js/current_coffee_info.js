
$(document).ready(function(){

	var total_coffee_data;
	var recent_coffee;
	var recent_remainedCoffee;
	var check_current = true;
    var check_current_pot_history = true;
    var taken_time = "";
    var check_cups = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    var curDate = (new Date()).getDate(); 
    var curMonth = (new Date()).getMonth(); curMonth++;
    var curYear = (new Date()).getFullYear();
    var today = "";
    var url = "https://cgp-api.controlgroup.com/coffee_monitor_select?date=";
    var brewed = false;
    var brewed_time = "";
    var count_sHour = 0;
    var total_brewed_pots = 0;
    var brewed_coffee = 0;

    today = curMonth + "/" + curDate + "/" + curYear;  

   // today = "03/30/2015";
    url = url + today;



    console.log(url);

	$.ajax({
        url: url,
        dataType: 'json',
        success: function(dataWeGotViaJsonp)
        {
            var len = dataWeGotViaJsonp.length;
			total_coffee_data = len;
            var b = 0;

            for(var i=0;i<len;i++){
                user = dataWeGotViaJsonp[i]; 


                if(user['createddate'].substr(11,2) >= 7 && user['createddate'].substr(11,2) < 19){

                    if(user['carafepresent']){  // check the brewed_time : created_time
                        brewed = false;
                        brewed_time = user['createddate'].substr(11,8); // check the last created_time of the pot (which means pot's first created time)
                        
                        if(total_brewed_pots == 0){
                            brewed_coffee = user['cupsremaining'];
                        }

                        if(i == len-1){ // if the first data is just pot's created time (not starts with false data)
                            console.log("Brewed at " + brewed_time);

                            
                            if(b != brewed_time.substr(0,2)  && brewed_time != ""){  // if just one pot brewed in an hour
                                count_sHour = 1;
                                b = brewed_time.substr(0,2);
                                console.log(b);
                                $('.brewed_beans').append('<div id="bean_'+b+'" class="coffee_bean" style="-webkit-transform-origin:0.59em 16.7em;-webkit-transform:rotate('+(29.5*b)+'deg)"><img style="-webkit-transform:rotate('+(-1*31.3*b)+'deg)"/></div>');
                                //    // i = time. if 0 = 12, 1 = 1, 2 = 2, .... 12 = 12
                        }else if(b == brewed_time.substr(0,2)  && brewed_time != ""){    // if two or three pots brewed in an hour ***** SET 3 pots an hour maximum based on usual max pots data.
                                count_sHour++;
                                console.log("2" + b)
                                if(count_sHour == 2){  // if two pots brewed in an hour - add one bean img and rearrange coffee beans
                                    $('#bean_'+b).css({
                                        '-webkit-transform':'rotate('+(29.5*b)+'deg)'
                                    });
                                    b = brewed_time.substr(0,2);
                                    $('.brewed_beans').append('<div id="bean_'+b+'2"  class="coffee_bean" style="-webkit-transform-origin:0.59em 16.7em;-webkit-transform:rotate('+(30.3*b)+'deg)"><img style="-webkit-transform:rotate('+(-1*31.6*b)+'deg) "/></div>');   
                        }else if(count_sHour == 3  && brewed_time != ""){  // if three pots brewed in an hour - add one bean img and rearrange coffee beans 
                                    $('#bean_'+b).css({
                                        '-webkit-transform':'rotate('+(-1 *29.3*b)+'deg)'
                                    });
                                    $('#bean_'+b+'2').css({
                                        '-webkit-transform':'rotate('+(-1 *30.1*b)+'deg)'
                                    });

                                    $('.brewed_beans').append('<div id="bean_'+b+'2" class="coffee_bean" style="-webkit-transform-origin:0.59em 16.7em;-webkit-transform:rotate('+(30.8*b)+'deg)"><img style="-webkit-transform:rotate('+(-1*31.5*b)+'deg) "/></div>');   
                                   
                                }
                        }
                        }
                        
                    }else if(!brewed && i != 0){  // got the brewed_time : created_time 
                        brewed = true;
                        total_brewed_pots++;
                        if(total_brewed_pots == 1 && brewed_time != ""){
                            console.log(brewed_coffee);
                            $('.brewed_coffee').animate({
                                'height' : (((92.5/12) * (brewed_coffee))+ 0.5) + '%'
                            },'slow', function(){
                                $('#takenTime_'+brewed_coffee).css({'display':'none'});
                                $('.time_container').animate({'opacity':'0.95'},'slow');
                            });
                            // $('.time_container').css({
                            //     'height' : (((90/12) * (brewed_coffee)) - 1.8) + '%'
                            // },'slow');
                            if(brewed_time.substr(0,2) >= 7 && brewed_time.substr(0,2) < 12){
                                $('.last_brewed_time').append(brewed_time.substr(0,5) + ' am');
                            }else if(brewed_time.substr(0,2) >= 12 && brewed_time.substr(0,2) < 19){
                                var time_format = parseInt(brewed_time.substr(0,2));
                                if(brewed_time.substr(0,2) == 12){}else{time_format -=12;}
                                $('.last_brewed_time').append(time_format + ""+ brewed_time.substr(2,3) + ' pm');
                            }

                            b = brewed_time.substr(0,2);
                            $('.brewed_beans').append('<div id="bean_'+b+'" class="coffee_bean" style="-webkit-transform-origin:0.59em 16.7em;-webkit-transform:rotate('+(30*b)+'deg)"><img  style="-webkit-transform:rotate('+(-1*31.3*b)+'deg)"/></div>');
                                
                        }

                        console.log("Brewed at " + brewed_time);
                        if(b != brewed_time.substr(0,2)  && brewed_time != ""){  // if just one pot brewed in an hour
                                count_sHour = 1;
                                b = brewed_time.substr(0,2);
                                console.log(b);
                                $('.brewed_beans').append('<div id="bean_'+b+'" class="coffee_bean" style="-webkit-transform-origin:0.59em 16.7em;-webkit-transform:rotate('+(29.8*b)+'deg)"><img style="-webkit-transform:rotate('+(-1*31.3*b)+'deg)"/></div>');
                                //    // i = time. if 0 = 12, 1 = 1, 2 = 2, .... 12 = 12
                        }else if(b == brewed_time.substr(0,2) && brewed_time != ""){    // if two or three pots brewed in an hour ***** SET 3 pots an hour maximum based on usual max pots data.
                                count_sHour++;
                                console.log("2" + b)
                                if(count_sHour == 2){  // if two pots brewed in an hour - add one bean img and rearrange coffee beans
                                    $('#bean_'+b).css({
                                        '-webkit-transform':'rotate('+(29.5*b)+'deg)'
                                    });
                                    b = brewed_time.substr(0,2);
                                    $('.brewed_beans').append('<div id="bean_'+b+'2"  class="coffee_bean" style="-webkit-transform-origin:0.59em 16.7em;-webkit-transform:rotate('+(30.3*b)+'deg)"><img style="-webkit-transform:rotate('+(-1*31.6*b)+'deg) "/></div>');   
                        }else if(count_sHour == 3  && brewed_time != ""){  // if three pots brewed in an hour - add one bean img and rearrange coffee beans 
                                    $('#bean_'+b).css({
                                        '-webkit-transform':'rotate('+(29.2*b)+'deg)'
                                    });
                                    $('#bean_'+b+'2').css({
                                        '-webkit-transform':'rotate('+(29.95*b)+'deg)'
                                    });

                                    $('.brewed_beans').append('<div id="bean_'+b+'2" class="coffee_bean" style="-webkit-transform-origin:0.59em 16.7em;-webkit-transform:rotate('+(30.7*b)+'deg)"><img style="-webkit-transform:rotate('+(-1*31.5*b)+'deg) "/></div>');   
                                   
                                }
                        }
                    }else if(!user['carafepresent'] && i == 0){
                        if(user['cupsremaining'] == 0){
                                recent_remainedCoffee = 0;
                                $('.coffee').css({
                                    'height' : (((90/12) * recent_remainedCoffee)) + '%'
                                });

                                $('.brewed_coffee').css({
                                    'opacity':'0'
                                });

                                $('.last_brewed_time').css({
                                    'display':'none'
                                });

                                $('.smoke').css({
                                    'opacity':'0'
                                });
                                $('.coffee_died').css({
                                    'display':'block'
                                });
                        
                            
                        }
                    }


                    if(user['carafepresent'] && check_current && brewed_time !=""){ // check coffee status just NOW
                    	check_current = false;
                    	recent_remainedCoffee = user['cupsremaining'];

                    	

                    	$('.remained_coffee_cups').html('<span style="font-size:2.1em; font-weight:900; letter-spacing:-0.1em;">'+recent_remainedCoffee+'</span>&nbsp cups left');
                        
                        if(recent_remainedCoffee >= 10){
                            $('.last_brewed_time').css({
                                'right':'40.8%'
                            });
                        }else{
                            $('.last_brewed_time').css({
                                'right':'39.9%'
                            });
                        }
                    	
                        if(recent_remainedCoffee){
                            $('.coffee').animate({
                        		'height' : (((90/12) * recent_remainedCoffee)) + '%'
                        	},'slow',function(){
                                if(!recent_remainedCoffee){
                                    $('.smoke').css({
                                        'opacity':'0'
                                    });
                                    $('.coffee_died').css({
                                        'display':'block'
                                    });
                                }
                        	});
                        }else {
                            $('.coffee').css({
                                'height' : (((90/12) * recent_remainedCoffee)) + '%'
                            });

                            $('.brewed_coffee').css({
                                'opacity':'0'
                            });

                            $('.last_brewed_time').css({
                                    'display':'none'
                                });

                            $('.smoke').css({
                                'opacity':'0'
                            });
                            $('.coffee_died').css({
                                'display':'block'
                            });
            
                        }

                    }else if(!user['carafepresent'] && check_current && brewed_time !=""){
                        check_current = false;
                        recent_remainedCoffee = user['cupsremaining'];

                        

                        $('.remained_coffee_cups').html('<span style="font-size:2.1em; font-weight:900; letter-spacing:-0.1em;">'+recent_remainedCoffee+'</span>&nbsp cups left');
                        
                        if(recent_remainedCoffee >= 10){
                            $('.last_brewed_time').css({
                                'right':'40.8%'
                            });
                        }else{
                            $('.last_brewed_time').css({
                                'right':'39.9%'
                            });
                        }
                        
                        if(recent_remainedCoffee){
                            $('.coffee').animate({
                                'height' : (((90/12) * recent_remainedCoffee)) + '%'
                            },'slow',function(){
                                if(!recent_remainedCoffee){
                                    $('.smoke').css({
                                        'opacity':'0'
                                    });
                                    $('.coffee_died').css({
                                        'display':'block'
                                    });
                                }
                            });
                        }else {
                            $('.coffee').css({
                                'height' : (((90/12) * recent_remainedCoffee)) + '%'
                            });

                            $('.brewed_coffee').css({
                                'opacity':'0'
                            });

                            $('.last_brewed_time').css({
                                    'display':'none'
                                });

                            $('.smoke').css({
                                'opacity':'0'
                            });
                            $('.coffee_died').css({
                                'display':'block'
                            });
            
                        }
                    }

                    // if(!user['carafepresent']){check_pot = false;}

                    if(user['carafepresent'] && check_current_pot_history && brewed_time !=""){

                        console.log("brewed coffee: " + brewed_coffee + ", cupsremaining: " + user['cupsremaining']);

                        	switch(user['cupsremaining']){
                        		case 11:
                                    if(!check_cups[11]){
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining']))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[11] = true;
                                    }
                                    break;
                        		case 10: 
                                    if(!check_cups[10]){ 
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining']))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[10] = true;
                                    }
                                    break;
                        		case 9:
                                    if(!check_cups[9]){ 
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining']))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>'); 
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[9] = true;
                                    }
                                    break;
                        		case 8: 
                                    if(!check_cups[8]){ 
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining']))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[8] = true;
                                    }
                                    break;
                        		case 7: 
                                    if(!check_cups[7]){ 
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining'] ))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[7] = true;
                                    }
                                    break;
                        		case 6: 
                                    if(!check_cups[6]){ 
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining']))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[6] = true;
                                    }
                                    break;
                        		case 5: 
                                    if(!check_cups[5]){ 
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining'] ))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[5] = true;
                                    }
                                    break;
                        		case 4:
                                    if(!check_cups[4]){  
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining'] ))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[4] = true;
                                    }
                                    break;
                        		case 3: 
                                    if(!check_cups[3]){ 
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining']))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[3] = true;
                                    }
                                    break;
                        		case 2: 
                                    if(!check_cups[2]){ 
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining']))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[2] = true;
                                    }
                                    break;
                        		case 1:
                                    if(!check_cups[1]){ 
                        			 $('.time_0').after('<div id="takenTime_'+user['cupsremaining']+'" class="time" style="position:absolute; bottom:'+(0 + (100/12) * ( user['cupsremaining'] ))+'%; left:2%; width:100%; height:calc(100%/12); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 formatTime(user['createddate'].substr(11,2), user['cupsremaining']);
                                     check_cups[1] = true;
                                    }
                                    break;
                        		case 0: 
                                    if(!check_cups[0]){
                        			// $('.time_0').after('<div id="takenTime_'+i+'" class="time" style="position:absolute; bottom:'+(0 + (100/11) * ( user['cupsremaining'] - 1))+'%; left:2%; width:100%; height:calc(100%/11); color:#4c2b25; font-family:futura;">&nbsp'+user['createddate'].substr(11,5)+'</div>');
                        			 check_cups[0] = true;
                                    }
                                    break;
                        	}

                        
                    }else if(!user['carafepresent']){
                        check_current_pot_history = false;

                    }

                    
       				
                }// if statement to set range of time : 8am - 8pm

                if(brewed_time == "" && i == len -1 || $('.last_brewed_time').html() == "Brewed at " && i == len -1){
                    recent_remainedCoffee = 0;
                    $('.coffee').css({
                        'height' : '0%'
                    });

                    $('.brewed_coffee').css({
                        'opacity':'0'
                    });

                    $('.last_brewed_time').css({
                        'display':'none'
                    });

                    $('.smoke').css({
                        'opacity':'0'
                    });
                    $('.coffee_died').css({
                        'display':'block'
                    });
                } 
            } //for loop
           
        },
        error: function(e)
        {  
            $('.h_logo').append("No 'Access-Control-Allow-Origin' header is present on the requested resource.");
        } 
    });

    function formatTime(time, cupID){
        if(time >= 7 && time < 12){
                $('#takenTime_'+cupID).append(' am');
        }else if(time >= 12 && time < 19){
            var time_format = parseInt(brewed_time.substr(0,2));
            if(brewed_time.substr(0,2) == 12){}else{time_format -=12;}
            $('#takenTime_'+cupID).html(time_format + ""+ brewed_time.substr(2,3) + ' pm');
                           
                //$('#takenTime_'+cupID).append(' pm');
        }
    }    



    setTimeout(function(){
        $('#coffee_cup_container').css({
             '-webkit-transform':'translate(-200%,0%)',
             '-webkit-transition':'-webkit-transform 1s ease-out',
        });

        $('#clock_container').css({
             '-webkit-transform':'translate(200%,0%)',
             '-webkit-transition':'-webkit-transform 1s ease-out',
        });

        setTimeout(function(){
        window.location.href = "html/today_consumed_coffee.html";
        },2000);
        
    },20000);

 });
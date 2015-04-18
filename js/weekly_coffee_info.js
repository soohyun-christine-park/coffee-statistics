
$(document).ready(function(){

	
    var curDate = (new Date()).getDate(); 
    var curMonth = (new Date()).getMonth(); curMonth++;
    var prevMonth_enddate = getNumberOfDays(curYear, curMonth);
    if(curMonth <10){curMonth = '0'+curMonth;}
    if(curDate <10){curDate = '0'+curDate;}
    var curYear = (new Date()).getFullYear();
    var curDay = (new Date()).getDay();
    var count = 1;
    var today = ""; 

    var coffee_data = [0,0,0,0,0,0,0,0,0,0];

    function getNumberOfDays(year, month) {
        var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
        return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

     today = curMonth + "/" + curDate + "/" + curYear;  

    // today = "03/27/2015";
    // url = url + today;
    // curDate = 27;
    // curDay = 5;

    $('.graph_box').show().addClass('animated bounceInUpL');    
    $('.description_container').show().addClass('animated bounceInDownL');
    $('.desc_tag_container').show().addClass('animated bounceInDownL');

    setTimeout(function(){

        start_to_check();
        check_coffee_history("https://cgp-api.controlgroup.com/coffee_monitor_select?date=" + today, curDay + 4);

        $('.graph_box').removeClass('animated bounceInUpL');    
        $('.description_container').removeClass('animated bounceInDownL');
        $('.desc_tag_container').removeClass('animated bounceInDownL');

        

         setTimeout(function(){
            $('.graph_box').addClass('animated bounceOutDownL');    
            $('.description_container').addClass('animated bounceOutUpL');
            $('.desc_tag_container').addClass('animated bounceOutUpL');
            setTimeout(function(){show_ending();},2500);
            
         },16000);

    },2000);
    // for(var i =0; i< 5; i++){
    //     $('#container_'+i).append('<div id="coffee_cup_'+i+'" class="coffee_cup_container"><div class="coffee_cup"><div class="cup" style="background-color:#F7F7F7"></div><div class="cup_content" style="background-color:#F7F7F7"><div class="coffee" style="background-color:#201210"></div></div><div class="handle_top" style="background-color:#F7F7F7"><div class="handle_hole_container"><div class="handle_hole"></div></div></div><div class="handle" style="background-color:#F7F7F7"></div></div></div>');
    //     $('#container_'+(i+5)).append('<div id="coffee_cup_'+i+5+'" class="coffee_cup_container"><div class="coffee_cup"><div class="cup"></div><div class="cup_content"><div class="coffee"></div></div><div class="handle_top"><div class="handle_hole_container"><div class="handle_hole"></div></div></div><div class="handle"></div></div></div>');
    // }


    for(var i=0; i <= 10; i++){
        $('#container_' + i).css({
            'left': (((i)%5) * 100 / 5) + '%'
        });
        console.log((((i)%5) * 100 / 5));
    }

    for(var i=0; i<10; i++){
        if(i <5){
            $('#tag_'+i).css({
                'left': 20 * (i%5) + '%',
                'bottom': -25 + '%',
                'opacity':0
            });
        }else if(i >= 5 && i <10){
            $('#tag_'+i).css({
                'left': 14.3 + 20 * (i%5) + '%',
                'bottom': -23 + '%',
                'opacity':0
            });

            if(curDay == 1 && i == 5){
                $('#tag_'+i + ' p.t_tag').css({
                    // 'background-color':'yellow'
                });
                $('.today_indicator').css({
                    'left':'10.6%'
                });
            }else if(curDay == 2  && i == 6){
                $('#tag_'+i + ' p.t_tag').css({
                });
                $('.today_indicator').css({
                    'left':'30.2%'
                });
            }else if(curDay == 3  && i == 7){
                $('#tag_'+i + ' p.t_tag').css({
                });
                $('.today_indicator').css({
                    'left':'49.6%'
                });
            }else if(curDay == 4  && i == 8){
                $('#tag_'+i + ' p.t_tag').css({
                });
                $('.today_indicator').css({
                    'left':'69%'
                });
            }else if(curDay == 5  && i == 9){
                $('#tag_'+i + ' p.t_tag, #tag_'+i + ' p.t_tag:before').css({
                    '-webkit-animation':'today_tag 2s infinite'
                });
                $('.today_indicator').css({
                    'left':'88.4%'
                });
                // $('.today_indicator').animate({
                //     'bottom':'-230%',
                //     'opacity':'1'
                // },'slow');
            }
        }
    }


    function start_to_check(){

    switch(curDay){
        case 1:
            var count_date = 4;
            for(var i=curDate-3; i > curDate-8; i--){
                if(i <= 0){
                    var check_date = (curMonth - 1) + "/" + (i + prevMonth_enddate) + "/" + curYear;
                }else {  var check_date = curMonth + "/" + i + "/" + curYear; }
                var url ="https://cgp-api.controlgroup.com/coffee_monitor_select?date=" + check_date;
                check_coffee_history(url, count_date--);
            }
            break;
        case 2:
            var count_date = 5;
            for(var i=curDate-1; i > curDate-9; i--){
                if(i == curDate-2 || i == curDate-3){}else{
                    if(i <= 0){
                        var check_date = (curMonth - 1) + "/" + (i + prevMonth_enddate) + "/" + curYear;
                    }else {  var check_date = curMonth + "/" + i + "/" + curYear; }
                    var url ="https://cgp-api.controlgroup.com/coffee_monitor_select?date=" + check_date;
                    check_coffee_history(url, count_date--);
                }
            }
            break;
        case 3:
            var count_date = 6;
            for(var i=curDate-1; i > curDate-10; i--){
                if(i == curDate-3 || i == curDate-4){}else{
                    if(i <= 0){
                        var check_date = (curMonth - 1) + "/" + (i + prevMonth_enddate) + "/" + curYear;
                    }else {  var check_date = curMonth + "/" + i + "/" + curYear; }
                    var url ="https://cgp-api.controlgroup.com/coffee_monitor_select?date=" + check_date;
                    check_coffee_history(url, count_date--);
                }
            }
            break;
        case 4:
            var count_date = 7;
            for(var i=curDate-1; i > curDate-11; i--){
                if(i == curDate-4 || i == curDate-5){}else{
                    if(i <= 0){
                        var check_date = (curMonth - 1) + "/" + (i + prevMonth_enddate) + "/" + curYear;
                    }else {  var check_date = curMonth + "/" + i + "/" + curYear; }
                    var url ="https://cgp-api.controlgroup.com/coffee_monitor_select?date=" + check_date;
                    check_coffee_history(url, count_date--);
                }
            }
            break;
        case 5:
            var count_date = 8;
            for(var i=curDate-1; i > curDate-12; i--){
                if(i == curDate-5 || i == curDate-6){}else{
                    if(i <= 0){
                        var check_date = (curMonth - 1) + "/" + (i + prevMonth_enddate) + "/" + curYear;
                    }else {  var check_date = curMonth + "/" + i + "/" + curYear; }
                    var url ="https://cgp-api.controlgroup.com/coffee_monitor_select?date=" + check_date;
                    check_coffee_history(url, count_date--);
                }
            }
            break;
    }

    }



    function check_coffee_history(url, dayID){

        var coffee_count = 0;
        var pot_count = 0;
        var prevState = false;


        $.ajax({
            url: url,
            dataType: 'json',
            success: function(dataWeGotViaJsonp)
            {
                var len = dataWeGotViaJsonp.length;

                for(var i=0;i<len;i++){
                    user = dataWeGotViaJsonp[i]; 
            
                    if(user['createddate'].substr(11,2) >= 8 && user['createddate'].substr(11,2) < 20){

                        
                        if(user['carafepresent']){
                            prevState = true;
                            coffee_count++;
                        }else if(!user['carafepresent'] && prevState){
                            prevState = false;
                            coffee_count--;
                            pot_count++;
                        }
                        
                    } // if statement to set range of time : 8am - 8pm

                } //for loop
            
                    coffee_data[dayID] = coffee_count;

                    if(dayID < 5){

                        console.log("coffee_data["+dayID+"]: " + coffee_data[dayID]);
                        $('#day_' + dayID).animate({
                            'height': coffee_count + '%'
                        },1000);
                        $('#tag_' + dayID + ' p.l_tag').html(coffee_count);
                        $('#tag_' + dayID).animate({
                            'bottom': coffee_count-23 + '%',
                            'opacity':1
                        },1000);

                    }else if(dayID >= 5 && dayID <10){
                        setTimeout(function(){
                            $('.last_week').animate({
                                'opacity':'0.3',
                            },'slow');
                            $('#tag_0, #tag_1, #tag_2, #tag_3, #tag_4').animate({
                                'opacity':'0.3',
                                'box-shadow': '0em 0.1em 0.1em rgba(0,0,0,0.1)'
                            },'slow');
                            $('.this_week').animate({
                                'opacity':'1'
                            },'slow');
                            $('#day_' + dayID).animate({
                                'height': coffee_count + '%'
                            },1000);
                            $('#tag_' + dayID + ' p.t_tag').html(coffee_count);
                            $('#tag_' + dayID).animate({
                                'bottom': coffee_count-23 + '%',
                                'opacity':1
                            },1000);
                        },4000);
                    }

                
            },
            error: function(e)
            {  
                $('.h_logo').append("No 'Access-Control-Allow-Origin' header is present on the requested resource.");
            } 
        });

    }


    function show_statistics(){

        for(var i=0; i<5; i++){
            $('#day_' + i).animate({
                'height': coffee_data[i] + '%'
            },1000);
            $('#tag_' + i + ' p').html(coffee_data[i]);
            $('#tag_' + i).animate({
                'bottom': coffee_data[i]-23 + '%',
                'opacity':1
            },1000);
        }

        setTimeout(function(){
            //show_thisweek_Graph();
          

        },3000);

    }

    //setTimeout(function(){
    function show_ending(){
       
        $('.coffee_cup').show().addClass('animated bounceInDownS');
        $('.cup_shadow').show().addClass('animated zoomIn');
        $('.cup').animate({
            'box-shadow': '0.5em 0em 0em rgba(0,0,0,0.3)'
        },'slow');

        setTimeout(function(){
            $('.falling_coffee').animate({
                'height':'63%'
                 },1300, function(){
                    $('.coffee').animate({
                        'height':'80%'
                     },1300);
                    
                    $('.falling_coffee').animate({
                        'height':'0%',
                        'top':'50%'
                     },1500, function(){
                        setTimeout(function(){
                            $('.enjoy_txt').show().addClass('animated fadeInUp');
                            setTimeout(function(){
                                $('.coffee_cup').removeClass('animated bounceInDownS');
                                $('.enjoy_txt').removeClass('animated fadeInUp');
                                $('.cup_shadow').removeClass('animated zoomIn');

                                $('.coffee_cup').addClass('animated fadeOutRightBigL');
                                $('.cup_shadow').addClass('animated fadeOutRightBigL');
                                $('.enjoy_txt').addClass('animated fadeOutLeftBigL');
                                //window.location.href = "html/today_consumed_coffee.html";
                                setTimeout(function(){
                                //function show_ending_animation(){
                                  $('.mask_frame').animate({
                                      'width':'150em',
                                      'height':'150em',
                                      'margin-top':'-75em',
                                      'margin-left':'-75em'
                                  },2000, function(){
                                    setTimeout(function(){
                                      window.location.href = "../coffee-statistics.html";
                                    },4000);
                                  });
                                },50);
                            },5000);
                        },1000);
                     });
                 });
            },1000);

        
        }
    //},20000);
        


 });


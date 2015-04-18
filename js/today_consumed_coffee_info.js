
$(document).ready(function(){

	var coffee_count = 0;
    var pot_count = 0;
    var curDate = (new Date()).getDate(); 
    var curMonth = (new Date()).getMonth(); curMonth++;
    var curYear = (new Date()).getFullYear();
    var today = "";
    var url = "https://cgp-api.controlgroup.com/coffee_monitor_select?date=";
    var prevState = false;

    today = curMonth + "/" + curDate + "/" + curYear;  

    //today = "03/04/2015";
    url = url + today;



    console.log(url);

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
           
           console.log(coffee_count);
           console.log(pot_count);

           

           

        showCups(coffee_count);
        //showCups(3);
            
        },
        error: function(e)
        {  
            $('.h_logo').append("No 'Access-Control-Allow-Origin' header is present on the requested resource.");
        } 
    });

        


 });


function showCups(coffee_cups){
    var cup = 0;
    var cup_col = 0;
    var cup_row = 0;

    $('.scene_1').show().addClass('animated fadeIn');

    if(coffee_cups <= 10){
        cup_col = coffee_cups;
        cup_row = 1;
    }else if(coffee_cups > 10 && coffee_cups < 70){
        cup_col = 10;
        cup_row = Math.floor(coffee_cups/10);
    }else if(coffee_cups > 70){
        cup_col = 10;
        cup_row = 6;
    }

    if(coffee_cups <= 100){

        setInterval(function(){
            if(cup < coffee_cups){
                 if(coffee_cups <5){
                     $('#falling_cups_view').append('<div class="coffee_cup_container" style="left:'+(50-((coffee_cups-2) * 7) + 10.1 *(cup%cup_col))+'%;  margin-left:'+((-7))+'%; top:'+(10 * cup_row - (Math.floor(cup/cup_col) * 22))+'%"><div class="coffee_cup"><div class="cup"></div><div class="cup_content"><div class="coffee"></div></div><div class="handle_top"><div class="handle_hole_container"><div class="handle_hole"></div></div></div><div class="handle"></div></div></div>');
                 }else if(coffee_cups >=5 && coffee_cups <10){
                     $('#falling_cups_view').append('<div class="coffee_cup_container" style="left:'+(50-((coffee_cups-2) * 5.5) + 10.1 *(cup%cup_col))+'%;  margin-left:'+((-7))+'%; top:'+(10 * cup_row - (Math.floor(cup/cup_col) * 22))+'%"><div class="coffee_cup"><div class="cup"></div><div class="cup_content"><div class="coffee"></div></div><div class="handle_top"><div class="handle_hole_container"><div class="handle_hole"></div></div></div><div class="handle"></div></div></div>');
                 }else if(coffee_cups >= 10 && cup <= 100){
                    $('#falling_cups_view').append('<div class="coffee_cup_container" style="left:'+(10 + 10.1 *(cup%cup_col))+'%;  margin-left:'+(-7)+'%; top:'+(10 * cup_row - (Math.floor(cup/cup_col) * 18))+'%"><div class="coffee_cup"><div class="cup"></div><div class="cup_content"><div class="coffee"></div></div><div class="handle_top"><div class="handle_hole_container"><div class="handle_hole"></div></div></div><div class="handle"></div></div></div>');
                }

                cup++;//margin-left:'+(-1*(cup%10))+'%;
                console.log(cup)
                
                if(cup > 5 && coffee_cups > 5 && coffee_cups <= 10){
                        $('#falling_cups_view').css({
                            '-webkit-transform':'scale(0.8,0.8)',
                            '-webkit-transition':'-webkit-transform 1.5s ease-out',
                        });
                }else if(cup > 10 && coffee_cups > 10 && coffee_cups <= 30){
                        $('#falling_cups_view').css({
                            '-webkit-transform':'translate(0,10%) scale(0.6,0.6)',
                            '-webkit-transition':'-webkit-transform 1.5s ease-out',
                        });
                }else if(cup > 25 && coffee_cups > 30 && coffee_cups <= 45){
                        $('#falling_cups_view').css({
                            '-webkit-transform':'translate(0,10%) scale(0.6,0.6)',
                            '-webkit-transition':'-webkit-transform 1.5s ease-out',
                        });
                }else if(cup > 37 && coffee_cups > 45 && coffee_cups <= 60){
                        $('#falling_cups_view').css({
                            '-webkit-transform':'translate(0,10%) scale(0.6,0.6)',
                            '-webkit-transition':'-webkit-transform 1.5s ease-out',
                        });
                }else if(cup > 37 && coffee_cups > 60 && coffee_cups <= 80){
                        $('#falling_cups_view').css({
                            '-webkit-transform':'translate(0,10%) scale(0.5,0.5)',
                            '-webkit-transition':'-webkit-transform 1.5s ease-out',
                        });
                }else if(cup > 37 && coffee_cups > 80 && coffee_cups <= 100){
                        $('#falling_cups_view').css({
                            '-webkit-transform':'translate(0,14%) scale(0.4,0.4)',
                            '-webkit-transition':'-webkit-transform 1.5s ease-out',
                        });
                }else if(cup > 37 && coffee_cups > 100 && coffee_cups <= 200){
                        // $('#falling_cups_view').css({
                        //     '-webkit-transform':'translate(0,14%) scale(0.3,0.3)',
                        //     '-webkit-transition':'-webkit-transform 1.5s ease-out',
                        // });
                }
            
                if(cup == coffee_cups){
                    setTimeout(function(){
                        showNumberAnimation(coffee_cups);
                    },2000);
                }

            }

            
        },70);

        

    }else if(coffee_cups > 100 && coffee_cups <= 200){
        
    }
}

function showNumberAnimation(coffee_cups){
    //coffee_cups = 1;

    $('.scene_2').show();

    $('.number').html(coffee_cups);
           
  
    $('#filter').animate({
        'opacity':'0.88'
    },'slow');

    $('.description').animate({
            'opacity':'1',
            'bottom':'17%'
        },'slow');

    setTimeout(function(){
        if(coffee_cups <= 10){
            $({someValue: -1}).animate({
                someValue: coffee_cups
            }, {duration : 1000, easing:'swing', step: function(){
                $('.number').text(Math.ceil(this.someValue));

           }});

            setTimeout(function(){
                $('#consumed_coffee_text_info').css({
                    '-webkit-animation': 'blink 1s forwards'
                });
           },2000);

        }else{
            $({someValue: -1}).animate({
                someValue: coffee_cups
            }, {duration : 3000, easing:'swing', step: function(){
                $('.number').text(Math.ceil(this.someValue));

           }});

           setTimeout(function(){
                $('#consumed_coffee_text_info').css({
                    '-webkit-animation': 'blink 1s forwards'
                });

                setTimeout(function(){
                        $('#falling_cups_view').css({
                             '-webkit-transform':'scale(0.000001)',
                             '-webkit-transition':'-webkit-transform 0.5s ease-out',
                        });

                        $('.opa').animate({
                             'opacity':'0'
                        },'slow');

                        // $('#consumed_coffee_text_info').css({
                        //      '-webkit-transform':'scale(0)',
                        //      '-webkit-transition':'-webkit-transform 1s ease-out',
                        // });

                        setTimeout(function(){
                            window.location.href = "weekly_coffee_statistic.html";
                        },2000);
                        
                },4000);
           },4000);
        }
        

        $('.number').animate({'opacity':'1'},'slow');
        
    },2000);

    // setTimeout(function(){
    //     $('#coffee_cup_container').css({
    //          '-webkit-transform':'translate(-200%,0%)',
    //          '-webkit-transition':'-webkit-transform 1s ease-out',
    //     });

    //     $('#clock_container').css({
    //          '-webkit-transform':'translate(200%,0%)',
    //          '-webkit-transition':'-webkit-transform 1s ease-out',
    //     });

    //     setTimeout(function(){
    //     window.location.href = "html/today_consumed_coffee.html";
    //     },2000);
        
    // },20000);
     
}




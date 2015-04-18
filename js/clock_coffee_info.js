$(document).ready(function(){

  var clock = Snap(".clock");
  var frame = clock.circle(32,32,30).attr({
    fill: "#ffffff",
    stroke: "#FB6454",
    strokeWidth: 4,
    path:"M32,32 L32,4 A28,28 1 0,1 190,35 z"
  });


  var hours = clock.rect(29.5, 16, 4, 21, 2).attr({fill: "#344d5a"});
  var minutes = clock.rect(31, 12, 2, 25, 1).attr({fill: "#344d5a"});
  var seconds = clock.path("M30.5,38.625c0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5c0-0.656-0.414-1.202-1-1.406V10.125c0-0.277-0.223-0.5-0.5-0.5s-0.5,0.223-0.5,0.5v27.094C30.914,37.423,30.5,37.969,30.5,38.625z M31,38.625c0-0.552,0.448-1,1-1s1,0.448,1,1s-0.448,1-1,1S31,39.177,31,38.625z").attr({
    fill: "#D34532",
  });
  var middle = clock.circle(32,32,2).attr({
    fill: "#ffffff",
    stroke: "#D34532",
    strokeWidth: 2
  })

  // CLOCK Timer

  var updateTime = function() {
    var currentTime, data, hour, minute, second;
    currentTime = new Date();
    second = currentTime.getSeconds();
    minute = currentTime.getMinutes();
    //minute = 10;

    hour = currentTime.getHours();
    //hour = 5;

    hour = (hour > 12)? hour -12 : hour;
    hour = (hour == '00')? 12 : hour;
    hour = hour + minute / 60;
    hours.animate({transform: "r" + hour * 30 + "," + 32 + "," + 32}, 200, mina.elastic);
    minutes.animate({transform: "r" + minute * 6 + "," + 32 + "," + 32}, 200, mina.elastic);
    seconds.animate({transform: "r" + second * 6 + "," + 32 + "," + 32}, 500, mina.elastic);
    }

  setInterval(updateTime, 1000);

    

  


 });


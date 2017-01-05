var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.lineWidth = 1;
ctx.strokeStyle = '#fff';
var margin = canvas.width/10;
var markers = [];
var data = [];

//
//
//
// function add_hover_listeners() {
//   $(".event_poster").hover(function() {
//     $(this).addClass("hightlight");
//     draw_dots($(this).index());
//   }, function() {
//     $(this).removeClass("hightlight");
//   });
// }
//slider
function build_slider() {
  var speed = 10;
  var go_left, go_right;

  function get_gallery_width() {
    //http://stackoverflow.com/a/6005984/4062341
    var totalWidth = 0;
    $('.event_poster').each(function(index) {
      totalWidth += parseInt($(this).outerWidth(), 10);
    });
    return totalWidth;
  }

  function slide(dir) {
    if (dir == "right") {
      if ( Math.abs(parseInt($("#poster_gallery").css("margin-left"),10)) < get_gallery_width() - $($(".wrapper")[0]).width() + $(".event_poster:last").width()) {
        $("#poster_gallery").css("margin-left","-=" + speed + "px");
      }
    }else{
      if ( Math.abs(parseInt($("#poster_gallery").css("margin-left"),10)) > 0) {
        $("#poster_gallery").css("margin-left","+=" + speed + "px");
      }
    }
  }

  $(".left").hover(function() {
    go_left = setInterval(function() {
      slide("left");
    }, 10);
  },function() {
    clearInterval(go_left);
  });
  $(".right").hover(function() {
    go_right = setInterval(function() {
      slide("right");
    }, 10);
  },function() {
    clearInterval(go_right);
  });

  $('.wrapper').bind('mousewheel', function(event) {
    //http://stackoverflow.com/a/10545584/4062341
    if (event.originalEvent.wheelDelta >= 0) {
      slide("left");
    }
    else {
      console.log('Scroll down');
      slide("right");
    }
  });
}
//slider end



function draw_dots(x){
  for (var i = 0; i < markers.length; i++) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(margin, 0);
    ctx.arc((canvas.width - (margin*2)) * markers[i], canvas.height/2, 5, 0, 2 * Math.PI, false);
    ctx.restore();
    ctx.fillStyle = (x == i ? "gray" : "white");
    ctx.fill();
    ctx.stroke();
  }
  // DRAW DATE
  // http://stackoverflow.com/a/3552493
  var monthNames = [
    "Jan", "Febr", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sept", "Oct",
    "Nov", "Dec"
  ];
  if (data[x] != null) {

    console.log(monthNames[new Date(data[x].date).getMonth()] + "/" + new Date(data[x].date).getDate());
    var date_to_print = new Date(data[x].date).getFullYear()  + " " + monthNames[new Date(data[x].date).getMonth()] + " " + new Date(data[x].date).getDate();

    ctx.beginPath();
    ctx.save();
    ctx.translate(margin - 70, 0); // center date under dot
    ctx.font = '20pt Helvetica ';
    ctx.fillStyle = "white";
    ctx.fillText(date_to_print, (canvas.width - (margin*2)) * markers[x], canvas.height- 20);
    ctx.restore();
    ctx.fill();
    ctx.stroke();
  }
}

function build_event_gallery(events) {
  console.log("building event gallery");
  // console.log(events.length);
  var prototype = $("#prototype");

  for (var i = 0; i < events.length; i++) {
    var new_event = prototype.clone();
    new_event.removeClass("hidden");
    var event_poster = new_event.find(".event_poster")[0];
    event_poster.src = events[i].img_url;
    event_poster.alt = events[i].heading;
    new_event.hover(function() {
      $(this).find("img").addClass("hightlight");
      // console.log($(this).index());
      draw_background_and_line();
      draw_dots($(this).index()-1); //-1 because of prototype
    }, function() {
      $(this).find("img").removeClass("hightlight");
    });
    new_event.click(function() {
      console.log(events[$(this).index() -1] + " index is " + $(this).index());
      var event = events[$(this).index() -1];
      $("#heading").text(event.heading);
      $("#date").text(new Date(event.date ));
      $("#text").text(event.text);
    });

    new_event.appendTo($("#poster_gallery"));
  }
  build_slider();
}



function draw_background_and_line() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(margin, canvas.height /2);
  ctx.lineTo(canvas.width - margin, canvas.height /2);
  ctx.lineWidth = 4;
  ctx.stroke();
}


function get_markers(events) {
  var markers = [];
  for (var i = 0; i < events.length; i++) {
    console.log(events[i].date);
    markers.push(
      (events[i].date - events[0].date)/
      (events[events.length -1].date - events[0].date)
    );
  }
  return markers;
}



//////////////////////////////////////////
//http://stackoverflow.com/a/30839332/4062341
function compare(a, b) {
  if (a.date< b.date)
  return -1;
  if (a.date > b.date)
  return 1;
  return 0;
}
/////////////////////////////////////////



function request_JSON_object() {
  $.ajax({
    type: "GET",
    url: "/event/all",
    // data: myusername,
    cache: false,
    success: function(response){
      console.log("request ok");
      // console.log(response);
      response.sort(compare);
      // console.log(response);
      data = response;
      build_event_gallery(response);

      markers = get_markers(response);
      draw_background_and_line();
      draw_dots(1);
    }
  });
}

$( document ).ready(function() {
  console.log( "ready!" );
  request_JSON_object();

  console.log(window.location.href.indexOf("?logout"));
  if (window.location.href.indexOf("?logout") > 0) {
    alert("You are logged out now")
  }
  // draw_dots(1);

});

$( window ).resize(function() {
  console.log( "resize!" );
  margin = canvas.width/10;
  draw_background_and_line();
  draw_dots();
  build_slider();
});

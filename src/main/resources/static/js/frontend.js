var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.lineWidth = 5;
ctx.strokeStyle = '#000';
var margin = canvas.width/10;
var markers = [];

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
function draw_dots(x){
  for (var i = 0; i < markers.length; i++) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(margin, 0);
    ctx.arc((canvas.width - (margin*2)) * markers[i], canvas.height/2, 10, 0, 2 * Math.PI, false);
    ctx.restore();
    ctx.fillStyle = (x == i ? "red" : "gray");
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
      $(this).addClass("hightlight");
      // console.log($(this).index());
      draw_dots($(this).index()-1); //-1 because of prototype
    }, function() {
      $(this).removeClass("hightlight");
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
}



function draw_background_and_line() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(margin, canvas.height /2);
  ctx.lineTo(canvas.width - margin, canvas.height /2);
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
    url: "http://localhost:8080/event/all",
    // data: myusername,
    cache: false,
    success: function(response){
      console.log("request ok");
      // console.log(response);
      response.sort(compare);
      // console.log(response);
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


  // draw_dots(1);

});

$( window ).resize(function() {
  console.log( "resize!" );
  margin = canvas.width/10;
  draw_background_and_line();
  draw_dots();
});

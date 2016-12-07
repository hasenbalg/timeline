var events = [{
  "id": 8,
  "heading": "Ueberschrift 1",
  "text": "hier koennte ihre werbung stehen!",
  "img_url": "http://fillmurray.com/200/300",
  "date": 559724360
},
{
  "id": 9,
  "heading": "Ueberschrift 2",
  "text": "was anderes!",
  "img_url": "http://fillmurray.com/g/200/300",
  "date": 612428360
},
{
  "id": 9,
  "heading": "Ueberschrift 2",
  "text": "was anderes!",
  "img_url": "http://fillmurray.com/g/200/300",
  "date": 612428360
},
{
  "id": 9,
  "heading": "Ueberschrift 2",
  "text": "was anderes!",
  "img_url": "http://fillmurray.com/g/200/300",
  "date": 612428360
},
{
  "id": 10,
  "heading": "Ueberschrift 3",
  "text": "nochwas anderes!",
  "img_url": "http://fillmurray.com/200/300",
  "date": 391503560
}];

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

function draw_background_and_line() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(margin, canvas.height /2);
  ctx.lineTo(canvas.width - margin, canvas.height /2);
  ctx.stroke();
}


function get_markers() {
  events.sort(compare);
  var markers = [];
  for (var i = 0; i < events.length; i++) {
    markers.push(
      (events[i].date - events[0].date)/
      (events[events.length -1].date - events[0].date)
    );
  }
  return markers;
}

function draw_dots(x) {
  for (var i = 0; i < markers.length; i++) {
    // markers[i];
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

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.lineWidth = 5;
ctx.strokeStyle = '#000';
var margin = canvas.width/10;
var markers = get_markers();

$( document ).ready(function() {
  console.log( "ready!" );
  draw_background_and_line();
  get_markers();
  draw_dots(1);
});

$( window ).resize(function() {
  console.log( "resize!" );
  margin = canvas.width/10;
  draw_background_and_line();
  draw_dots(1);
});

// $(".event_poster").hover(function(){
//   $(this).addClass('hover');
//   draw_dots($(this).index());
// }, function(){
//   $(this).removeClass('hover');
// });​

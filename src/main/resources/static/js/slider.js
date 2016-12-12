//http://stackoverflow.com/a/7375513/4062341
var animation_time = 500;
var mouseover_left = false;
var mouseover_right = false;

function slide_left() {
  if (mouseover_left) {
    var first = $("#poster_gallery").children().first();
    $("#poster_gallery").animate(
      {"margin-left": "-=" + ($(first).outerWidth()) + "px"},
      animation_time,
      function() {
        $(first).remove();
        $("#poster_gallery").css("margin-left", 0);
        first.appendTo($("#poster_gallery"));
        slide_left();
    });
  }

}

function slide_right() {
  if (mouseover_right) {
    var last = $("#poster_gallery").children().last();
    $("#poster_gallery").css("margin-left", -($(last).outerWidth()));
    last.prependTo($("#list"));
    $("#poster_gallery").animate({"margin-left": "+=" + ($(last).outerWidth()) + "px"}, animation_time, function() {
      $("#poster_gallery").css("margin-left", 0);
      slide_right();
    });
  }
}

function build_slider() {
  $(".left").click(function() {
    mouseover_left = true;
    slide_left();
    mouseover_left = false;
  });

  $(".right").click(function() {
    mouseover_right = true;
    slide_right();
    mouseover_right = false;
  });

  $(".left").hover(function() {
    mouseover_left = true;
    slide_left();
  }, function() {
    mouseover_left = false;
  });

  $(".right").hover(function() {
    mouseover_right = true;
    slide_right();
  }, function() {
    mouseover_right = false;
  });
}

function adjust_width() {
  // $("body").width(($(".box").length +2) * $(".box").outerWidth() );
  // console.log($(".box").outerWidth());
  var width = 0;
  $(".box").each(function() {
    console.log(width + " " + $(this).outerWidth());
    width += $(this).outerWidth();
  });
  $("body").width(width*1.5/*good guessing*/);
}

$("document").ready(function () {
  adjust_width();
}
);

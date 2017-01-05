$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "/metadata/all",
    cache: false,
    success: function(response){
      console.log("Sedding metadata");
      response = response[0]; //response is a list
       $("#title").text(response.heading);
       console.log(response.heading);
       $("body").css("background-image", "url(" + response.backgroundImgPath + ")");
       console.log(response.backgroundImgPath);

       $("#heading").text(response.heading);
       document.title = response.heading;
       $("#date").text(new Date());
       $("#text").text(response.description);
    }
  });
});

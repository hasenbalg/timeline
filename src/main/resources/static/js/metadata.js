$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/metadata/all",
    cache: false,
    success: function(response){
      console.log("Sedding metadata");
      response = response[0];
       $("#title").text(response.heading);
       console.log(response.heading);
       $("body").css("background-image", "url(" + response.backgroundImgPath + ")");
       console.log(response.backgroundImgPath);
    }
  });
});

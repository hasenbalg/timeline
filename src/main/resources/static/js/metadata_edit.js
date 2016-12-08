function set_values(response){
  console.log("Setting metadata");
  $("#title").val(response.heading);
  $("body").css("background-image", "url(" + response.backgroundImgPath + ")");
  $("#background_img_path").val(response.backgroundImgPath);
}

function request_metadata(){
  //runs once in the beginning
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/metadata/all",
    // cache: false,
    success: function(response){
      response = response[0]; //because I get a list
      set_values(response);
      add_change_listeners();
    }
  });
}
function send_new_metadata() {
  console.log("on change");
  var data = {
            heading:$("#title").val(),
            backgroundImgPath:$("#background_img_path").val()
        };
  console.log(data);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/metadata/modify",
    cache: false,
    dataType: 'json',
    data: JSON.stringify(data),
    // data: data,
    success: function(response){
      console.log("Setting metadata");
      response = response[0]; //because I get a list
      set_values(response);

    }
  });
}

function add_change_listeners() {
  console.log("adding change listener");
  $("#title").change(function() {
    send_new_metadata()
  });
  $("#background_img_path").change(function() {
    send_new_metadata()
  });
}

function add_click_listener() {
  console.log("adding click listener");
  //dirty fix to not get in endless loop
  $("#title").click(function() {
    add_change_listeners();
  });
  $("#background_img_path").click(function() {
    add_change_listeners();
  });
  // $("#background_img_path").click(add_change_listeners());
}
// var titel = $("#titel");
// var background_img_path = $("#background_img_path");
$(document).ready(function() {
  request_metadata();
  //add_click_listener();


});

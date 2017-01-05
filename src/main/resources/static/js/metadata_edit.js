function set_values(response){
  console.log("Setting metadata");
  $("#title").val(response.heading);
  $("body").css("background-image", "url(" + response.backgroundImgPath + ")");
  $("#background_img_path").val(response.backgroundImgPath);
  $("#description").val(response.description);
}

function request_metadata(){
  //runs once in the beginning
  $.ajax({
    type: "GET",
    url: "/metadata/all",
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
            backgroundImgPath:$("#background_img_path").val(),
            description:$("#description").val()
        };
  console.log(data);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "/metadata/modify",
    cache: false,
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(response){
      console.log("Setting metadata");
      response = response[0]; //because I get a list
      set_values(response);

    }
  });
}

function add_change_listeners() {
  console.log("adding change listener");
  $("#background_img_path, #title, #description").change(function() {
    send_new_metadata()
  });
}

$(document).ready(function() {
  request_metadata();
});

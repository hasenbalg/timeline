function date_format_for_input_field(unixtime) {
  function leftPad(number, targetLength) {
    //http://stackoverflow.com/a/8043254/4062341
    var output = number + '';
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return output;
  }
  //http://stackoverflow.com/a/16211857
  var formattedDate = new Date(unixtime)
  var d = formattedDate.getDate();
  var m =  formattedDate.getMonth();
  m += 1;  // JavaScript months are 0-11
  var y = formattedDate.getFullYear();
  d = leftPad(d, 2);
  m = leftPad(m, 2);
  console.log(y + "-" + m + "-" + d);
  return y + "-" + m + "-" + d;
}

function reset_page() {
  // remove all li but the first one (#prototype)
  var list_elements = $("#event_gallery").find("li");
  for (var i = 0; i < list_elements.length; i++) {
    console.log(list_elements[i]);
    if (list_elements[i].id != "prototype") {
      $(list_elements[i]).remove();
    }
  }
  //start again
  request_data();
}

function send_modified_data(form){
  //gather data
  var data = {
    "id": form.find(".id").val(),
    "heading": form.find(".heading").val(),
    "text": form.find(".text").val(),
    "img_url": form.find(".img_path").val(),
    "date":form.find(".date").val()
  };
  console.log(data);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/event/modify",
    cache: false,
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(response){
      console.log("request ok");
      // reset_page(); //works but not handy while editing
    }
  });
}

function send_new_data(form){
  //gather data
  console.log("huhu");
  var data = {
    "heading": form.find(".heading").val(),
    "text": form.find(".text").val(),
    "img_url": form.find(".img_path").val(),
    "date":form.find(".date").val()
  };
  console.log(data);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/event/create",
    cache: false,
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(response){
      console.log("request ok");
      reset_page();
    }
  });
}

function delete_record(li){
  var id = li.find(".id").val();
  console.log(id + " is id the id to delete");
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/event/delete/" + id,
    success: function(response){
      // build_event_forms(response);
      li.remove();
    }
  });
}

function add_form_for_new_event() {
  var prototype = $("#prototype");
  var new_li = prototype.clone().removeAttr('id');
  var form = new_li.find("form");

  form.find(".id").val("");
  form.find(".heading").val("");
  form.find(".text").val("");
  form.find(".img_path").val("");
  form.find(".date").val("");
  form.find(".date").attr("placeholder","YYYY-MM-DD");
  form.find(".poster").attr('src',"http://placehold.it/200x300");
  form.find(".delete").remove();
  form.find(".add").removeClass("hidden");

  //add lister to button
  form.find(".add").click(function() {
    send_new_data($($(this).parent("form")));
  });
  //add onchange listener to the img_path
  form.find(".img_path").change(function() {
    $(this).siblings(".poster").attr('src',$(this).val());
  });

  //render it
  new_li.prependTo($("#event_gallery"));
}



function build_event_forms(events) {
  console.log(events.length + "length of json obj");
  var prototype = $("#prototype");
  for (var i = 0; i < events.length; i++) {
    var new_li = prototype.clone().removeAttr('id');
    var form = new_li.find("form");

    form.find(".id").val(events[i].id);
    form.find(".heading").val(events[i].heading);
    form.find(".text").val(events[i].text);
    form.find(".img_path").val(events[i].img_url);
    form.find(".date").val(date_format_for_input_field(events[i].date));
    form.find(".poster").attr('src',events[i].img_url);

    //add onchange listener to form
    //https://api.jquery.com/category/events/form-events/
    $(form).change(function() {
      send_modified_data($(this));
    });

    //add onchange listener to the img_path
    form.find(".img_path").change(function() {
      $(this).siblings(".poster").attr('src',$(this).val());
    });

    //add onchange listener to the delete button
    form.find(".delete").click(function() {
      delete_record($(this).parents("li"));
    });
    //render it
    new_li.appendTo($("#event_gallery"));
  }
  add_form_for_new_event();
}

function request_data() {
  //runs once in the beginning
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/event/all",
    success: function(response){
      build_event_forms(response);
    }
  });
}

$(document).ready(function() {
  request_data();
});

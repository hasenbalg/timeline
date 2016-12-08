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

function build_event_forms(events) {
  console.log(events.length + "length of json obj");
  var prototype = $("#prototype");
  for (var i = 0; i < events.length; i++) {
    var new_li = prototype.clone().removeAttr('id');
    var form = new_li.find("form");
    //$(form).attr("id", "form" + events[i].id);
    form.find(".id").val(events[i].id);
    form.find(".heading").val(events[i].heading);
    form.find(".text").val(events[i].text);
    form.find(".img_path").val(events[i].img_url);
    form.find(".date").val(date_format_for_input_field(events[i].date));
    form.find(".poster").attr('src',events[i].img_url);
    new_li.appendTo($("#event_gallery"));
  }
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

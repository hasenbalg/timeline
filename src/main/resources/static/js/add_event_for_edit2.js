// override
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
      $(this).siblings(".img_wrapper").find(".poster").attr('src',$(this).val());
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

// override
function add_form_for_new_event() {
console.log("override");
}

function reset_add_event_form() {
  console.log("RESETTING FORM ADD NEW EVENT!!!!!!!!!!!!!!!!!");
  var add_new_event_form = $("#new2");
  add_new_event_form.each(function() {
    //delete user input
    $(this).find("input, textarea").val("");
    // $(this).find("input, textarea").css("background-color", "red");
  });
  add_new_event_form.find(".date").attr("placeholder","YYYY-MM-DD");
  add_new_event_form.find(".poster").attr('src',"http://lorempixel.com/200/300");

  //add lister to button
  add_new_event_form.find(".add").click(function() {
    send_new_data($($(this).parent("form")));
  });
  //add onchange listener to the img_path
  add_new_event_form.find(".img_path").change(function() {
    $(this).siblings(".poster").attr('src',$(this).val());
  });

  // add_new_event_form.css("background-color", "green");
  console.log("");
  console.log(add_new_event_form);
  console.log("");

  add_new_event_form.find("button").click(function(event) {
    console.log("should reset event form!!!!!!!!!!!");
    send_new_data($(this));
    reset_add_event_form();
    event.preventDefault();
    });

}

  $(document).ready(function() {
    reset_add_event_form();
  });

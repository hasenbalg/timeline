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

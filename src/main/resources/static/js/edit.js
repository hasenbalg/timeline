$(".existing_entry > input,.existing_entry > textarea").change(function(e) {
    request = $.ajax({
        url: "process.php",
        type: "post",
        data: {
          event_nr: $(this).attr('name').replace( /^\D+/g, ''),
          column: $(this).attr('name').replace( /\d+/g, ''),
          content: $(this).val()
        }
    });
    request.done(function (response, textStatus, jqXHR){
      $("#result").html(response);
    });
    request.fail(function (jqXHR, textStatus, errorThrown){
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });
});
// dont submit form of existing_entry
$("form.existing_entry").submit(function(e){
    return false;
});

$("#plus").click(function(){
  console.log("button clicked");
  var last_box = $( ".box:last" );
  var new_box = last_box.clone();
  new_box.find("input, textarea").val("");
  new_box.find("input, textarea").each(function() {
    //delet trailing number
    $(this).attr("name", $(this).attr('name').replace( /\d+/g, ''));
  });
  var submit_button = $('<input>', {type: 'submit', value: 'submit'});
  new_box.append(submit_button);
  new_box.attr('id', 'new');
  new_box.removeClass("existing_entry");
  new_box.submit(function(event) {
    new_form_submit($(this));
        event.preventDefault();
    });
  new_box.insertAfter( last_box );
  adjust_width();
  $('html, body').animate({scrollLeft: $(".box:last").offset().left}, 800);
});


function new_form_submit(form) {
  console.log("submit");
  request = $.ajax({
      url: "process.php",
      type: "post",
      data: {
        heading: form.children("[name='heading']").val(),
        text: form.children("[name='text']").val(),
        date: form.children("[name='date']").val()
      }
  });
  request.done(function (response, textStatus, jqXHR){
    $("#result").html(response);
    form.addClass("existing_entry");
    form.removeAttr('id');
    form.find("input[type=submit]").remove();
    adjust_width();
  });
  request.fail(function (jqXHR, textStatus, errorThrown){
      console.error(
          "The following error occurred: "+
          textStatus, errorThrown
      );
  });
};

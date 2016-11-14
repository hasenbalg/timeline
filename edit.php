<link rel="stylesheet" href="css/main.css" media="screen" title="no title">




<?php
require_once("db.php");
require_once 'class.Event.php';

$list_of_events = [];

$sql = "SELECT id, heading, text, date FROM events ORDER BY date ASC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $event = new Event($row["id"], $row["heading"], $row["text"], $row["date"]);
    array_push($list_of_events, $event);
  }
} else {
  echo "0 results";
}

foreach ($list_of_events as $event) {
  ?>
  <form class="box existing_entry">
    <input type="text" name="heading<?php echo $event->get_id(); ?>" value = "<?php echo $event->get_heading(); ?>"/>
    <textarea name="text<?php echo $event->get_id(); ?>">
      <?php echo $event->get_text(); ?>
    </textarea>
    <input type="date" name="date<?php echo $event->get_id(); ?>" value = "<?php echo date('Y-m-d', strtotime($event->get_date())); ?>"/>
  </form>
  <?php
}
 ?>

 <!-- <form class="box new hidden">
   <input type="text" name="heading" value = "" placeholder="Heading"/>
   <textarea name="text">

   </textarea>
   <input type="date" name="date" value = ""/>
   <input type="submit" name="name" value="Save">
 </form> -->
 <button type="button" name="button" id="plus">+</button>
<div id="result">

</div>

 <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
 <script src="js/adjust_width.js" charset="utf-8"></script>
 <script src="js/edit.js" charset="utf-8"></script>

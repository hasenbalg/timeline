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
  <div class="box">
    <h1><?php echo $event->get_heading(); ?></h1>
    <p><?php echo $event->get_text(); ?></p>
    <p><?php echo $event->get_date(); ?></p>
  </div>
  <?php
}
 ?>

 <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
 <script src="js/edit.js" charset="utf-8"></script>
 <script src="js/adjust_width.js" charset="utf-8"></script>

 <a href="edit.php">edit</a>

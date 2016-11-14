  <?php
// print_r($_POST);
if (
  isset($_POST["event_nr"])&&
  isset($_POST["column"])&&
  isset($_POST["content"])
) {
  require_once 'db.php';
  $sql = "
  UPDATE events
  SET " . $_POST["column"] . " = '" . $_POST["content"] . "'
  WHERE id='" . $_POST["event_nr"] . "';";
  echo $sql;
  if ($conn->query($sql)) {
    echo "ok";
  }else {
    echo "no no";
  }
}

if (
  isset($_POST["heading"]) &&
  isset($_POST["text"]) &&
  isset($_POST["date"])
) {
  require_once 'db.php';
  $sql = "
  INSERT INTO events (heading,text,date)
VALUES ('" . $_POST["heading"] . "','" . $_POST["text"] . "','" . $_POST["date"] . "');
  ";

  echo $sql;
  if ($conn->query($sql)) {
    echo "ok inserted";
  }else {
    echo "no no not inserted";
  }
}
   ?>

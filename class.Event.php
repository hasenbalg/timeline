<?php

/**
*
*/

class Event
{
  public $_id = "";
  public $_heading = "";
  public $_text = "";
  public $_date = "";
  public $_imgs = "";

  

  function __construct($id, $heading, $text, $date)
  {
    $this->_id  = $id;
    $this->_heading = $heading;
    $this->_text = $text;
    $this->_date = $date;
  }

  public function get_id()
  {
    return $this->_id;
  }

  public function set_id($id)
  {
    $id = $this->_id;
  }

  public function get_heading()
  {
    return $this->_heading;
  }

  public function set_heading($heading)
  {
    $heading = $this->_heading;
  }

  public function get_text()
  {
    return $this->_text;
  }

  public function set_text($text)
  {
    $text = $this->_text;
  }

  public function get_date()
  {
    return $this->_date;
  }

  public function set_date($date)
  {
    $date = $this->_date;
  }
}

?>

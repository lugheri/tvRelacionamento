<?php
namespace Controllers;
use Core\Controller;

class notFoundController extends Controller{
       
    public function index(){
      $this->returnJson(array());
    }
}
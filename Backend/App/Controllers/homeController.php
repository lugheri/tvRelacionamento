<?php
namespace Controllers;

use \Core\Controller;

class homeController extends Controller{
  public function index(){
    $this->returnJson(($this->getRequestData()));
  }

  public function testando($nome){
    echo 'Funfooou!!!!'.$nome;
  }
}
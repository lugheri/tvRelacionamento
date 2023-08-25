<?php
namespace Controllers;
use Core\Controller;
use Models\Apresentadores;
use Models\Jwt;

class apresentadoresController extends Controller{
	public function getApresentadores($status){
      $validate = $this->validate();
      if($validate==false){
        $this->returnJson('Erro Token');
        return;
      }    
      $A = new Apresentadores;
      $apresentadores = $A->listApresentadores($status); 
     
      return $this->returnJson($apresentadores);
  }
}
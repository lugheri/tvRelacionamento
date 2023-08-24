<?php 
namespace Core;

class Model{
    protected $db;

    public function __construct(){
        global $db;
        $this->db = $db;
    }

    //Metodos comuns a todas as models
    
}
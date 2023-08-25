<?php
namespace Controllers;
use Core\Controller;

class notFoundController extends Controller{
    public function __construct(){
        $this->modulo_ativo = 'errors';
    }

    public function index(){
       echo '404';
    }
}
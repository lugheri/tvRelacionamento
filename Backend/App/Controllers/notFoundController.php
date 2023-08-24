<?php
namespace Controllers;
use Core\Controller;

class notFoundController extends Controller{
    public function __construct(){
        $this->modulo_ativo = 'errors';
    }

    public function index(){
        $data['moduloAtivo']='errors';
        $data['telaAtual']='404';


        $this->loadTemplate($this->modulo_ativo.'/'.$data['telaAtual'],$data);
    }
}
<?php
namespace Controllers;
use Core\Controller;
use Models\Users;

class authController extends Controller{
    public function live(){
        $array = array('error'=>'false'); 
        $array['name'] = "tvRelacionamento" ;
        $array['status'] = true;
        $this->returnJson($array);
    }

    public function login(){
        $array = array('error'=>'');    
        $method = $this->getMethod();
        $data = $this->getRequestData();    
        if($method === 'POST'){
          if(!empty($data['username']) && !empty($data['pass'])){
            $u = new Users;
            if($u->checkCredentials($data['username'],$data['pass'])){
              $array['token'] = $u->createJWT();
            }else{
              $array['error'] = 'Usuário e/ou senha não inválidos!';
            }    
          }else{
            $array['error'] = 'Usuário e/ou senha não preenchidos!';
          }    
        }else{
          $array['error'] = 'Método de requisição incompatível!';
        }    
        $this->returnJson($array);
    }
    
    public function validate(){
        $array = array('token'=>'');
        $u = new Users;
        $data = $this->getRequestData();  
       
        $array['token'] = $u->validateJWT($data['hash_token']);
        $this->returnJson($array);
    }
}
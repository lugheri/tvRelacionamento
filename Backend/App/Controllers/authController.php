<?php
namespace Controllers;
use Core\Controller;
use Models\Users;
use Models\Jwt;

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
          if(!empty($data['username']) && !empty($data['password'])){
            $u = new Users;
            $userId = $u->checkCredentials($data['username'],$data['password']);
            if($userId){
              $array['success']=true;
              $array['token'] = $this->createJWT($userId);
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

   
  
    
   

    public function userToken(){
      $token = getallheaders()['Authorization'] ?? null;
      if (!$token) {
        $array = array('error'=>'noToken'); 
        $this->returnJson($array);
        return false;
      }
      $dataToken = $this->validateJWT($token);

      if(!$dataToken){
        $array = array('error'=>'No User Data');
        $this->returnJson($array);
        return false;
      }
      $array = array('success'=>true); 
      $array['userdata']=$dataToken;      
      $this->returnJson($array);
    }

    public function getUser($user_id){
      $validate = $this->validate();
      if($validate==false){
        $this->returnJson('Erro Token');
        return;
      }    
      $U = new Users;
      $userdata = $U->infoUser($user_id); 
      $cleanedResult = array();
      foreach ($userdata as $key => $value) {
        if (!is_numeric($key)) {
          $cleanedResult[$key] = $value;
        }
      }
      return $this->returnJson($cleanedResult);
  }
}
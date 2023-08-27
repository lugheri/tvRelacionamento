<?php
namespace Core;
use Core\Models;
use Models\Jwt;

class Controller{
 public function getMethod(){
  return $_SERVER['REQUEST_METHOD'];
 }

 public function getRequestData(){
  switch($this->getMethod()){
    case 'GET':
      return $_GET;
      break;
    case 'PUT':
    case 'DELETE':
      parse_str(file_get_contents('php://input'),$data);
      return (array) $data;
      break;
    case 'PATCH':
      $data = json_decode(file_get_contents('php://input'));
      if(is_null($data)){
        $data=$_POST;
      }
      if (!empty($_FILES)) {
        foreach ($_FILES as $fieldName => $fileData) {
          $data[$fieldName] = $fileData;
        }
      }
      return (array) $data;
      break;
    case 'POST':
      $data = json_decode(file_get_contents('php://input'));
      if(is_null($data)){
        $data=$_POST;
      }
      if (!empty($_FILES)) {
        foreach ($_FILES as $fieldName => $fileData) {
          $data[$fieldName] = $fileData;
        }
      }
      return (array) $data;
      break;
  }
 }

  public function validate(){
      $token = getallheaders()['Authorization'] ?? null;
      if (!$token) {
        $this->returnJson(false);
        return false;
      }
      $dataToken = $this->validateJWT($token);
      if(!$dataToken){
        $this->returnJson(false);
        return false;
      }
      return true;
    }

     public function createJWT($userId){
      $jwt = new Jwt();
      return $jwt->create(array('userid'=>$userId));  
    }
  
    public function validateJWT($token){
      $jwt = new Jwt();
      return $jwt->validate($token);
    }

 public function returnJson($array){
  header("Content-Type: application/json");
  echo json_encode($array);
  exit;
 }
    
}
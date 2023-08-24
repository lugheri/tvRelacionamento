<?php
namespace Models;

use \Core\Model;
use \Models\Jwt;

class Users extends Model {

  private $user_id;

  public function checkCredentials($username,$pass){
    $sql = $this->db->prepare("SELECT id, senha FROM users WHERE usuario=:username AND `status`=1");
    $sql->bindValue(':username',$username);
    $sql->execute();
    if($sql->rowCount() > 0 ) {
      $info = $sql->fetch();
    //  echo 'PASS '.$info['pass'];exit;
      if(md5($pass)==$info['senha']){
        $this->user_id=$info['id'];
        return true;
      }
      return false;
    }
    return false;
  }

  public function createJWT(){
    $jwt = new Jwt();
    return $jwt->create(array('user_id'=>$this->user_id));

  }

  public function validateJWT($token){
    $jwt = new Jwt();
    return $jwt->validate($token);
  }

}
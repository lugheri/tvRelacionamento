<?php
namespace Models;

use \Core\Model;

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
        return $this->user_id;
      }
      return false;
    }
    return false;
  }

  public function infoUser($userid){
    $sql = $this->db->prepare("SELECT * FROM users WHERE id=:userid");
    $sql->bindValue(':userid',$userid);
    $sql->execute();
    if($sql->rowCount() > 0 ) {
      $info = $sql->fetch();
      return $info;
    }
    return false;
  }


}
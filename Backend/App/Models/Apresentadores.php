<?php
namespace Models;
use \Core\Model;
use \PDOException;
use \PDO;

class Apresentadores extends Model {

  public function listApresentadores($status){
    $sql = $this->db->prepare("SELECT id, data, foto, nome, descricao, ordem, status FROM apresentadores WHERE status=:status");
    $sql->bindValue(':status',$status);
    $sql->execute();
    if($sql->rowCount() > 0 ) {
      $rows = $sql->fetchAll(\PDO::FETCH_ASSOC);
      return $rows;
    }
    return false;
  }


}
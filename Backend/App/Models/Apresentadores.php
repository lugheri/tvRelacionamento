<?php
namespace Models;
use \Core\Model;
use \PDOException;
use \PDO;

class Apresentadores extends Model {
  public function totalApresentadores($status){
    $sql = $this->db->prepare("SELECT COUNT(id) AS total FROM apresentadores WHERE status=:status");
    $sql->bindValue(':status',$status);
    $sql->execute();
    $rows = $sql->fetch();
    return $rows['total'];
  }

  public function listApresentadores($status,$pag){
    $pg = $pag-1;
    $reg=15;
    $init = 15*$pg;
    $sql = $this->db->prepare("SELECT a.id, a.data, a.foto, b.arquivo ,a.nome, a.descricao, a.ordem, a.status 
                                 FROM apresentadores AS a
                            LEFT JOIN biblioteca AS b ON a.foto=b.id
                                WHERE status=:status 
                                ORDER BY id DESC
                                LIMIT :init, :reg");
    $sql->bindValue(':status',$status);
    $sql->bindValue(':init', $init, \PDO::PARAM_INT);
    $sql->bindValue(':reg', $reg, \PDO::PARAM_INT);
    $sql->execute();
    if($sql->rowCount() > 0 ) {
      $rows = $sql->fetchAll(\PDO::FETCH_ASSOC);
      return $rows;
    }
    return false;
  }

  public function novoApresentador($idFoto,$nome,$descricao){
      $sql = $this->db->prepare("INSERT INTO `apresentadores` 
                                         (`data`,`foto`,`nome`,`descricao`,`ordem`,`status`)
                                  VALUES (now(),:idFoto,:nome,:descricao,1,1)");
    $sql->bindValue(':idFoto',$idFoto);
    $sql->bindValue(':nome',$nome);
    $sql->bindValue(':descricao',$descricao);
    $sql->execute();
    return  $this->db->lastInsertId();
  }

  public function infoApresentador($idApresentador){
    $sql = $this->db->prepare("SELECT a.id, a.data, a.foto, b.arquivo ,a.nome, a.descricao, a.ordem, a.status 
                                 FROM apresentadores AS a
                            LEFT JOIN biblioteca AS b ON a.foto=b.id
                                WHERE a.id=:idApresentador");
    $sql->bindValue(':idApresentador',$idApresentador);
    $sql->execute();
    if($sql->rowCount() > 0 ) {
      $rows = $sql->fetch(\PDO::FETCH_ASSOC);
      return $rows;
    }
    return false;
  }


}
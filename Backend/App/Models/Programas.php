<?php
namespace Models;
use \Core\Model;
use \PDOException;
use \PDO;

class Programas extends Model {
  public function totalProgramas($status){
    $sql = $this->db->prepare("SELECT COUNT(id) AS total FROM programas WHERE status=:status");
    $sql->bindValue(':status',$status);
    $sql->execute();
    $rows = $sql->fetch();
    return $rows['total'];
  }

  public function listProgramas($status,$pag){
    $pg = $pag-1;
    $reg=9;
    $init = 9*$pg;
    $sql = $this->db->prepare("SELECT p.id, p.desde, p.capa, b.arquivo, 
                                      p.idApresentador, a.nome as apresentador,
                                      p.titulo, p.descricao, p.ordem, p.status 
                                 FROM programas AS p
                            LEFT JOIN biblioteca AS b ON p.capa=b.id
                            LEFT JOIN apresentadores AS a ON p.idApresentador=a.id
                                WHERE p.status=:status 
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

  public function novoPrograma($idFoto,$idApresentador,$titulo,$descricao){
    $sql = $this->db->prepare("INSERT INTO `programas` 
                                          (`desde`,`idApresentador`,`capa`,`titulo`,`descricao`,`ordem`,`status`)
                                   VALUES (now(),:idApresentador,:idFoto,:titulo,:descricao,1,1)");
    $sql->bindValue(':idFoto',$idFoto);
    $sql->bindValue(':idApresentador',$idApresentador);
    $sql->bindValue(':titulo',$titulo);
    $sql->bindValue(':descricao',$descricao);
    $sql->execute();
    return  $this->db->lastInsertId();
  }

  public function infoPrograma($idPrograma){
    $sql = $this->db->prepare("SELECT p.id, p.desde, p.capa, b.arquivo, 
                                      p.idApresentador, a.nome as apresentador,
                                      p.titulo, p.descricao, p.ordem, p.status  
                                 FROM programas AS p
                            LEFT JOIN biblioteca AS b ON p.capa=b.id
                            LEFT JOIN apresentadores AS a ON p.idApresentador=a.id
                                WHERE p.id=:idPrograma");
    $sql->bindValue(':idPrograma',$idPrograma);
    $sql->execute();
    if($sql->rowCount() > 0 ) {
      $rows = $sql->fetch(\PDO::FETCH_ASSOC);
      return $rows;
    }
    return false;
  }

  public function editarInfoPrograma($idPrograma,$idApresentador,$titulo,$descricao){
    $sql = $this->db->prepare("UPDATE `programas` 
                                  SET `idApresentador`=:idApresentador,
                                      `titulo`=:titulo,
                                      `descricao`=:descricao
                                WHERE `id`=:idPrograma");
    $sql->bindValue(':idApresentador',$idApresentador);
    $sql->bindValue(':idPrograma',$idPrograma);
    $sql->bindValue(':titulo',$titulo);
    $sql->bindValue(':descricao',$descricao);
    $sql->execute();
    return  true;
  }

  public function salvarFotoPrograma($idPrograma,$idFoto){
    $sql = $this->db->prepare("UPDATE `programas` 
                                  SET `capa`=:idFoto
                                WHERE `id`=:idPrograma");
    $sql->bindValue(':idPrograma',$idPrograma);
    $sql->bindValue(':idFoto',$idFoto);
    $sql->execute();
    return  true;}

  public function totalVideosPrograma($idPrograma,$status){
    $sql = $this->db->prepare("SELECT COUNT(id) AS total FROM videos 
                                WHERE idPrograma=:idPrograma AND status=:status");
    $sql->bindValue(':idPrograma',$idPrograma);
    $sql->bindValue(':status',$status);
    $sql->execute();
    $rows = $sql->fetch();
    return $rows['total'];
  }

  public function listVideosPrograma($idPrograma,$status,$pag){
    $pg = $pag-1;
    $reg=9;
    $init = 9*$pg;
    $sql = $this->db->prepare("SELECT * FROM videos WHERE idPrograma=:idPrograma AND status=:status 
                                ORDER BY id DESC
                                LIMIT :init, :reg");
    $sql->bindValue(':idPrograma',$idPrograma);
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


}
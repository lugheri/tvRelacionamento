<?php 
namespace Models;
use \Core\Model;
use \PDOException;
use \PDO;

class Biblioteca extends Model{
	public function importarImagem($arquivo,$nome,$extensao,$tamanho,$width,$height,$pasta,$descricao){
		$sql = $this->db->prepare("INSERT INTO `biblioteca` 
			                                   (`data`,`arquivo`,`nome`,`descricao`,`tamanho`,`width`,`height`,`extensao`,`pasta`)
		                                VALUES (now(),:arquivo,:nome,:descricao,:tamanho,:width,:height,:extensao,:pasta)");
		$sql->bindValue(':arquivo',$arquivo);
		$sql->bindValue(':nome',$nome);
		$sql->bindValue(':descricao',$descricao);
		$sql->bindValue(':tamanho',$tamanho);
		$sql->bindValue(':width',$width);
		$sql->bindValue(':height',$height);
		$sql->bindValue(':extensao',$extensao);
		$sql->bindValue(':pasta',$pasta);
		$sql->execute();
		return  $this->db->lastInsertId();
	}	

	public function getInfo($idImg){
		$sql = $this->db->prepare("SELECT * FROM biblioteca WHERE id=:idImg");
		$sql->bindValue(':idImg',$idImg);
		$sql->execute();
		return $sql->fetch();

	}
}
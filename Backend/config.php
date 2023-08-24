<?php
date_default_timezone_set('America/Fortaleza');
require 'environment.php';

if(ENVIRONMENT == 'development')://Dados do ambiente de desenvolvimento
    //Versão
    $versao="v3";    
    //Url Base    
    define("BASE_URL","http://".$_SERVER["HTTP_HOST"].'/tvrelacionamento/'.$versao.'/backend/');
    
    //Configuracao de Cache
    define("NOCACHE",date("hms"));
    //Configuracao do banco de dados
    $config['dbname'] = 'tvrela03_tvr';
	$config['host'] = 'localhost'; 
	$config['dbuser'] = 'root';
	$config['dbpass'] = '';

elseif(ENVIRONMENT == "production"):
     //Url Base
     define("BASE_URL","https://".$_SERVER["HTTP_HOST"].'/backend/');
     
     //Configuracao de cache
     define("NOCACHE",620);     
     
     //Configuracao do banco de dados
     $config['dbname'] = 'tvrela03_tvr';
     $config['host'] = 'localhost';
     $config['dbuser'] = 'tvrela03_tvr';
     $config['dbpass'] = 'GhCs@IGC20201387#';
endif;

define("PUBLIC_PATH", BASE_URL."Public/assets/");

global $db;
try{
    $db = new PDO("mysql:dbname=".$config['dbname'].";host=".$config['host'],$config['dbuser'],$config['dbpass']);
    $db->exec("SET NAMES 'utf8'");
    $db->exec("SET character_set_connection=utf8");
    $db->exec("SET character_set_client=utf8");
    $db->exec("SET character_set_results=utf8");
}
catch (PDOException $e){
    echo "Erro ao conectar ao banco de dados ".$e->getMessage();
    exit();
}
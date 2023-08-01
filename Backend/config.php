<?php
date_default_timezone_set('America/Fortaleza');
require 'environment.php';
global $config;
if(ENVIRONMENT == 'development'){
    define("BASE_URL","http://".$_SERVER["HTTP_HOST"].'/corpusapi/');
    define("NOCACHE",date("hms"));

    $config['dbname'] = 'corpus';
	$config['host'] = 'localhost';
	$config['dbuser'] = 'root';
	$config['dbpass'] = '';
    $config['jwt_secret_key'] = 'abC123';

}else if(ENVIRONMENT == 'production'){
    define("BASE_URL","https://".$_SERVER["HTTP_HOST"].'/corpusapi/');
    define("NOCACHE",3500);

    $config['dbname'] = 'corpus';
    $config['host'] = 'localhost';
    $config['dbuser'] = 'corpus';
	$config['dbpass'] = '1234abc@';
    $config['jwt_secret_key'] = 'abC123';
}



//Conexao ao banco
global $db;
try{
    $db = new PDO("mysql:dbname=".$config['dbname'].";host=".$config['host'],$config['dbuser'],$config['dbpass']);
    $db->exec("SET NAMES 'utf8'");
    $db->exec('SET character_set_connection=utf8');
    $db->exec('SET character_set_client=utf8');
    $db->exec('SET character_set_results=utf8');
}
catch(PDOException $e){
    echo "Erro ao conectar ao banco de dados: ".$e->getMessage();
    exit();
}?>
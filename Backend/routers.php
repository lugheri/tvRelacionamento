<?php 
global $routes;
$routes = array();

//AUTH
//$routes['/rota/{parametro}] = '/rota/:parametro';
$routes['/live'] = '/auth/live';
$routes['/login'] = '/auth/login';
$routes['/userToken'] = '/auth/userToken';
$routes['/getUser/{userid}'] = '/auth/getUser/:userid';

//Apresentadores
$routes['/totalApresentadores/{status}'] = '/apresentadores/totalApresentadores/:status';
$routes['/getApresentadores/{status}/{pag}'] = '/apresentadores/getApresentadores/:status/:pag';
$routes['/novoApresentador'] = '/apresentadores/novoApresentador';
$routes['/infoApresentador/{idapresentador}'] = '/apresentadores/infoApresentador/:idapresentador';
$routes['/editarApresentador/{idapresentador}'] = '/apresentadores/editarApresentador/:idapresentador';

//$routes['/alunos/{nome}'] = '/alunos/buscar/:nome';




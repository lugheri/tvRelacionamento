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
$routes['/getApresentadores/{status}'] = '/apresentadores/getApresentadores/:status';

//$routes['/alunos/{nome}'] = '/alunos/buscar/:nome';




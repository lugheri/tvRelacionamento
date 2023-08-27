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
$routes['/listaTodosApresentadores'] = '/apresentadores/listaTodosApresentadores';
$routes['/novoApresentador'] = '/apresentadores/novoApresentador';
$routes['/infoApresentador/{idapresentador}'] = '/apresentadores/infoApresentador/:idapresentador';
$routes['/editarApresentador/{idapresentador}'] = '/apresentadores/editarApresentador/:idapresentador';
$routes['/trocarFotoApresentador'] = '/apresentadores/trocarFotoApresentador';
$routes['/removerApresentador/{idapresentador}'] = '/apresentadores/removerApresentador/:idapresentador';

//Programas
$routes['/totalProgramas/{status}'] = '/programas/totalProgramas/:status';
$routes['/getProgramas/{status}/{pag}'] = '/programas/getProgramas/:status/:pag';
$routes['/novoPrograma'] = '/programas/novoPrograma';
$routes['/infoPrograma/{idprograma}'] = '/programas/infoPrograma/:idprograma';
$routes['/editarPrograma/{idprograma}'] = '/programas/editarPrograma/:idprograma';
$routes['/trocarFotoPrograma'] = '/programas/trocarFotoPrograma';
$routes['/removerPrograma/{idprograma}'] = '/programas/removerPrograma/:idprograma';





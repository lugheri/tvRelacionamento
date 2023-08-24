<?php
namespace Core;

class Core{
    public function run(){
        $url = '/';

        if(isset($_GET['url'])){
            $url.= $_GET['url'];
        }

        

        //Routers
        $url = $this->checkRoutes($url);

        $params = array();
        
        if(!empty($url) && $url != '/'){
            $url = explode('/',$url);
            array_shift($url);

            $currentController = $url[0].'Controller';
            array_shift($url);

            if(isset($url[0]) && !empty($url[0])){
                $currentAction= $url[0];
                array_shift($url);
            }else{
                $currentAction = 'index';
            }

            if(count($url) > 0){
                $params = $url;
            }
        }else{
            $currentController = 'dashboardController';
            $currentAction = 'index';
        }

        $prefix = 'Controllers\\';

      

        if(!file_exists('App/Controllers/'.$currentController.'.php') || !method_exists($prefix.$currentController, $currentAction)){
            $currentController = 'notFoundController';
            $currentAction = 'index';
        }

        $newController = $prefix.$currentController;
        $c = new $newController();
        call_user_func_array(array($c, $currentAction),$params);
    }

    public function checkRoutes($url){
        global $routes; 
            

        foreach($routes as $pt => $newUrl){
           //Identificando argumentos e trocando por regex
            $pattern = preg_replace('(\{[a-z0-9]{1,}\})','([a-z0-9]{1,})',$pt);
            
            //Faz o match da url
            if(preg_match('#^('.$pattern.')*$#i',$url,$matches) === 1){
                array_shift($matches);
                array_shift($matches);

                // Pega todos os parametros e associa na url
                $itens = array();
                if(preg_match_all('(\{[a-z0-9]{1,}\})',$pt, $m)){
                    $itens = preg_replace('(\{|\})','',$m[0]);
                }

                //Associando
                $arg = array();
                foreach($matches as $key => $match){
                    $arg[$itens[$key]]=$match;
                }
                
                //montando a nova url
                foreach($arg as $argKey => $argValue){
                    $newUrl = str_replace(':'.$argKey, $argValue, $newUrl);                    
                }

                //setando url
                $url = $newUrl;
               
                break;            
            }
            
        }
        return $url;         
    }
}
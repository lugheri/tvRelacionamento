<?php
namespace Controllers;
use Core\Controller;
use Models\Jwt;
use Models\Apresentadores;
use Models\Programas;
use Models\Biblioteca;

class programasController extends Controller{
  
  public function totalProgramas($status){
      $validate = $this->validate();
      if($validate==false){
        $this->returnJson('Erro Token');
        return;
      }    
      $p = new Programas;
      $total = $p->totalProgramas($status);      
      return $this->returnJson($total);
  }

  public function getProgramas($status,$pag){
      $validate = $this->validate();
      if($validate==false){
        $this->returnJson('Erro Token');
        return;
      }    
      $p = new Programas;
      $programas = $p->listProgramas($status,$pag); 
     
      return $this->returnJson($programas);
  }

  public function novoPrograma(){
    $validate = $this->validate();
      if($validate==false){
        $this->returnJson('Erro Token');
        return;
    }        
    $method = $this->getMethod();
    if($method === 'POST'){
      $data = $this->getRequestData();       
      $p = new Programas;
      //Manipulando Imagem
      $infoFoto=$this->salvarFotoPrograma($data['foto'],$data['titulo']);
      if($infoFoto['erro']){
       $array['error'] =$infoFoto['erro'];
      }else{
        //Inserindo Dados do Programa
        $idPrograma=$p->novoPrograma($infoFoto['infoImagem']['id'],
                                     $data['idApresentador'],
                                     $data['titulo'],
                                     $data['descricao']);
          $array['success']=true;
          $array['idPrograma'] = $idPrograma;
        }
    }else{
      $array['error'] = 'Método de requisição incompatível!';
    }  
    $this->returnJson($array);  
  }

  public function infoPrograma($idprograma){
    $validate = $this->validate();
    if($validate==false){
       $this->returnJson('Erro Token');
        return;
    }    
    $p = new Programas;
    $infoPrograma = $p->infoPrograma($idprograma);
    return $this->returnJson($infoPrograma);
  }

  public function editarPrograma($idprograma){
    $validate = $this->validate();
    if($validate==false){
      $this->returnJson('Erro Token');
      return;
    }    
    $method = $this->getMethod();
    if($method === 'PATCH'){
      $p = new Programas;
      $data = $this->getRequestData();
      $p->editarInfoPrograma($idprograma,$data['idApresentador'],$data['titulo'],$data['descricao']);
      $array['success']=true;
    }else{
      $array['error'] = 'Método de requisição incompatível!';
    }  
    $this->returnJson($array);  
  }

  public function trocarFotoPrograma(){
    $validate = $this->validate();
    if($validate==false){
      $this->returnJson('Erro Token');
      return;
    }
    $method = $this->getMethod();
    if($method === 'POST'){
      $p = new Programas;
      $data = $this->getRequestData();     
      //Manipulando Imagem
      $infoFoto=$this->salvarFotoPrograma($data['foto'],$data['titulo']);
      if($infoFoto['erro']){
        $array['error'] =$infoFoto['erro'];
      }else{
        //Editando foto do Programa
        $p->salvarFotoPrograma($data['idPrograma'],$infoFoto['infoImagem']['id']);
        $array['success']=true;
      }      
    }else{
      $array['error'] = 'Método de requisição incompatível!';
    }  
    $this->returnJson($array);
  }

  public function removerPrograma($idprograma){
    $validate = $this->validate();
    if($validate==false){
      $this->returnJson('Erro Token');
      return;
    }
    $method = $this->getMethod();
    if($method === 'PATCH'){
       $p = new Programas;
       $data = $this->getRequestData();
       $p->editarStatusPrograma($idprograma,$data['status']);
       $array['success']=true;
    }else{
      $array['error'] = 'Método de requisição incompatível!';
    }  
    $this->returnJson($data);
  }

  public function salvarFotoPrograma($imageData,$programa){
    $arquivo=$imageData;
    $nome=$programa;
    $descricao ="Capa do programa ".$apresentador;
    $pasta=2;
    $data['erro']=0;
    
    if(isset($arquivo) && $arquivo['size'] > 0)
    {
      $extensoes_aceitas = array('png','jpeg','jpg','jfif');
      $array_extensoes   = explode('.', $arquivo['name']);
      $extensao = strtolower(end($array_extensoes));
      $size=$arquivo['size'];
      // Validamos se a extensão do arquivo é aceita
      if (array_search($extensao, $extensoes_aceitas) === false)
      {
        $data['erro']='Extensão Inválida!';
        exit;
      }
      // Verifica se o upload foi enviado via POST   
      if(is_uploaded_file($arquivo['tmp_name']))
      {
        $diretorio = 'biblioteca/';    
        // Verifica se o diretório de destino existe, senão existir cria o diretório  
        if(!file_exists($diretorio))
        {
          mkdir($diretorio);  
        }
        // Monta o caminho de destino com o nome do arquivo  
        $nome_arquivo = md5(date('Ymd-').$arquivo['name']) . '_' . $arquivo['name'];// .$_FILES['arquivo']['name'];  
        // Essa função move_uploaded_file() copia e verifica se o arquivo enviado foi copiado com sucesso para o destino  
        if (!move_uploaded_file($arquivo['tmp_name'], $diretorio.'/'.$nome_arquivo)){
          $data['erro']='Houve um erro ao gravar arquivo na pasta de destino:'.$diretorio.'/'.$nome_arquivo;
          exit;
        }
      }
      $imagem=$diretorio.'/'.$nome_arquivo;
      $dimen = GetImageSize($imagem); // pegamos a largura e altura e jogamos em um array.
      $b = new Biblioteca();
      $idImg=$b->importarImagem($nome_arquivo,$nome,$extensao,$size,$dimen[0],$dimen[1],$pasta,$descricao);
      $data['infoImagem']=$b->getInfo($idImg);
    }else{
      $data['erro'] = 'Falha ao recever o arquivo: '.$arquivo['name'];      
    }
    return $data;
  }
}
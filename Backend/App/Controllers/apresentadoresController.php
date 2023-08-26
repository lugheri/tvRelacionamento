<?php
namespace Controllers;
use Core\Controller;
use Models\Jwt;
use Models\Apresentadores;
use Models\Biblioteca;

class apresentadoresController extends Controller{
  public function totalApresentadores($status){
      $validate = $this->validate();
      if($validate==false){
        $this->returnJson('Erro Token');
        return;
      }    
      $a = new Apresentadores;
      $total = $a->totalApresentadores($status);      
      return $this->returnJson($total);
  }

	public function getApresentadores($status,$pag){
      $validate = $this->validate();
      if($validate==false){
        $this->returnJson('Erro Token');
        return;
      }    
      $a = new Apresentadores;
      $apresentadores = $a->listApresentadores($status,$pag); 
     
      return $this->returnJson($apresentadores);
  }

  public function novoApresentador(){
    $validate = $this->validate();
      if($validate==false){
        $this->returnJson('Erro Token');
        return;
    }    
    
    $method = $this->getMethod();
   
    if($method === 'POST'){
       $data = $this->getRequestData();
       
       $a = new Apresentadores;
       //Manipulando Imagem
       $infoFoto=$this->salvarFotoApresentador($data['foto'],$data['nome']);
       if($infoFoto['erro']){
         $array['error'] =$infoFoto['erro'];
       }else{
          //Inserindo Dados do Apresentador
          $idApresentador=$a->novoApresentador($infoFoto['infoImagem']['id'],$data['nome'],$data['descricao']);
          $array['success']=true;
          $array['idApresentador'] = $idApresentador;
        }
    }else{
      $array['error'] = 'Método de requisição incompatível!';
    }  
    $this->returnJson($array);  
  }

  public function infoApresentador($idapresentador){
    $validate = $this->validate();
    if($validate==false){
       $this->returnJson('Erro Token');
        return;
    }    
    $a = new Apresentadores;
    $infoApresentador = $a->infoApresentador($idapresentador);
    return $this->returnJson($infoApresentador);
  }

  public function editarApresentador($idApresentador){}

  public function salvarFotoApresentador($imageData,$apresentador){
    $arquivo=$imageData;
    $nome=$apresentador;
    $descricao ="Foto do apresentador ".$apresentador;
    $pasta=1;
    $data['erro']=0;
    
    if(isset($arquivo) && $arquivo['size'] > 0)
    {
      $extensoes_aceitas = array('png','jpeg','jpg');
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
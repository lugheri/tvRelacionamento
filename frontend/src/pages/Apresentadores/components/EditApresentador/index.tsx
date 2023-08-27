import { useState, useEffect, FormEvent, useRef, ChangeEvent } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

import api from '../../../../services/api';
import { Loading } from '../../../../components/Loading/index.';
import { InputForm, TextAreaForm } from '../../../../components/Inputs';
import { Button } from '../../../../components/Buttons';
import { IApresentador } from '../../Dto/apresentadoes.dto';
import { urlBase } from '../../../../utils/baseUrl';

interface EditApresentadorProps{
  apresentador:number;
  close:React.Dispatch<React.SetStateAction<number|null>>;
}

export const EditApresentador: React.FC<EditApresentadorProps> = (props) => {
  const [ loading, setLoading ] = useState(true)  
  const [ nome, setNome ] = useState("")  
  const [ descricao, setDescricao ] = useState("")  
  
  useEffect(()=>{   
    const getInfoApresentador = async () => {
      try{
        const info = await api.get(`infoApresentador/${props.apresentador}`)      
        setNome(info.data.nome)
        setDescricao(info.data.descricao)
        setLoading(false)
      }catch(err){
        console.log(err)
      }      
    }
    getInfoApresentador()
  },[]) 

  const editarApresentador = async (e:FormEvent) => {
    e.preventDefault()
    const body = {
        'nome':nome,
        'descricao':descricao
    };
    try{
      const response = await api.patch(`/editarApresentador/${props.apresentador}`,body)
      console.log(response)
    }catch(err){
      console.log(err)
    }
    props.close(null)
  }

  return(
    loading ? <Loading/> : 
    <form onSubmit={(e)=>editarApresentador(e)} className="flex flex-col">    
      <InputForm label='Nome' required value={nome} onChange={setNome} placeholder='Nome do Apresentador'/>
      <TextAreaForm label='Descrição' value={descricao} onChange={setDescricao} placeholder='Breve Descrição do Apresentador'/>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.close(null)} />
        <Button submit name="Salvar Alterações" icon="faSave" btn="success" /> 
      </div> 
    </form>
  )
}

interface EditFotoApresentador{
  apresentador:IApresentador;
  close:React.Dispatch<React.SetStateAction<IApresentador|null>>;
}

export const EditFotoApresentador: React.FC<EditFotoApresentador> = (props) => {
  const [ fotoUrl, setFotoUrl ] = useState<string | null >(null)
  const [ file, setFile ] = useState<File | null>(null)

  const inputFile = useRef<HTMLInputElement | null>(null)

  const changeFile = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }    
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0){
      const selectedFile = e.target.files[0]
      const imageUrl = URL.createObjectURL(selectedFile)
      setFile(selectedFile)
      setFotoUrl(imageUrl)
    }    
  }

  const salvarFotoApresentador = async (e:FormEvent) => {
    e.preventDefault()
    const formData = new FormData();
          formData.append('idApresentador',`${props.apresentador.id}`);
          if (file) {formData.append('foto', file); }         
          formData.append('nome',props.apresentador.nome);
    try{
      const response = await api.post(`/trocarFotoApresentador`,formData,{headers:{'Content-Type':'multipart/form-data'}})
      console.log(response)
    }catch(err){
      console.log(err)
    }
    props.close(null)
  }

   const removeImage = () => {
    if (fotoUrl) {
      URL.revokeObjectURL(fotoUrl);
    }
    setFotoUrl(null);
    setFile(null);
  }

  return(
    <form onSubmit={(e)=>salvarFotoApresentador(e)} className="flex flex-col">
      <input type="file" ref={inputFile} className="hidden" onChange={handleFile}/>
      { fotoUrl ?
        <div className="flex flex-col p-2 pb-10 flex justify-center items-center  h-[220px] overflow-hidden relative">
          <img src={fotoUrl} alt="Imagem Selecionada" className="rounded shadow" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          <Button className="absolute bottom-2" icon="faTrash" name="Alterar Imagem" btn="error" size="sm" type='notline' onClick={removeImage} />
        </div>:
        <div onClick={()=>changeFile()} 
          className="flex flex-col justify-center items-center bg-slate-100 rounded my-2 h-[180px] cursor-pointer hover:bg-slate-200">

          {props.apresentador.foto ?  
            <img src={`${urlBase}biblioteca/${props.apresentador.arquivo}`} className="h-[120px] w-[120px] object-cover"/>
           :<div><FontAwesomeIcon className="text-4xl text-slate-300" icon={Fas.faUserCircle}/></div>}
          <Button btn="info" type='notline' icon="faCamera" name="Mudar Foto"/>
        </div>
      }
      <p className="text-slate-600 font-bold text-center text-sm">{props.apresentador.nome}</p>
      <p className="text-slate-500 text-center text-xs">Apresentador</p>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.close(null)} />
        <Button submit name="Salvar Foto" icon="faSave" btn="success" /> 
      </div> 
    </form>
  )
}

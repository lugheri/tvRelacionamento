import { useState, useEffect, FormEvent, useRef, ChangeEvent } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

import api from '../../../../services/api';
import { Loading } from '../../../../components/Loading/index.';
import { InputForm, SelectForm, TextAreaForm } from '../../../../components/Inputs';
import { Button } from '../../../../components/Buttons';
import { IPrograma } from '../../Dto/programas.dto';
import { urlBase } from '../../../../utils/baseUrl';
import { IApresentador } from '../../../Apresentadores/Dto/apresentadoes.dto';

interface EditApresentadorProps{
  programa:number;
  close:React.Dispatch<React.SetStateAction<number|null>>;
}

export const EditPrograma: React.FC<EditApresentadorProps> = (props) => {
  const [ loading, setLoading ] = useState(true)  
  const [ titulo, setTitulo ] = useState("")  
  const [ apresentador, setApresentador ] = useState(0)  
  const [ descricao, setDescricao ] = useState("")  
  
  useEffect(()=>{   
    const getInfoPrograma = async () => {
      try{
        const info:IPrograma= await (await api.get(`infoPrograma/${props.programa}`)).data
        setTitulo(info.titulo)
        setApresentador(info.idApresentador)
        setDescricao(info.descricao)
        setLoading(false)
      }catch(err){
        console.log(err)
      }      
    }
    getInfoPrograma()
  },[]) 

  const [apresentadores, setApresentadores] = useState<IApresentador[]|null>(null)
  useEffect(()=>{
    const getApresentadores = async () => {
      try{
        const ap = await api.get(`listaTodosApresentadores`)
        setApresentadores(ap.data)
      }catch(err){
        console.log(err)
      }
    }
    getApresentadores()

  },[])

  const editarPrograma = async (e:FormEvent) => {
    e.preventDefault()
    const body = {
        'titulo':titulo,
        'idApresentador':apresentador,
        'descricao':descricao
    };
    try{
      const response = await api.patch(`/editarPrograma/${props.programa}`,body)
      console.log(response)
    }catch(err){
      console.log(err)
    }
    props.close(null)
  }

  return(
    loading ? <Loading/> : 
    <form onSubmit={(e)=>editarPrograma(e)} className="flex flex-col">    
      <InputForm label='Título' required value={titulo} onChange={setTitulo} placeholder='Título do Apresentador'/>
      { apresentadores == null ? <Loading/> : <SelectForm label='Apresentador' empty='Selecione um apresentador' options={apresentadores} valueKey='id' lableKey='nome' value={apresentador} onChange={setApresentador}/>}
      <TextAreaForm className="w-[400px]" label='Descrição' value={descricao} onChange={setDescricao} placeholder='Breve Descrição do Apresentador'/>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.close(null)} />
        <Button submit name="Salvar Alterações" icon="faSave" btn="success" /> 
      </div> 
    </form>
  )
}

interface EditFotoPrograma{
  programa:IPrograma;
  close:React.Dispatch<React.SetStateAction<IPrograma|null>>;
}

export const EditFotoPrograma: React.FC<EditFotoPrograma> = (props) => {
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

  const salvarFotoPrograma = async (e:FormEvent) => {
    e.preventDefault()
    const formData = new FormData();
          formData.append('idPrograma',`${props.programa.id}`);
          if (file) {formData.append('foto', file); }         
          formData.append('titulo',props.programa.titulo);
    try{
      const response = await api.post(`/trocarFotoPrograma`,formData,{headers:{'Content-Type':'multipart/form-data'}})
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
    <form onSubmit={(e)=>salvarFotoPrograma(e)} className="flex flex-col">
      <input type="file" ref={inputFile} className="hidden" onChange={handleFile}/>
      { fotoUrl ?
        <div className="flex flex-col p-2 pb-10 flex justify-center items-center  h-[220px] overflow-hidden relative">
          <img src={fotoUrl} alt="Imagem Selecionada" className="rounded shadow" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          <Button className="absolute bottom-2" icon="faTrash" name="Alterar Imagem" btn="error" size="sm" type='notline' onClick={removeImage} />
        </div>:
        <div onClick={()=>changeFile()} 
          className="flex flex-col justify-center items-center bg-slate-100 rounded my-2 h-[180px] cursor-pointer hover:bg-slate-200">

          {props.programa.capa ?  
            <img src={`${urlBase}biblioteca/${props.programa.arquivo}`} className="h-[120px] w-[120px] object-cover"/>
           :<div><FontAwesomeIcon className="text-4xl text-slate-300" icon={Fas.faUserCircle}/></div>}
          <Button btn="info" type='notline' icon="faCamera" name="Mudar Capa"/>
        </div>
      }
      <p className="text-slate-600 font-bold text-center text-sm">{props.programa.titulo}</p>
      <p className="text-slate-500 text-center text-xs">Programa</p>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.close(null)} />
        <Button submit name="Salvar Capa" icon="faSave" btn="success" /> 
      </div> 
    </form>
  )
}

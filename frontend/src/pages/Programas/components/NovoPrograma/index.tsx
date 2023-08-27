import { useState,useEffect, useRef, FormEvent, ChangeEvent,  } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

import api from '../../../../services/api';
import { Button } from '../../../../components/Buttons';
import { InputForm, SelectForm, TextAreaForm } from '../../../../components/Inputs';
import { IApresentador } from '../../../Apresentadores/Dto/apresentadoes.dto';
import { Loading } from '../../../../components/Loading/index.';

export const NovoPrograma: React.FC<{close:React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {
  const [ fotoUrl, setFotoUrl ] = useState<string | null >(null)
  const [ file, setFile ] = useState<File | null>(null)
  const [ titulo, setTitulo ] = useState("")
  const [ apresentador, setApresentador ] = useState(0)
  const [ descricao, setDescricao ] = useState("")

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

  const criarPrograma = async (e:FormEvent) => {
    e.preventDefault()
    const formData = new FormData();
          if (file) {formData.append('foto', file); }
          formData.append('idApresentador',`${apresentador}`);
          formData.append('titulo',titulo);
          formData.append('descricao',descricao);
    try{
      const response = await api.post(`/novoPrograma`,formData,{headers:{'Content-Type':'multipart/form-data'}})
      console.log(response)
    }catch(err){
      console.log(err)
    }
    props.close(false)
  }

   const removeImage = () => {
    if (fotoUrl) {
      URL.revokeObjectURL(fotoUrl);
    }
    setFotoUrl(null);
    setFile(null);
  }

  return(
    <form onSubmit={(e)=>criarPrograma(e)} className="flex flex-col">
      <input type="file" ref={inputFile} className="hidden" onChange={handleFile}/>
      { fotoUrl ?
        <div className="flex flex-col p-2 pb-10 flex justify-center items-center  h-[220px] overflow-hidden relative">
          <img src={fotoUrl} alt="Imagem Selecionada" className="rounded shadow" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          <Button className="absolute bottom-2" icon="faTrash" name="Remover Imagem" btn="error" size="sm" type='notline' onClick={removeImage} />
        </div>:
        <div onClick={()=>changeFile()} 
          className="flex flex-col justify-center items-center bg-slate-100 rounded my-2 h-32 cursor-pointer hover:bg-slate-200">
          <FontAwesomeIcon className="text-4xl text-slate-300" icon={Fas.faUserCircle}/>
          <Button btn="muted" type='notline' icon="faCamera" name="Selecionar Capa"/>
        </div>
      }
      <InputForm label='Título' required value={titulo} onChange={setTitulo} placeholder='Título do Programa'/>
      { apresentadores == null ? <Loading/> : <SelectForm label='Apresentador' empty='Selecione um apresentador' options={apresentadores} valueKey='id' lableKey='nome' value={apresentador} onChange={setApresentador}/>}
      <TextAreaForm label='Descrição' value={descricao} onChange={setDescricao} placeholder='Breve Descrição do Programa'/>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.close(false)} />
        <Button submit name="Salvar Alterações" icon="faSave" btn="success" /> 
      </div> 
    </form>
  )
}
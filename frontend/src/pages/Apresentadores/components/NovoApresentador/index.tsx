import { useState, useRef, FormEvent, ChangeEvent,  } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

import api from '../../../../services/api';
import { Button } from '../../../../components/Buttons';
import { InputForm, TextAreaForm } from '../../../../components/Inputs';

export const NovoApresentador: React.FC<{close:React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {
  const [ fotoUrl, setFotoUrl ] = useState<string | null >(null)
  const [ file, setFile ] = useState<File | null>(null)
  const [ nome, setNome ] = useState("")
  const [ descricao, setDescricao ] = useState("")

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

  const criarApresentador = async (e:FormEvent) => {
    e.preventDefault()
    const formData = new FormData();
          if (file) {formData.append('foto', file); }
          formData.append('nome',nome);
          formData.append('descricao',descricao);
    try{
      const response = await api.post(`/novoApresentador`,formData,{headers:{'Content-Type':'multipart/form-data'}})
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
    <form onSubmit={(e)=>criarApresentador(e)} className="flex flex-col">
      <input type="file" ref={inputFile} className="hidden" onChange={handleFile}/>
      { fotoUrl ?
        <div className="flex flex-col p-2 pb-10 flex justify-center items-center  h-[220px] overflow-hidden relative">
          <img src={fotoUrl} alt="Imagem Selecionada" className="rounded shadow" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          <Button className="absolute bottom-2" icon="faTrash" name="Remover Imagem" btn="error" size="sm" type='notline' onClick={removeImage} />
        </div>:
        <div onClick={()=>changeFile()} 
          className="flex flex-col justify-center items-center bg-slate-100 rounded my-2 h-32 cursor-pointer hover:bg-slate-200">
          <FontAwesomeIcon className="text-4xl text-slate-300" icon={Fas.faUserCircle}/>
          <Button btn="muted" type='notline' icon="faCamera" name="Selecionar Foto"/>
        </div>
      }
      <InputForm label='Nome' required value={nome} onChange={setNome} placeholder='Nome do Apresentador'/>
      <TextAreaForm label='Descrição' value={descricao} onChange={setDescricao} placeholder='Breve Descrição do Apresentador'/>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.close(false)} />
        <Button submit name="Salvar Alterações" icon="faSave" btn="success" /> 
      </div> 
    </form>
  )
}
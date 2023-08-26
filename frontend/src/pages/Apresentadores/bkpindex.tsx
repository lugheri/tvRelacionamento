import {useState, useEffect, FormEvent, ChangeEvent, useRef} from 'react'
import { IApresentador } from './Dto/apresentadoes.dto'
import api from '../../services/api'
import { TitlePage } from '../../components/TitlePage'
import { Button } from '../../components/Buttons'
import { Loading } from '../../components/Loading/index.'
import { Empty } from '../../components/EmptyPage'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

import { CardItem } from '../../components/Cards'
import { Modal, TitleModal } from '../../components/Modal'
import { InputForm, TextAreaForm } from '../../components/Inputs'
import { urlBase } from '../../utils/baseUrl'
export const Apresentadores = () =>{
  const [totalApresentadores,setTotalApresentadores] = useState<number|null>(null)
  useEffect(()=>{
    const getTotalApresentadores = async () => {
      try{
        const ap = await api.get(`totalApresentadores/1`)
        setTotalApresentadores(ap.data)
      }catch(err){
        console.log(err)
      }      
    }
    getTotalApresentadores()
  },[])

  const [ novoApresentador, setNovoApresentador ] = useState(false)
  const [ editApresentador, setEditApresentador ] = useState<number|null>(null)

  return(
    <div className="flex p-2 overflow-hidden h-full flex-col">
      <TitlePage
        icon="faUserTie" 
        title="Apresentadores" 
        description="Cadastre os apresentadores dos programas da Tv Relacionamento"
        rightComponent={<Button icon="faUserPlus" btn="info" name="Cadastrar Novo Apresentador" onClick={()=>setNovoApresentador(true)}/>}/>

      {/*BODY*/}
      <div className="flex h-[92%] ">
        { 
          totalApresentadores === null ? <Loading/>
          : totalApresentadores > 0 ? 
            <div className="flex flex-1 flex-col w-full ">
              <p className="text-orange-800 font-bold text-lg py-2 px-4 border-b border-orange-800 ">
                {totalApresentadores } Apresentador(es) Localizados!
              </p>
              <div className="flex flex-wrap h-[90%] mb-2 overflow-auto">
                <ListItems page={1} setEditApresentador={setEditApresentador}/>
              </div>
            </div>
          : <Empty icon="faUserSlash" 
              title="Nenhum Apresentador Encontrado"
              description="Parece que voce ainda não possui nenhum apresentador cadastrado, clique no botão abaixo e crie o primeiro!"
              rightComponent={<Button icon="faUserPlus" btn="info" type='outline' name="Cadastrar Novo Apresentador" onClick={()=>setNovoApresentador(true)}/>}/>
          }
      </div> 
      { !novoApresentador ? false :
        <Modal 
          component={
            <div><TitleModal icon="faUserPlus" close={()=>setNovoApresentador(false)} title="Novo Apresentador" subtitle='Cadastre um novo apresentador na Tv Relacionamento!'/>
                 <NovoApresentador close={setNovoApresentador}/>
            </div>}/>
          }
      { !editApresentador ? false :
        <Modal 
          component={
            <div><TitleModal icon="faUserEdit" close={()=>setEditApresentador(null)} title="Editar Apresentador" subtitle='Edite as informações deste Apresentador!'/>
                <EditApresentador close={setEditApresentador} apresentador={editApresentador}/>
            </div>}/>}
    </div>
  )
}

const ListItems : React.FC<{page:number,setEditApresentador:React.Dispatch<React.SetStateAction<number|null>>}> = (props) => { 
  const [apresentadores,setApresentadores] = useState<IApresentador[]|null>(null)
  useEffect(()=>{
    const getApresentadores = async () => {
      try{
        const ap = await api.get(`getApresentadores/1/${props.page}`)
        setApresentadores(ap.data)
      }catch(err){
        console.log(err)
      }      
    }
    getApresentadores()
  },[])
  const [nextPage, setNextPage ] = useState(0)

 
  return(
    <>
      {apresentadores === null ? <Loading/> : apresentadores.length ==0 ? false 
      : <>
        {apresentadores.map((apresentador,key)=>(
          <CardItem key={key} component={
            <div className="flex flex-1 flex-col justify-center items-center">
              <div className="group flex flex-col justify-center items-center w-full p-2 relative cursor-pointer">
                <img src={`${urlBase}biblioteca/${apresentador.arquivo}`} className="group-hover:opacity-50 h-[200px] w-[200px] rounded-full object-cover"/>
                <Button className="absolute opacity-0 group-hover:opacity-100" btn="warning" icon="faCamera" name="Trocar Foto" size='sm' onClick={()=>props.setEditApresentador(apresentador.id)} />
              </div>
              <div className="flex flex-col justify-start p-1 items-center w-full h-[140px] text-center">
                <p className="font-bold text-slate-500 text-lg">{apresentador.nome}</p>
                <p className="text-slate-500 text-sm" title={apresentador.descricao}>
                  { apresentador.descricao.length > 100 ? apresentador.descricao.slice(0, 100) + ' . . . ' : apresentador.descricao }
                </p>
              </div>
              <div className="flex justify-center items-center w-full p-1 shadow-inner">
                <Button btn="info" icon="faUserEdit" name="Editar Apresentador" size='sm' type='notline' onClick={()=>props.setEditApresentador(apresentador.id)} />
              </div>           
            </div>}/>
          ))
        }
        {
          nextPage == 0 ? 
            apresentadores.length < 15 ? false 
            : <div className="w-full flex  justify-center">
                <Button btn="info" icon="faSync" name="Carregar mais apresentadores" size='sm' type='notline' onClick={()=>setNextPage(props.page+1)}/>
              </div>
          : <ListItems page={nextPage} setEditApresentador={props.setEditApresentador}/>
        }
        </>
      }     
    </>
  )
}

const NovoApresentador: React.FC<{close:React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {
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

const EditApresentador: React.FC<{apresentador:number,close:React.Dispatch<React.SetStateAction<number|null>>}> = (props) => {
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
    const formData = new FormData();        
          formData.append('nome',nome);
          formData.append('descricao',descricao);
    try{
      const response = await api.patch(`/editarApresentador/${props.apresentador}`,formData,{headers:{'Content-Type':'multipart/form-data'}})
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

import {useState, useEffect} from 'react'
import api from '../../services/api'
import { TitlePage } from '../../components/TitlePage'
import { Button } from '../../components/Buttons'
import { Loading } from '../../components/Loading/index.'
import { Empty } from '../../components/EmptyPage'

import { Modal, TitleModal } from '../../components/Modal'
import { EditFotoPrograma, EditPrograma,  } from './components/EditPrograma'

import { ListProgramas } from './components/ListProgramas'
import { RemoverPrograma } from './components/RemoverPrograma'
import { IPrograma } from './Dto/programas.dto'
import { NovoPrograma } from './components/NovoPrograma'

export const Programas = () =>{
  const [totalProgramas,setTotalProgramas] = useState<number|null>(null)
  useEffect(()=>{
    const getTotalProgramas = async () => {
      try{
        const ap = await api.get(`totalProgramas/1`)
        setTotalProgramas(ap.data)
      }catch(err){
        console.log(err)
      }      
    }
    getTotalProgramas()
  },[])

  //Gatilho dos Modais
  const [ novoPrograma, setNovoPrograma ] = useState(false)
  const [ editPrograma, setEditPrograma ] = useState<number|null>(null)
  const [ trocarFotoPrograma, setTrocarFotoPrograma ] = useState<IPrograma|null>(null)
  const [ removerPrograma, setRemoverPrograma ] = useState<number|null>(null)

  return(
    <div className="flex p-2 overflow-hidden h-full flex-col">
      <TitlePage
        icon="faClapperboard" 
        title="Programas" 
        description="Crie novos programas e adicione novos videos!"
        rightComponent={<Button icon="faVideo" btn="info" name="Cadastrar Novo Programa" onClick={()=>setNovoPrograma(true)}/>}/>

      {/*BODY*/}
      <div className="flex h-[92%]">
        { 
          totalProgramas === null ? <Loading/>
          : totalProgramas > 0 ? 
            <div className="flex flex-1 flex-col w-full ">
              <p className="text-orange-800 font-bold text-lg py-2 px-4 border-b border-orange-800 ">
                {totalProgramas } Programa(s) Localizados!
              </p>
              <div className="flex flex-wrap h-[90%] mb-2 overflow-auto">
                <ListProgramas 
                  page={1}
                  novoPrograma={novoPrograma}
                  editPrograma={editPrograma} setEditPrograma={setEditPrograma}
                  trocarFotoPrograma={trocarFotoPrograma} setTrocarFotoPrograma={setTrocarFotoPrograma}
                  removerPrograma={removerPrograma} setRemoverPrograma={setRemoverPrograma}/>
              </div>
            </div>
          : <Empty icon="faUserSlash" 
              title="Nenhum Programa Encontrado"
              description="Parece que voce ainda não possui nenhum programa cadastrado, clique no botão abaixo e crie o primeiro!"
              rightComponent={<Button icon="faVideo" btn="info" type='outline' name="Cadastrar Novo Programa" onClick={()=>setNovoPrograma(true)}/>}/>
          }
      </div> 
      { !novoPrograma ? false :
        <Modal 
          component={
            <div><TitleModal icon="faVideo" close={()=>setNovoPrograma(false)} title="Novo Programa" subtitle='Cadastre um novo Programa na Tv Relacionamento!'/>
                 <NovoPrograma close={setNovoPrograma}/>
            </div>}/>
          }
      { !trocarFotoPrograma ? false :
        <Modal 
          component={
            <div><TitleModal icon="faCamera" close={()=>setTrocarFotoPrograma(null)} title="Nova Foto" subtitle='Confirme a nova foto do programa!'/>
                <EditFotoPrograma 
                  close={setTrocarFotoPrograma} 
                  programa={trocarFotoPrograma}                 
                  />
            </div>}/>}
     
      { !editPrograma ? false :
        <Modal 
          component={
            <div><TitleModal icon="faUserEdit" close={()=>setEditPrograma(null)} title="Editar Programa" subtitle='Edite as informações deste Programa!'/>
                <EditPrograma 
                  close={setEditPrograma} 
                  programa={editPrograma}                 
                  />
            </div>}/>}

      { !removerPrograma ? false :
        <Modal 
          component={
            <div><TitleModal icon="faTrash" close={()=>setRemoverPrograma(null)} title="Remover Programa" subtitle='Remova o programa selecionado!'/>
                <RemoverPrograma
                  close={setRemoverPrograma} 
                  programa={removerPrograma}                 
                  />
            </div>}/>}
    </div>
  )
}





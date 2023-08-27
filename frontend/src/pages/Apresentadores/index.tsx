import {useState, useEffect} from 'react'
import api from '../../services/api'
import { TitlePage } from '../../components/TitlePage'
import { Button } from '../../components/Buttons'
import { Loading } from '../../components/Loading/index.'
import { Empty } from '../../components/EmptyPage'

import { Modal, TitleModal } from '../../components/Modal'
import { EditApresentador, EditFotoApresentador } from './components/EditApresentador'
import { NovoApresentador } from './components/NovoApresentador'
import { ListItems } from './components/ListApresentadores'
import { RemoverApresentador } from './components/RemoverApresentador'
import { IApresentador } from './Dto/apresentadoes.dto'

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

  //Gatilho dos Modais
  const [ novoApresentador, setNovoApresentador ] = useState(false)
  const [ editApresentador, setEditApresentador ] = useState<number|null>(null)
  const [ trocarFotoApresentador, setTrocarFotoApresentador ] = useState<IApresentador|null>(null)
  const [ removerApresentador, setRemoverApresentador ] = useState<number|null>(null)

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
                <ListItems 
                  page={1}
                  novoApresentador={novoApresentador}
                  editApresentador={editApresentador} setEditApresentador={setEditApresentador}
                  trocarFotoApresentador={trocarFotoApresentador} setTrocarFotoApresentador={setTrocarFotoApresentador}
                  removerApresentador={removerApresentador} setRemoverApresentador={setRemoverApresentador}/>
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
      { !trocarFotoApresentador ? false :
        <Modal 
          component={
            <div><TitleModal icon="faCamera" close={()=>setTrocarFotoApresentador(null)} title="Nova Foto" subtitle='Confirme a nova foto do apresentador!'/>
                <EditFotoApresentador 
                  close={setTrocarFotoApresentador} 
                  apresentador={trocarFotoApresentador}                 
                  />
            </div>}/>}
     
      { !editApresentador ? false :
        <Modal 
          component={
            <div><TitleModal icon="faUserEdit" close={()=>setEditApresentador(null)} title="Editar Apresentador" subtitle='Edite as informações deste Apresentador!'/>
                <EditApresentador 
                  close={setEditApresentador} 
                  apresentador={editApresentador}                 
                  />
            </div>}/>}

      { !removerApresentador ? false :
        <Modal 
          component={
            <div><TitleModal icon="faTrash" close={()=>setRemoverApresentador(null)} title="Remover Apresentador" subtitle='Remova o apresentador selecionado!'/>
                <RemoverApresentador 
                  close={setRemoverApresentador} 
                  apresentador={removerApresentador}                 
                  />
            </div>}/>}
    </div>
  )
}





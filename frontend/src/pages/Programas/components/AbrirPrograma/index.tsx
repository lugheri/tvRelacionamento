import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { TitlePage } from "../../../../components/TitlePage";
import { Button } from "../../../../components/Buttons";
import api from '../../../../services/api';
import { IPrograma } from '../../Dto/programas.dto';
import { Card } from '../../../../components/Cards';
import { urlBase } from '../../../../utils/baseUrl';
import { Modal } from '../../../../components/Modal';
import { Loading } from '../../../../components/Loading/index.';
import { Empty } from '../../../../components/EmptyPage';
import { ListVideos } from '../ListVideos';

export const AbrirPrograma = () => {
  const location = useLocation();
  const params = location.pathname.split('/')
  const idPrograma = params[3]

  const [ infoPrograma, setInfoPrograma ] = useState<IPrograma | null>(null)

  //Gatilho dos Modais
  const [ editVideo, setEditVideo ] = useState<number|null>(null)
  const [ removerVideo, setRemoverVideo ] = useState<number|null>(null)

  
  const navigate = useNavigate();
  const voltarTela = () => { 
    navigate(`/programas`)
  }
  useEffect(()=>{
    const getInfoPrograma = async () => {
      try{
        const info = await api.get(`infoPrograma/${idPrograma}`)
        setInfoPrograma(info.data)
      }catch(err){
        console.log(err)
      }
    }
    getInfoPrograma()
  },[])

  const [totalVideos,setTotalVideos] = useState<number|null>(null)
  useEffect(()=>{
    const getTotalVideos = async () => {
      try{
        const ap = await api.get(`totalVideosPrograma/${idPrograma}/1`)
        setTotalVideos(ap.data)
      }catch(err){
        console.log(err)
      }      
    }
    getTotalVideos()
  },[])


  const [ novoVideo, setNovoVideo ] = useState<boolean>(false)
  return(
    <div className="flex p-2 overflow-hidden h-full flex-col">
      <TitlePage
        icon="faClapperboard" 
        title={`Editar Programa`} 
        description={`Adicione, edite ou remova os videos do programa ${infoPrograma?.titulo} `}
        rightComponent={<Button icon="faReply" btn="info" name="Voltar para Programas" type='notline' onClick={()=>voltarTela()}/>}/>

      <div className="flex flex-col h-[92%] overflow-auto"> 
        <Card component={
          <div className="flex flex-1 justify-center items-center">
            <div className="w-1/3 p-1">
              <img src={`${urlBase}biblioteca/${infoPrograma?.arquivo}`} className="group-hover:opacity-50 h-[200px] w-auto rounded object-contain"/>
            </div>
            <div className="flex flex-col flex-1 p-1 h-[200px]">
              <div className="flex flex-col flex-1 h-[150px] overflow-auto">
                <p className="text-slate-500 text-xs mb-1"><b>Cod.: </b> {infoPrograma?.id}</p>
                <p className="text-slate-500 text-xs mb-1"><b>Programa: </b> {infoPrograma?.titulo}</p>
                <p className="text-slate-500 text-xs mb-1"><b>Descrição: </b>{infoPrograma?.descricao}</p>
                <p className="text-slate-500 text-xs"><b>Apresentador: </b>{infoPrograma?.apresentador}</p>
              </div>
              <div className='flex justify-end bg-gradient-to-r from-slate-200 p-1 to-white red-100 mt-2'>
                <Button icon="faVideo" btn="info" name="Adicionar Vídeo" onClick={()=>setNovoVideo(true)}/>
              </div>
            </div> 
          </div>
        }/>

        { 
          totalVideos === null ? <Loading/> : totalVideos > 0 ? 
          <div className="flex flex-1 flex-col w-full ">
            <p className="text-orange-800 font-bold text-lg py-2 px-4 border-b border-orange-800 ">
              {totalVideos } Video(s) Localizados!
            </p>
            <div className="flex flex-wrap  mb-2 overflow-auto">
              <ListVideos 
                page={1}
                idPrograma={idPrograma}
                editVideo={editVideo} setEditVideo={setEditVideo}
                removerVideo={removerVideo} setRemoverVideo={setRemoverVideo}/>
            </div>
          </div>
          : <Empty icon="faSlash" 
              title="Nenhum Video Encontrado"
              description="Parece que você ainda não possui nenhum video neste programa cadastrado, clique no botão abaixo e crie o primeiro!"
              rightComponent={<Button icon="faVideo" btn="info" type='outline' name="Cadastrar Novo Video" onClick={()=>setNovoVideo(true)}/>}/>
          }

      </div>
      { novoVideo ? <Modal component={<></>}/> : false}
    </div>
  )
}
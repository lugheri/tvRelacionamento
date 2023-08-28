import { useState, useEffect } from 'react';
import { IVideo } from "../../Dto/programas.dto";
import api from '../../../../services/api';
import { Loading } from '../../../../components/Loading/index.';
import { CardItem } from '../../../../components/Cards';
import { Button } from '../../../../components/Buttons';

interface ListVideoProps{
  page:number;
  idPrograma:string;
  editVideo:number|null;
  setEditVideo:React.Dispatch<React.SetStateAction<number|null>>;
  removerVideo:number|null;
  setRemoverVideo:React.Dispatch<React.SetStateAction<number|null>>;
}

export const ListVideos : React.FC<ListVideoProps> = (props) => { 
  const [ videos, setVideos ] = useState<IVideo[]|null>(null)
  
  useEffect(()=>{
    const getVideos = async () => {
      try{
        const ap = await api.get(`getVideosPrograma/${props.idPrograma}/1/${props.page}`)
        setVideos(ap.data)
      }catch(err){
        console.log(err)
      }      
    }
    getVideos()
  },[props.editVideo,props.removerVideo])

  const [nextPage, setNextPage ] = useState(0)

  return(
    <>
      {videos === null ? <Loading/> : videos.length ==0 ? false 
      : <>
        {videos.map((video,key)=>(
          video &&
          <CardItem className="mx-[.5%] w-full" key={key} component={
            <div className="flex flex-1 justify-center items-center">
              <div className="group flex flex-col justify-center items-center w-1/4 p-2 relative cursor-pointer">
                {video.idCapa}
              </div>
              <div className="flex flex-col justify-start p-1 w-full">
                <p className="text-slate-400 text-xs">Cód. {video.id}</p>
                <p className="font-bold text-slate-500">{video.titulo}</p>
                <p className="text-slate-500 text-sm" title={video.descricao}>
                  { video.descricao.length > 100 ? video.descricao.slice(0, 100) + ' . . . ' : video.descricao }
                </p>                
              </div>
              <div className="flex justify-end items-center w-full p-1">
                <Button btn="error" icon="faTrash" title="Remover Programa" size='sm' type='notline' onClick={()=>props.setRemoverVideo(video.id)} />
                <Button btn="info" icon="faEdit" name="Editar Informações" size='sm' type='notline' onClick={()=>props.setEditVideo(video.id)} />
              </div>           
            </div>}/>
          ))
        }
        {
          nextPage == 0 ? 
            videos.length < 9 ? false 
            : <div className="w-full flex  justify-center">
                <Button btn="info" icon="faSync" name="Carregar mais programas" size='sm' type='notline' onClick={()=>setNextPage(props.page+1)}/>
              </div>
          : <ListVideos 
              page={nextPage}
              idPrograma={props.idPrograma}
              editVideo={props.editVideo} setEditVideo={props.setEditVideo}
              removerVideo={props.removerVideo} setRemoverVideo={props.setRemoverVideo}/>
        }
        </>
      }     
    </>
  )
}
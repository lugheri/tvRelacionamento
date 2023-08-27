import { useState, useEffect } from 'react';
import { IApresentador } from '../../Dto/apresentadoes.dto';
import api from '../../../../services/api';
import { Loading } from '../../../../components/Loading/index.';
import { CardItem } from '../../../../components/Cards';
import { urlBase } from '../../../../utils/baseUrl';
import { Button } from '../../../../components/Buttons';

interface ListItemsProps{
  page:number;
  novoApresentador:boolean;
  editApresentador:number|null;
  setEditApresentador:React.Dispatch<React.SetStateAction<number|null>>;
  trocarFotoApresentador:IApresentador|null;  setTrocarFotoApresentador:React.Dispatch<React.SetStateAction<IApresentador|null>>;
  removerApresentador:number|null;
  setRemoverApresentador:React.Dispatch<React.SetStateAction<number|null>>;
}

export const ListItems : React.FC<ListItemsProps> = (props) => { 
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
  },[props.novoApresentador,props.editApresentador,props.removerApresentador,props.trocarFotoApresentador])
  const [nextPage, setNextPage ] = useState(0)
 
  return(
    <>
      {apresentadores === null ? <Loading/> : apresentadores.length ==0 ? false 
      : <>
        {apresentadores.map((apresentador,key)=>(
          apresentador &&
          <CardItem className="mx-[.5%] w-[19%]" key={key} component={
            <div className="flex flex-1 flex-col justify-center items-center">
              <div className="group flex flex-col justify-center items-center w-full p-2 relative cursor-pointer">
                <img src={`${urlBase}biblioteca/${apresentador.arquivo}`} className="group-hover:opacity-50 h-[200px] w-[200px] rounded-full object-cover"/>
                <Button className="absolute opacity-0 group-hover:opacity-100" btn="warning" icon="faCamera" name="Trocar Foto" size='sm' onClick={()=>props.setTrocarFotoApresentador(apresentador)} />
              </div>
              <div className="flex flex-col justify-start p-1 items-center w-full h-[140px] text-center">
               <p className="text-slate-400 text-xs">Cód. {apresentador.id}</p>
                <p className="font-bold text-slate-500 text-lg">{apresentador.nome}</p>
                <p className="text-slate-500 text-sm" title={apresentador.descricao}>
                  { apresentador.descricao.length > 100 ? apresentador.descricao.slice(0, 100) + ' . . . ' : apresentador.descricao }
                </p>
              </div>
              <div className="flex justify-center items-center w-full p-1 shadow-inner">
                <Button btn="error" icon="faTrash" title="Remover Apresentador" size='sm' type='notline' onClick={()=>props.setRemoverApresentador(apresentador.id)} />
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
          : <ListItems 
              page={nextPage}
              novoApresentador={props.novoApresentador}
              editApresentador={props.editApresentador} setEditApresentador={props.setEditApresentador}
              trocarFotoApresentador={props.trocarFotoApresentador} setTrocarFotoApresentador={props.setTrocarFotoApresentador}
              removerApresentador={props.removerApresentador} setRemoverApresentador={props.setRemoverApresentador}/>
        }
        </>
      }     
    </>
  )
}

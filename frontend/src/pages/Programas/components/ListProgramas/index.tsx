import { useState, useEffect } from 'react';
import { IPrograma } from '../../Dto/programas.dto';
import api from '../../../../services/api';
import { Loading } from '../../../../components/Loading/index.';
import { CardItem } from '../../../../components/Cards';
import { urlBase } from '../../../../utils/baseUrl';
import { Button } from '../../../../components/Buttons';

interface ListProgramaProps{
  page:number;
  novoPrograma:boolean;
  editPrograma:number|null;
  setEditPrograma:React.Dispatch<React.SetStateAction<number|null>>;
  trocarFotoPrograma:IPrograma|null;  setTrocarFotoPrograma:React.Dispatch<React.SetStateAction<IPrograma|null>>;
  removerPrograma:number|null;
  setRemoverPrograma:React.Dispatch<React.SetStateAction<number|null>>;
}

export const ListProgramas : React.FC<ListProgramaProps> = (props) => { 
  const [programas,setProgramas] = useState<IPrograma[]|null>(null)
  useEffect(()=>{
    const getProgramas = async () => {
      try{
        const ap = await api.get(`getProgramas/1/${props.page}`)
        setProgramas(ap.data)
      }catch(err){
        console.log(err)
      }      
    }
    getProgramas()
  },[props.novoPrograma,props.editPrograma,props.removerPrograma,props.trocarFotoPrograma])
  const [nextPage, setNextPage ] = useState(0)

  
 
  return(
    <>
      {programas === null ? <Loading/> : programas.length ==0 ? false 
      : <>
        {programas.map((programa,key)=>(
          programa &&
          <CardItem className="mx-[.5%] w-[32%] " key={key} component={
            <div className="flex flex-1 flex-col justify-center items-center">
              <div className="group flex flex-col justify-center items-center w-full p-2 relative cursor-pointer">
                <img src={`${urlBase}biblioteca/${programa.arquivo}`} className="group-hover:opacity-50 h-[250px] w-auto rounded object-contain"/>
                <Button className="absolute opacity-0 group-hover:opacity-100" btn="warning" icon="faCamera" name="Trocar Foto" size='sm' onClick={()=>props.setTrocarFotoPrograma(programa)} />
              </div>
              <div className="flex flex-col justify-start p-1 items-center w-full h-[150px] text-center">
               <p className="text-slate-400 text-xs">Cód. {programa.id}</p>
                <p className="font-bold text-slate-500 text-lg">{programa.titulo}</p>
                <p className="text-slate-500 text-sm" title={programa.descricao}>
                  { programa.descricao.length > 100 ? programa.descricao.slice(0, 100) + ' . . . ' : programa.descricao }
                </p>
                <p className="text-slate-500 my-2 text-sm"><strong>Apresentador: </strong>{programa.apresentador} </p>
              </div>
              <div className="flex justify-center items-center w-full p-1 shadow-inner">
                <Button btn="error" icon="faTrash" title="Remover Programa" size='sm' type='notline' onClick={()=>props.setRemoverPrograma(programa.id)} />
                <Button btn="info" icon="faEdit" name="Editar Informações" size='sm' type='notline' onClick={()=>props.setEditPrograma(programa.id)} />
                <Button btn="warning" icon="faVideo" name="Configurar Programa" size='sm' type='outline' onClick={()=>props.setEditPrograma(programa.id)} />
              </div>           
            </div>}/>
          ))
        }
        {
          nextPage == 0 ? 
            programas.length < 9 ? false 
            : <div className="w-full flex  justify-center">
                <Button btn="info" icon="faSync" name="Carregar mais programas" size='sm' type='notline' onClick={()=>setNextPage(props.page+1)}/>
              </div>
          : <ListProgramas 
              page={nextPage}
              novoPrograma={props.novoPrograma}
              editPrograma={props.editPrograma} setEditPrograma={props.setEditPrograma}
              trocarFotoPrograma={props.trocarFotoPrograma} setTrocarFotoPrograma={props.setTrocarFotoPrograma}
              removerPrograma={props.removerPrograma} setRemoverPrograma={props.setRemoverPrograma}/>
        }
        </>
      }     
    </>
  )
}

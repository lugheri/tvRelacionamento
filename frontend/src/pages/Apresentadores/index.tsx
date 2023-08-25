import {useState, useEffect} from 'react'
import { Apresentador } from './Dto/apresentadoes.dto'
import api from '../../services/api'
export const Apresentadores = () =>{
  const [apresentadores,setApresentadores] = useState<Apresentador[]|null>(null)
  useEffect(()=>{
    const getApresentadores = async () => {
      try{
        const ap = await api.get(`getApresentadores/1`)
        setApresentadores(ap.data)
      }catch(err){
        console.log(err)
      }      
    }
    getApresentadores()
  },[])

  return(
    <div className="flex flex-col">
      <p>Apresentadores</p>
      { apresentadores === null ? <p>Carregendo</p> : apresentadores.length == 0 ? <p>Nenhum Apresentador</p> 
      : apresentadores.map((apresentador,key)=>
      <p key={key}>{apresentador.nome}</p>)}
    </div>
  )
}
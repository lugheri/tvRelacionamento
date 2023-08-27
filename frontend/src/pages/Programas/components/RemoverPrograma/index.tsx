import { Button } from "../../../../components/Buttons";
import api from "../../../../services/api";

interface RemoverProgramaProps{
  programa:number;
  close:React.Dispatch<React.SetStateAction<number|null>>;
}

export const RemoverPrograma : React.FC<RemoverProgramaProps> = (props) => {
  const removerPrograma = async () => {
    try{
      const body = {"status":0}
      const response = await api.patch(`removerPrograma/${props.programa}`,body)
      console.log(response.data)
      props.close(null)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <p className="p-4 text-red-600">{`Deseja remover o programa da Tv Relacionamento ?`}</p>
      </div>
      <div className="flex border-t mt-4 px-2 pt-2 justify-end items-center">
        <Button btn="muted" name="Não" type="outline" onClick={()=>props.close(null)}/>
        <Button btn="error" icon="faTrash" name="Sim, remover!"  onClick={()=>removerPrograma()}/>
      </div>
      
    </div>
  )
}
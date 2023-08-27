import { Button } from "../../../../components/Buttons";
import api from "../../../../services/api";

interface RemoverApresentadorProps{
  apresentador:number;
  close:React.Dispatch<React.SetStateAction<number|null>>;
}

export const RemoverApresentador : React.FC<RemoverApresentadorProps> = (props) => {
  const removerApresentador = async () => {
    try{
      const body = {"status":0}
      const response = await api.patch(`removerApresentador/${props.apresentador}`,body)
      console.log(response.data)
      props.close(null)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <p className="p-4 text-red-600">{`Deseja remover o apresentador da Tv Relacionamento ?`}</p>
      </div>
      <div className="flex border-t mt-4 px-2 pt-2 justify-end items-center">
        <Button btn="muted" name="Não" type="outline" onClick={()=>props.close(null)}/>
        <Button btn="error" icon="faTrash" name="Sim, remover!"  onClick={()=>removerApresentador()}/>
      </div>
      
    </div>
  )
}
import { TitlePage } from "../../components/TitlePage"

export const Galeria = () => {
  return (
    <div className="flex p-2 flex-col">
      {/*TITLE */}
      <TitlePage
        icon="faCameraRetro" 
        title="Galeria" 
        description="Insira novas fotos para a galeria de fotos da Tv Relacionamento"/>
    </div>
  )
}
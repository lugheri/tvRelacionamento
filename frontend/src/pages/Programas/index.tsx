import { TitlePage } from "../../components/TitlePage"

export const Programas = () => {
  return (
    <div className="flex p-2 flex-col">
      {/*TITLE */}
      <TitlePage
        icon="faClapperboard" 
        title="Programas" 
        description="Crie novos programas e adicione novos videos!"/>
    </div>
  )
}
import { TitlePage } from "../../components/TitlePage"

export const Configuracoes = () => {
  return (
    <div className="flex p-2 flex-col">
      {/*TITLE */}
      <TitlePage
        icon="faTools" 
        title="Configuracoes" 
        description="Configure os acessos e os usuários da área administrativa"/>
    </div>
  )
}
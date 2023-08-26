import { TitlePage } from "../../components/TitlePage"

export const Home = () => {
  return (
    <div className="flex p-2 flex-col">
      {/*TITLE */}
      <TitlePage
        icon="faHome" 
        title="Home" 
        description="Resumo das informações da tv"/>
    </div>
  )
}
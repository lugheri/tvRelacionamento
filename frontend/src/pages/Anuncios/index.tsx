import { TitlePage } from "../../components/TitlePage"

export const Anuncios = () => {
  return (
    <div className="flex p-2 flex-col">
      {/*TITLE */}
      <TitlePage
        icon="faBullhorn" 
        title="Anúncios" 
        description="Cadastre os anunciantes e os seus anúncios para vincula-los aos programas!"/>
    </div>
  )
}
import { TitlePage } from "../../components/TitlePage"

export const Academicos = () => {
  return (
    <div className="flex p-2 flex-col">
      {/*TITLE */}
      <TitlePage
        icon="faGraduationCap" 
        title="Conteúdo Acadêmico" 
        description="Crie novos programas e videos com conteúdos voltados para a área acadêmica da Tv Relacionamento!"/>
    </div>
  )
}
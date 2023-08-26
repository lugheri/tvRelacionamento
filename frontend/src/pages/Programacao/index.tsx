import { TitlePage } from "../../components/TitlePage"

export const Programacao = () => {
  return (
    <div className="flex p-2 flex-col">
      {/*TITLE */}
      <TitlePage
        icon="faCalendarDays" 
        title="Grade de Programação" 
        description="Organize os programas na tv de acordo com os dias da semana, feriados ou eventos!"/>
    </div>
  )
}
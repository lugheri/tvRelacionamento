import { TitlePage } from "../../components/TitlePage"

export const Biblioteca = () => {
  return (
    <div className="flex p-2 flex-col">
      {/*TITLE */}
      <TitlePage
        icon="faPhotoFilm" 
        title="Biblioteca" 
        description="Salve aqui as capas dos programas e as fotos dos seus apresentadores"/>
    </div>
  )
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { EmptyPageType } from "./Dto/emptypage.dto";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const Empty: React.FC<EmptyPageType> = (props) => {
  return(
    <div className="flex flex-col flex-1 h-[400px] justify-center items-center">
      { props.icon ? (<FontAwesomeIcon className="m-4 text-5xl text-slate-400" icon={Fas[props.icon] as IconProp}/>) : false}  
      { props.title ? <p className="text-slate-600 font-bold text-xl py-2">{props.title}</p> : false }  
      { props.description ? (<p className="text-slate-500 pb-2">{props.description}</p>): false }   
      { props.rightComponent ? props.rightComponent : false }   
    </div>
  )
}
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { NavLinkProps } from './Dto/sidebar.dto';

import Logo from '/img/logo.png';
import Brand from '/img/brand.png';

export const Sidebar = () => {
  const [ side, setSide ] = useState<'open'|'closed'>('open')

  return(
    <div className={`bg-slate-700 flex flex-col ${side == 'open' ? "w-60" : "w-20"} ease-in duration-180`}>
      {/*BRAND*/}
      <div className="h-16 flex flex justify-center items-center relative">
        { side == 'open' ?
          <>
            <img src={Logo} className="w-1/2 my-2"/>
            <div 
              onClick={()=>setSide('closed')}
              className="absolute right-2 top-5 bg-slate-900 text-white hover:bg-slate-950 rounded-full w-6 h-6 
                         flex justify-center items-center text-xs shadow-md cursor-pointer z-50">
              <FontAwesomeIcon icon={Fas.faCaretLeft}/>
            </div>
          </>
        : <>
            <img src={Brand} className="w-1/2 my-2"/>
            <div 
              onClick={()=>setSide('open')}
              className="absolute -right-3 top-5 bg-slate-900 text-white hover:bg-slate-950 rounded-full w-6 h-6
                        flex justify-center items-center text-xs shadow-md cursor-pointer z-50">
              <FontAwesomeIcon icon={Fas.faBars}/>
            </div>
          </>   
      }
    </div>
    {/*SIDE */}
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex flex-col">
        <ul className="py-2">
          <SideItem 
            to={`/`} 
            side={side} 
            name='Inicio' 
            icon='faHome'/>  
          <SideItem 
            to={`/apresentadores`} 
            side={side} 
            name='Apresentadores' 
            icon='faUserTie'/>  
          <SideItem 
            to={`/programas`} 
            side={side} 
            name='Programas' 
            icon='faClapperboard'/>  
          <SideItem 
            to={`/programacao`} 
            side={side} 
            name='Grade de Programação' 
            icon='faCalendarDays'/>  
          <SideItem 
            to={`/galeria`} 
            side={side} 
            name='Galeria de Fotos' 
            icon='faCameraRetro'/>  
          <SideItem 
            to={`/biblioteca`} 
            side={side} 
            name='Biblioteca' 
            icon='faPhotoFilm'/>  
        </ul>
      </div>
      {/*Side Settings*/}
      <ul className="py-2">
        <SideItem 
          to={`/configuracoes`} 
          side={side} 
          name='Configurações' 
          icon='faTools'/>  
      </ul>
    </div>
  </div>
  )
}

const SideItem: React.FC<NavLinkProps> = (props) => {
  const classSide = `flex w-full items-center font-semibold text-white p-2 ease-in duration-150 ${props.side == 'open' ? "justify-start mt-2" : "flex-col group justify-center text mb-1"}`
  return(
    <NavLink
      to={props.to}
      className={({ isActive, isPending }) => 
                    isActive ? `border-r-orange-500 border-r-8 opacity-100 ${classSide}`
                  : isPending ? classSide : `opacity-70 hover:opacity-100 ${classSide}`}>
      {props.icon ? <FontAwesomeIcon className={`${props.side=='open'? "px-4 ml-3 opacity-60" : "py-1"}`} icon={Fas[props.icon] as IconProp}/>: false}    
      {props.name ? 
        <p className={`${props.side=='open'? "text-sm" : "hidden group-hover:inline text-[.7rem] text-center font-light transition duration-150 ease-out hover:ease-in"}`}>
          {props.name}
        </p> : false}          

    </NavLink>
  )
}
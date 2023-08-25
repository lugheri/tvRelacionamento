import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import * as Far from "@fortawesome/free-regular-svg-icons";

import useAuth from "../../hooks/useAuth";
import { User } from "../../contexts/Dtos/auth.dto";

export const Navbar = () => {
  const authenticated = useAuth();
  const userdata:User|null = authenticated ? authenticated.userdata : null

  return (
    <>
      <div className=" text-neutral-900  dark:text-white flex justify-between items-center px-4 h-14">
        {/*TITLE*/}
        <div className="bg-slate-400 dark:bg-stone-900 w-1/3 h-[35px] flex justify-between items-center overflow-hidden border rounded-full border-slate-500">
          <FontAwesomeIcon className="p-3 text-xs text-slate-300" icon={Fas.faSearch}/>
          <input type="text" className="flex-1 px-2 border-0 bg-slate-400 dark:bg-stone-900 dark:text-slate-400 h-full focus:ring-0" placeholder="Pesquise Programas, apresentadores, etc ..."/>
        </div>

        {/*ACTIONS*/}
        <div className="flex justify-center items-center">
          <div className="text-gray-900 dark:text-gray-300 opacity-50 text-xl p-2 hover:opacity-100 cursor-pointer mx-2">
            <FontAwesomeIcon icon={Far.faBell}/>
          </div>         
          <p className="text-slate-500 mx-2"><FontAwesomeIcon icon={Fas.faUserCircle}/>  {userdata?.nome}</p>         
          
          <div className="group opacity-50 text-xl p-2 hover:opacity-100 cursor-pointer mx-2 flex justify-center items-center">
            <FontAwesomeIcon className="text-gray-900 dark:text-gray-300 block group-hover:hidden" icon={Fas.faDoorClosed}/>
            <FontAwesomeIcon className="text-red-800 dark:text-gray-300 hidden group-hover:block" icon={Fas.faDoorOpen}/>
            <p className="mx-2 text-sm group-hover:text-red-500">Sair</p>
          </div>
          {/*PROFILE*/}  
        </div>  
      </div>      
    </>
  )
}



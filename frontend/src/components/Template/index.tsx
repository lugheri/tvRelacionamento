import { Outlet } from "react-router-dom"
import { Navbar } from "../Navbar"
import { Sidebar } from "../Sidebar"

export const Template = () => {
  return(
    <div className="bg-slate-300 flex h-screen w-screen">
      <Sidebar/>
      <div className="flex flex-col w-screen overflow-auto">
        <Navbar/>
        <div className="h-[92vh] overflow-hidden">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
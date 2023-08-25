import { FormEvent,useState } from "react"
import api from "../../services/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

import Brand from '/img/logo.png'
import LogoTV from '/img/logoFooter.png'
import { Link } from "react-router-dom";

export const Login = () => {
  const [ username, setUsername ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  const [ ErrorAuth, setErrorAuth ] = useState<boolean>(false)
  const [ messageErrorAuth, setMessageErrorAuth ] = useState<string>('')
  const [ causeErrorAuth, setCauseErrorAuth ] = useState<string>('')

  const sendAuth = async (e:FormEvent) => {
    e.preventDefault()
    try{
      const options = {
        username: username,
        password: password
      }
      console.log(options)
      const response = await api.post('/login',options);
     
      if(response.data.success){
        localStorage.setItem('Token', response.data.token);
        console.log('Token', response.data.token)
        window.location.reload();
      }else{
        setErrorAuth(true)
        console.log(response.data.error)
        setMessageErrorAuth(response.data.error.issues ? response.data.error.issues[0].message : response.data.error)
        setCauseErrorAuth('Verifique seus dados e tente novamente!')
      }
    }catch(err:any) {
      console.log(err)
      setErrorAuth(true)
      setMessageErrorAuth('Não foi possível efetuar o login')
      setCauseErrorAuth(err.message)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="bg-login-bg h-[80vh] bg-cover bg-center flex flex-col justify-center items-center">
        <img src={Brand} className="w-36"/>
        <div className="bg-slate-700 mt-4 rounded-xl w-1/4 py-4">
          <div className="p-4 text-center text-slate-200 font-semibold text-sm">FAÇA SEU LOGIN</div>
          <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-300"></div>
          <form onSubmit={sendAuth} className="p-4 flex flex-col justify-center items-center">
            <div className="w-[70%] mt-2 overflow-hidden rounded-md flex bg-white justify-between items-center">
              <div className="flex w-[50px] justify-center items-center p-2 text-slate-400">
                <FontAwesomeIcon icon={Fas.faUser}/>
              </div>              
              <input 
                type="text"  
                placeholder="Email de Cadastro"   
                value={username} onChange={(e)=>{setUsername(e.target.value)}}
                required             
                className="w-full border-0 focus:border-b-4 focus:border-orange-400 focus:ring-0"/>
            </div>

            <div className="w-[70%] mt-2 overflow-hidden rounded-md flex bg-white justify-between items-center">
              <div className="flex w-[50px] justify-center items-center p-2 text-slate-400">
                <FontAwesomeIcon icon={Fas.faKey}/>
              </div>              
              <input 
                type="password"  
                placeholder="Senha"
                value={password} onChange={(e)=>{setPassword(e.target.value)}}
                required                
                className="w-full border-0 focus:border-b-4 focus:border-orange-400 focus:ring-0"/>
            </div>        
            <Link  to={`/forgotPass`} className="text-slate-400 hover:text-white text-sm cursor-pointer my-4" >Esqueceu a senha?</Link>  
            <button type="submit" className="w-[70%] rounded-md font-semibold mb-4 p-3 bg-gradient-to-r from-orange-500 to-orange-400 hover:bg-orange-700 text-white">
              Entrar
            </button>
            {ErrorAuth ? ( 
            <strong title={causeErrorAuth} className="border-red-800 border-2 rounded text-center text-xs mx-8 text-red-700 py-4 px-3 rounded-full shadow-md mb-4">
              <FontAwesomeIcon icon={Fas.faExclamationTriangle}/> { messageErrorAuth }
            </strong>)
            :false}
          </form>
        </div>
      </div>     
      <div className="bg-slate-600 h-[20vh] text-white flex items-center flex-col p-6">
        <p className="text-xs">Copyright 2023 © Todos os Direitos Reservados</p>
        <img src={LogoTV} className="w-36 m-2"/>
      </div>
    </div>
  )
}

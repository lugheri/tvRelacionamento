import { createContext, useEffect, useState } from 'react';
import api from '../services/api';
import { AuthContextType, AuthProviderProps, TokenProps, User } from './Dtos/auth.dto';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [ userdata, setUserData] = useState<User | null>(null);
  const [ authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [ token, setToken] = useState<boolean | null>(null);

  //Validation Data
  const validation = async () => {
    if(localStorage.getItem('Token')){
      try{
        const verificateValidationToken = await api.get('/userToken')
        if(verificateValidationToken.data.success){
          const dataToken:TokenProps = verificateValidationToken.data.userdata;            
          const getUserData = await api.get(`/getUser/${dataToken.userid}`);
          setUserData(getUserData.data)   
          setAuthenticated(true)
          setToken(true)  
        }
        
        return
      }catch(err){
        console.log(err)
      }
    }
    localStorage.removeItem('Token');
    setUserData(null);
    setAuthenticated(false)
    setToken(false)
  }

  useEffect(()=>{
    validation()
  },[token])

  const contextValue:AuthContextType = {authenticated, userdata}  
  
  console.log('Auth',authenticated)
  console.log('userData',userdata)
  return(
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )

}
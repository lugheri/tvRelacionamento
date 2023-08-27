import { createHashRouter, RouterProvider } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { PrivateProps } from '../contexts/Dtos/auth.dto';
//Template
import { Login } from '../pages/Login';
import { LoadPage } from '../pages/LoadPage';
import { Template } from '../components/Template';
import { Error } from '../pages/Error';
//Paginas
import { Home } from '../pages/Home';
import { Apresentadores } from '../pages/Apresentadores';
import { Programas } from '../pages/Programas/index';
import { Programacao } from '../pages/Programacao';
import { Galeria } from '../pages/Galeria';
import { Biblioteca } from '../pages/Biblioteca';
import { Anuncios } from '../pages/Anuncios';
import { Academicos } from '../pages/Academicos';

import { Configuracoes } from '../pages/Configuracoes';


//Validate Auths
const Private: React.FC<PrivateProps> = ({Item}) => {
  const authenticate = useAuth();
  console.log('authenticate',authenticate)
  return(
    authenticate === undefined ? <LoadPage/>
    : authenticate.authenticated === null ? <LoadPage/>
      : authenticate.authenticated ? <Item/> : <Login/>
  )
}

const RoutesApp = () => {
  const router = createHashRouter([
    {
      path: '/',
      element:<Private Item={Template}/>,
      errorElement:<Error/>,
      children:[
        {
          errorElement:<Error/>,
          children:[
            { index: true, 
              element:<Home/>
            },
            {
              path:'/apresentadores',
              element:<Apresentadores/>, 
            },
            {
              path:'/programas',
              element:<Programas/>, 
            },
            {
              path:'/programacao',
              element:<Programacao/>, 
            },
            {
              path:'/galeria',
              element:<Galeria/>, 
            },
            {
              path:'/biblioteca',
              element:<Biblioteca/>, 
            },
            {
              path:'/anuncios',
              element:<Anuncios/>, 
            },
            {
              path:'/academicos',
              element:<Academicos/>, 
            },
            {
              path:'/configuracoes',
              element:<Configuracoes/>, 
            }
          ]
        }
      ]
    }

  ])
  return(
    <RouterProvider router={router}/>
  )
}

export default RoutesApp;
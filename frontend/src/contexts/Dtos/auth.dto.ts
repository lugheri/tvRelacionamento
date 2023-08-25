
export interface User{
  id:number;
  inicio:string;
  nome:string;
  contato:string;
  usuario:string;
  senha:string;
  status:number;
}

export interface AuthContextType {
  authenticated: boolean | null;
  userdata: User |  null;
}

export interface AuthProviderProps{
  children: React.ReactNode;
}

export interface PrivateProps {
  Item: React.ComponentType; // Tipo do componente Item que será renderizado
}

export interface TokenProps {
  userid: number;
}
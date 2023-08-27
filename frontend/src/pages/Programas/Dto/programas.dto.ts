export interface IPrograma{
  id:number;
  desde:string;
  capa:number;
  arquivo:string;
  idApresentador:number;
  apresentador:number;
  titulo:string;
  descricao:string;
  ordem:number;
  status:number;
}

export interface IListProgramas{
  programas:IPrograma[]
}
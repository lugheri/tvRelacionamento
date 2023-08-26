export interface IApresentador{
  id:number;
  data:string;
  foto:number;
  arquivo:string;
  nome:string;
  descricao:string;
  ordem:number;
  status:number;
}

export interface IListApresentadores{
  apresentadores:IApresentador[]
}
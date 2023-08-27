import { CardType } from "./Dto/cards.dto"

export const Card: React.FC<CardType> = (props) => {
  return(
    <div className={`flex p-4 shadow bg-white rounded-md m-2 ${props.className}`}>
      {props.component}
    </div>
  )

}

export const CardItem: React.FC<CardType> = (props) => {
  return(
    <div className={`flex overflow-hidden shadow bg-white rounded-md my-1 ${props.className}`}>
      {props.component}
    </div>
  )

}
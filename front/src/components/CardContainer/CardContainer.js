import React from 'react'
import Productos from "../../Data/Productos"
import Card from '../Card/Card'
import './CardContainer.css'

export const CardContainer = () => {
    return (
      <div>
          {Productos.map((producto) =>{
                return(<Card key={producto.id} producto={producto} />)
              
          })}
      </div>
    )
  }
export default CardContainer;
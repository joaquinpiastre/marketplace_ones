import React from "react";
import "./Card.css";

export const Card = ({ Producto }) => {
  return (
    <div className="CardContainer">
      <div className="textContainer">
        <p className="priceText">{Producto.titulo}</p>
        <p className="priceText">{Producto.descripcion}</p>
        <p className="priceText">{Producto.cualidades}</p>
      </div>
    </div>
  );
};
export default Card
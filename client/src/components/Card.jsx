import React from "react";
import style from "../components/Home.module.css";
import { Link } from "react-router-dom";
export default function Card({ name, image, genres }) {
  return (
    <div className={style.Card}>
      <img src={image} alt="img not found" />
      <h4>{name}</h4>
      <div className={style.genres}>
        {genres.map((genre) => (
          <span key={genre.id}>{genre.name} </span>
        ))}
      </div>
    </div>
  );
}

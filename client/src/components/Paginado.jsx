import React from "react";
import Style from '../components/CSS/Paginado.module.css'
export default function Paginado({videogamesPerPage, allVideogames, paginado}) {
 const pageNumbers = [] 
 
 for (let i = 1; i<=Math.ceil(allVideogames/videogamesPerPage); i++) {
     pageNumbers.push(i)
 }
 return(
     <nav>
         <div className={Style.numbersDiv}>
             {
                 pageNumbers?.map(number =>(
                     <button className={Style.numbers} key={number} onClick={() => paginado(number)}>{number}</button>
                 ))
             }
         </div>
     </nav>
 )
}
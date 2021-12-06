import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesName } from "../acctions";
import style from './Home.module.css';

export default function SearchBar() {
 const dispatch = useDispatch()
 const [name, setName] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getVideogamesName(name))
        setName('')
    } 
 return (
     <div>
         <form onSubmit={handleSubmit}>
         <input 
         className={style.selects}
         type="text" 
         name='search'
         value={name}
         placeholder='Search...'
         onChange={handleInputChange}/>
         <button className={style.selects} type='submit'>Buscar</button>
         </form>
     </div>
 )
}
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesName } from "../acctions";
import style from './CSS/SearchBar.module.css'

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
     <div className={style.GeneralSearch}>
         <form onSubmit={handleSubmit} autoComplete="off">
         <input 
         className={style.SearchInput}
         type="text" 
         name='search'
         id='Search'
         value={name}
         placeholder='Search a videogame'
         onChange={handleInputChange}/>
         <button className={style.buttonSearch}>Search</button>
         </form>
     </div>
 )
}
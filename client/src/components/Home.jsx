import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames } from "../acctions";
import { Link } from "react-router-dom";
import Card from "./Card";


export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    console.log(allVideogames)
    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllVideogames());
    }
    

     useEffect(() => {
         dispatch(getAllVideogames())
     },[dispatch])
     
     return(
         <div>
         <Link to='/videogame'>Create a videogame</Link>
         <button onClick={e => {handleClick(e)}}>
             Refresh videogames</button>
             <div>
                 <label>Alphabetically</label>
                 <select>
                     <option value="AZ">A-Z</option>
                     <option value="ZA">Z-A</option>
                 </select>
                 <label>Rating</label>
                 <select>
                     <option value="Rating++">Rating++</option>
                     <option value="Rating--">Rating--</option>
                     </select>
                 <label>Genres</label>
                     <option value="Genres"></option>
                 <select></select>
                 <select>
                     <option value="Created">Videogame Created</option>
                     <option value="apiData">Videogame API</option>
                 </select>
                {allVideogames?.map((e) => {
                        return (
                                <Link to={'/home/' + e.id}> 
                                <Card image={e.image} name={e.name} key={e.id} genres={e.genres}/>
                                </Link>
                    )})
                }
             </div>
         </div>
     )
     

    }
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../acctions";
import { useEffect } from "react";

export default function Details(props){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetails(props.match.params.id))
    },[dispatch])

    const myVideogame = useSelector((state) => state.detail)

return (
    <div>
        {
            myVideogame.length > 0?
            <div>
                <h1>{myVideogame.name}</h1>
                <img src={myVideogame.image} width="500px" height="700px"/>
                <h2>{myVideogame.genres.map((genre) => genre.name + (' '))}</h2>
                <h2>{myVideogame.platforms}</h2>
                <h3>{myVideogame.description}</h3>
                <h4>{myVideogame.released}</h4>
                <h5>{myVideogame.rating}</h5>
                
            </div> : <p>Loading...</p>
        }
        <Link to='/home'>
            <button>Go Back</button>
        </Link>
    </div>
)
}
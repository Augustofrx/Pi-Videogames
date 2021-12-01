import React from "react";

export default function Card({name, image, genres}) {
    return (
        <div>
            <img src={image} alt="img not found" width='200px' height='200px'/>
            <h3>{name}</h3>
            <h5>{genres.map(genre => <h5>{genre.name}</h5>)}</h5>
        </div>
    )
}
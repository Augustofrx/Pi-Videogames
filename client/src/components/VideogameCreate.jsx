import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../acctions";
import { useDispatch, useSelector } from "react-redux";

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.videogames);
  let platforms = [];
  if(videogames){
   platforms = videogames.map((game) =>
    game.platforms.find((platform) => platform)
    );
    platforms = Array.from(new Set(platforms.map(e => e)))
  }
  //let hash = {};
  //let platforms = platformsDisordered.filter((o) =>
  // hash[o.name] ? false : (hash[o.name] = true)
  // );
  
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    image: "",
    genres: [],
    platforms: [],
});

function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
}
  function handleSelectGenres(e) {
    setInput({
        ...input,
      genres: [...input.genres, e.target.value],
    });
}

function handleSelectPlatforms(e) {
    setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
    });
}


function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVideogame(input));
    alert("Videogame created successfuly =)");
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      image: "",
      genres: [],
      platforms: [],
    });
    history.push("/home");
  }

  function handleDeleteGenres(e) {
    setInput({
      ...input,
      genres: input.genres.filter(genre => genre !== e)
    })
  }
function handleDeletePlatforms(e) {
  setInput({
    ...input,
    platforms: input.platforms.filter(platform => platform !== e)
  })
}
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  return (
    <div>
      <Link to="/home">
        <button>Back to Home</button>
      </Link>
      <h1>Create your videogame!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
         
          <input
          placeholder="Name"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>

          <input
            type="text"
            placeholder="Description"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>

          <input
          
            type="Date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>

          <input
          placeholder="Rating"
            type="number"
            value={input.rating}
            min="0"
            max="5"
            name="rating"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>

          <input
          placeholder="Url Image"
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <label>Genres: </label>
        <select
        onChange={(e) => handleSelectGenres(e)}>
          {genres.map((genre) => (
            <option
            value={genre.name}>{genre.name}</option>
            ))}
        </select>
        <label>Platforms: </label>
        <select onChange={(e) => handleSelectPlatforms(e)}>
          {platforms.map((platform) => (
            <option value={platform}>{platform}</option>
            ))}
        </select>
            <button type="submit">Done</button>
      </form>
       <h5>
            {input.genres.map((e) => (
          <div>
            {e + " "}
            <button className="ButtonX" onClick={() => handleDeleteGenres(e)}>x</button>
          </div>
            ))}
            </h5>
            <h5>
              {input.platforms.map((e) => (
          <div>
            {e + " "}
            <button className="ButtonX" onClick={() => handleDeletePlatforms(e)}>x</button>
          </div>
            ))}
          </h5>
    </div>
  );
}

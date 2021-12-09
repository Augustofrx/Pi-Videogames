import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../acctions";
import { useDispatch, useSelector } from "react-redux";
import style from './CSS/VideogameCreate.module.css'


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
  
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
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
    alert("Videogame created successfully");
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
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
  }, [dispatch]);
  return (
    <div className={style.General}>
      <Link to="/home" className={style.BackToHomeDiv}>
        <button className={style.BackToHomeButton}>Back to Home</button>
      </Link>
      <div className={style.transparentForm}>
      <h1 className={style.title}>Create your videogame!</h1>
      <form  className={style.form}onSubmit={(e) => handleSubmit(e)}>
        <div className={style.nameDiv}>
         
          <input className={style.nameInput}
          placeholder="Name"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className={style.descriptionDiv}>

          <input className={style.descriptionInput}
            type="text"
            placeholder="Description"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className={style.dateDiv}>

          <input className={style.dateInput}
          required
          max="today"
            type="Date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={style.ratingDiv}>

          <input className={style.ratingInput}
          placeholder="Rating"
          title="Debe ingresar un número entre 1 y 5"
          id="Rating"  
          type="number"
            value={input.rating}
            min="1"
            max="5"
            name="rating"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <label className={style.labelGenres}>Genres: </label>
        <select required className={style.selectGenres}
        onChange={(e) => handleSelectGenres(e)}>
         <option key="empty1"></option>
          {genres.map((genre) => (
            <option key={genre.id} required
            value={genre.name}>{genre.name}</option>
            ))}
        </select>
        <label className={style.labelPlatforms}>Platforms: </label>
        <select required className={style.selectPlatforms} onChange={(e) => handleSelectPlatforms(e)}>
          <option key="empty2"></option>
          {platforms.map((platform, index) => (
            <option key={index} value={platform} required>{platform}</option>
            ))}
        </select>
            <button className={style.buttonDone} type="submit">Done</button>
      </form>
       <div className={style.divRenderGenres}>
            {input.genres.map((e) => (
         <div>
            {e + " "}
            <button  key="btnXgenres"className={style.buttonXgenres} onClick={() => handleDeleteGenres(e)}>x</button>
          </div>

            ))}
            </div>
            <div className={style.divRenderPlatforms}>
              {input.platforms.map((e) => (
          <div>
            {e + " "}
            <button key="btnXPlatforms"className={style.buttonXplatforms} onClick={() => handleDeletePlatforms(e)}>x</button>
          </div>
            ))}
          </div>
      </div>
    </div>
  );
}

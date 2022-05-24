import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postVideogame, getGenres, getAllVideogames } from "../acctions";
import { useDispatch, useSelector } from "react-redux";
import style from "./CSS/VideogameCreate.module.css";
import Swal from "sweetalert2";

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.videogames);
  let platforms = [];
  if (videogames) {
    platforms = videogames.map((game) =>
      game.platforms.find((platform) => platform)
    );
    platforms = Array.from(new Set(platforms.map((e) => e)));
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

  const [errors, setErrors] = useState();

  const validateName = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!/[a-zA-Z\s]+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: "You must put a name, only letters",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateDescription = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!/[a-zA-Z0-9_-\s]+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: "You must put a description",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateDate = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!/[0-9]+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: "You must choose a released date",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateSelects = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if ((input.genres).length === 0 || (input.platforms).length === 0) {
      setErrors({
        ...errors,
        [name]: "You must put almost one genre and platform",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateRating = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!/[1-5]{1}$/.test(value)) {
      setErrors({
        ...errors,
        [name]: "You must put a number between 1 and 5",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  function handleSelectGenres(e) {
    if (!input.genres.includes(e.target.value) && e.target.value !== "") {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }

  function handleSelectPlatforms(e) {
    if (!input.platforms.includes(e.target.value) && e.target.value !== "") {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !Object.values(input).filter((e, i) => e === "" && i !== 1).length ===
        0 &&
      !errors.name &&
      !errors.description &&
      !errors.released &&
      !errors.rating &&
      !errors.platforms &&
      !errors.genres
    ) {
      dispatch(postVideogame(input));
      Swal.fire({
        icon: "success",
        title: "Excellent!",
        text: "Videogame created successfully!",
      });
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
      navigate("/home");
      dispatch(getAllVideogames());
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must complete all fields before continuing and all the fields must be completed correctly!",
      });
    }
  }

  function handleDeleteGenres(e) {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== e),
    });
  }

  function handleDeletePlatforms(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((platform) => platform !== e),
    });
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
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={style.nameDiv}>
            <input
              className={style.nameInput}
              placeholder="Name"
              type="text"
              autoComplete="off"
              value={input.name}
              name="name"
              onChange={(e) => {
                handleChange(e);
                validateName(e);
              }}
            />
            <div className={style.divErrorName}>
              <p className={style.errors}>{errors?.name}</p>
            </div>
          </div>
          <div className={style.descriptionDiv}>
            <input
              className={style.descriptionInput}
              type="text"
              placeholder="Description"
              value={input.description}
              name="description"
              autoComplete="off"
              onChange={(e) => {
                validateDescription(e);
                handleChange(e);
              }}
            />
            <div className={style.divErrorDescription}>
              <p className={style.descriptionErrors}>{errors?.description}</p>
            </div>
          </div>
          <div className={style.dateDiv}>
            <input
              className={style.dateInput}
              autoComplete="off"
              type="Date"
              value={input.released}
              name="released"
              onChange={(e) => {
                validateDate(e);
                handleChange(e);
              }}
            />
            <div className={style.divErrorDate}>
              <p className={style.dateErrors}>{errors?.released}</p>
            </div>
          </div>
          <div className={style.ratingDiv}>
            <input
              className={style.ratingInput}
              placeholder="Rating"
              autoComplete="off"
              id="Rating"
              type="number"
              min="1"
              max="5"
              value={input.rating}
              name="rating"
              onChange={(e) => {
                validateRating(e);
                handleChange(e);
              }}
            />
            <div className={style.divErrorRating}>
              <p className={style.ratingErrors}>{errors?.rating}</p>
            </div>
          </div>
          <label className={style.labelGenres}>Genres: </label>
          <select
            className={style.selectGenres}
            onChange={(e) => {
              validateSelects(e);
              handleSelectGenres(e);
            }}
          >
            <option key="empty1"></option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
            <div>
              <p>{errors?.genres}</p>
            </div>
          </select>
          <label className={style.labelPlatforms}>Platforms: </label>
          <select
            className={style.selectPlatforms}
            onChange={(e) => {
              validateSelects(e);
              handleSelectPlatforms(e);
            }}
          >
            <option key="empty2"></option>
            {platforms.map((platform, index) => (
              <option key={index} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          <button id="btnDone" className={style.buttonDone} type="submit">
            Done
          </button>
        </form>
        <div className={style.divRenderGenres}>
          {input.genres.map((e) => (
            <div>
              {e + " "}
              <button
                key="btnXgenres"
                className={style.buttonXgenres}
                onClick={() => handleDeleteGenres(e)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div className={style.divRenderPlatforms}>
          {input.platforms.map((e) => (
            <div>
              {e + " "}
              <button
                key="btnXPlatforms"
                className={style.buttonXplatforms}
                onClick={() => handleDeletePlatforms(e)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

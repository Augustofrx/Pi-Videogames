import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
  getGenres,
  filterByGenres,
  filterByOrigin,
  alphabeticalOrder,
  OrderByRating,
} from "../acctions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import style from "../components/CSS/Home.module.css";
import SearchBar from "./SearchBar";
import Loader from "./Images/Loader.gif";
import Megaman from "./Images/megaman.gif";
import sadCat from './Images/sadCat.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres)
  const isLoading = useSelector((state) => state.loading);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const videogamesPerPage = 15;
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleAlphabeticalOrder(e) {
    e.preventDefault();
    dispatch(alphabeticalOrder(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleOrderByRating(e) {
    e.preventDefault();
    dispatch(OrderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterByGenre(e) {
    dispatch(filterByGenres(e.target.value));
  }

  function handleFilterByOrigin(e) {
    dispatch(filterByOrigin(e.target.value));
  }

  function handleResetsFilters() {
    dispatch(getAllVideogames());
  }

  useEffect(() => {
    if (!allVideogames.length) {
      dispatch(getAllVideogames());
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);


  window.scrollTo(0, 0);

  return (
    <div className={style.Home}>
      <nav className={style.nav}>
        <SearchBar />
        <div className={style.createVideogame}>
          <Link key='create' to="/videogame">Create a videogame</Link>
        </div>
        <div className={style.divReset}>
            <button className={style.buttonReset} onClick={e => handleResetsFilters(e)}>
            <FontAwesomeIcon icon={faArrowRotateLeft} />
            </button>
        </div>
        <div className={style.filtersCss}>
          <div className={style.alphabeticalOrder}>
            <label className={style.labels}>Order: </label>
            <select
              className={style.selects}
              onChange={(e) => handleAlphabeticalOrder(e)}
            > <option value="None">None</option>
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
            </select>
          </div>
          <div className={style.OrderByRating}>
            <label className={style.labels}>Rating: </label>
            <select
              className={style.selects}
              onChange={(e) => handleOrderByRating(e)}
            > <option value="None">None</option>
              <option value="Rating++">Rating++</option>
              <option value="Rating--">Rating--</option>
            </select>
          </div>
          <div className={style.filterByGenres}>
            <label className={style.labels}>Genres: </label>
            <select
              className={style.selects}
              onChange={(e) => handleFilterByGenre(e)}
            >
              <option value="All">All</option>
              {genres.map((genre) => (
            <option key={genre.id} required
            value={genre.name}>{genre.name}</option>
            ))}
            </select>
          </div>
          <div className={style.filterByOrigin}>
            <label className={style.labels}>Origin: </label>
            <select
              className={style.selects}
              onChange={(e) => handleFilterByOrigin(e)}
            >
              <option value="All" key="all">
                All
              </option>
              <option value="Created" key="Ctd">
                Videogame Created
              </option>
              <option value="apiData" key="API">
                Videogame API
              </option>
            </select>
          </div>
        </div>
        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
      </nav>
      {isLoading ? (
        <div>
          <div className={style.LoaderGifMegaman}>
            <img src={Megaman} alt="loaderMegaman.gif" />
          </div>
          <div className={style.LoaderGif}>
            <img src={Loader} alt="loading.gif" />
          </div>
        </div>
      ) : (
        <div className={style.parent}>
          {currentVideogames.length ? (
            currentVideogames.map((e) => {
              return (
                <Link key={e.id} to={"/home/" + e.id}>
                  <Card
                    className={style.Card}
                    image={e.image}
                    name={e.name}
                    key={e.id}
                    genres={e.genres}
                  />
                </Link>
              );
            })
          ) : (
            <div>
            <div className={style.sadCatGif}>
            <img src={sadCat} alt="sadCat.gif" />
          </div>
            <div className={style.noResultsDiv}>
              <h3>No results found, try another way...</h3>
            </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

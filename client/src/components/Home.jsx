import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
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

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
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

  useEffect(() => {
    if (!allVideogames.length) {
      dispatch(getAllVideogames());
    } 
      ////  --->esto permite eliminar los warning de dependencias !
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  window.scrollTo(0, 0);

  return (
    <div className={style.Home}>
      <nav className={style.nav}>
        <SearchBar />
        <div className={style.createVideogame}>
          <Link to="/videogame">Create a videogame</Link>
        </div>
        <div className={style.filtersCss}>
          <div className={style.alphabeticalOrder}>
            <label className={style.labels}>Order: </label>
            <select
              className={style.selects}
              onChange={(e) => handleAlphabeticalOrder(e)}
            >
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
            </select>
          </div>
          <div className={style.OrderByRating}>
            <label className={style.labels}>Rating: </label>
            <select
              className={style.selects}
              onChange={(e) => handleOrderByRating(e)}
            >
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
              <option value="Action">Action</option>
              <option value="Indie">Indie</option>
              <option value="Adventure">Adventure</option>
              <option value="RPG">RPG</option>
              <option value="Strategy">Strategy</option>
              <option value="Shooter">Shooter</option>
              <option value="Casual">Casual</option>
              <option value="Simulation">Simulation</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Arcade">Arcade</option>
              <option value="Platformer">Platformer</option>
              <option value="Racing">Racing</option>
              <option value="Massively Multiplayer">
                Massively Multiplayer
              </option>
              <option value="Sports">Sports</option>
              <option value="Fighting">Fighting</option>
              <option value="Board Games">Board Games</option>
              <option value="Educational">Educational</option>
              <option value="Card">Card</option>
              <option value="Family">Family</option>
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

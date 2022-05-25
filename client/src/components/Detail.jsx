import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, resetDetail } from "../acctions";
import { useEffect } from "react";
import style from "./CSS/Detail.module.css";
import Loader from './Images/Loader.gif'
import Megaman from './Images/megaman.gif'

export default function Details() {
  const dispatch = useDispatch();
  const myVideogame = useSelector((state) => state.detail);

  const params = useParams()
  
  useEffect(() => {
    dispatch(getDetails(params.id));
    return () => dispatch(resetDetail());
  }, [dispatch, params.id]);
   window.scrollTo(0, 0);
  return (
    <div className={style.container} id="container">
      
      {myVideogame ? (
        <div className={style.generalDiv}>
          <div className={style.titleDiv}>
            <h1 className={style.title}>{myVideogame.name}</h1>
          </div>
          <img className={style.onTopImg} src={myVideogame.image} alt="AroundImage.jpg"/>
          <div className={style.genresDiv}>
            <h2 className={style.genresWords}>
              GENRES:  {myVideogame.genres.map((genre) => genre.name + " ")}
            </h2>
          </div>
          <div className={style.platformsDiv}>
            <h2 className={style.platformsWords}>
              PLATFORMS: {myVideogame.platforms.map(platform => platform + (' '))}
            </h2>
          </div>
          <div className={style.descriptionDiv}>
            <h4 className={style.descriptionWords}
              dangerouslySetInnerHTML={{
                __html:myVideogame.description,
              }}
            />
          </div>
          <div className={style.releasedDiv}>
            <h4 className={style.releasedWords}>
              Released: {myVideogame.released}
            </h4>
          </div>
          <div className={style.ratingDiv}>
            <h5 className={style.ratingNumbers}>
              Rating: {myVideogame.rating}
            </h5>
          </div>
          <div className={style.backgroundBlurDiv}>
            <img className={style.backgroundBlur} src={myVideogame.image} alt="BackgroundImage.jpg"/>
          </div>
          </div>
      ) : (
        <div className={style.loadersGeneral}>
        <div className={style.megaman}>  <img src={Megaman} alt="loaderMegaman.gif" /> </div>
     <div>   <img src={Loader} alt="loading.gif" /></div>
     </div>
        )}
        {myVideogame?(
          <div className={style.goBackDiv}>
      <Link to="/home">
        <button className={style.GoBackButton}>Go Back</button>
      </Link>
      </div>
          ) : ''}
    </div>
  );
}

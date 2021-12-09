import React from "react";
import { Link } from 'react-router-dom';
import style from '../components/CSS/Landing.module.css'
export default function LandingPage() {
  return (
    <div className={style.landing}>
     <Link to='/home'>
         <button className={style.ButtonStart}>
             Start
         </button>   
     </Link>
    </div>
  );
}
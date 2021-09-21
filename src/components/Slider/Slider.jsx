
import React, { useState, useEffect, useContext } from 'react';
import { FilmContext } from '../Context';
import { PATHTODATANODE } from '../../constants/constants';
import { Link } from "react-router-dom";

import './Slider.css';

const img = [];
export default function Slider () {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const { films } = useContext(FilmContext);

  if(img.length === 0) {

    <nav>
      { films.map((film) => {
        return (
          img.push(
            <Link to={ `/filmscard/${ film._id }` } >

              <img key={ film._id } src={ `${ PATHTODATANODE }/${ film._id }/img/${ film.images[ 0 ] }` } alt='' />
            </Link>
          )

        );
      }) }
    </nav>;
  }

  useEffect(() => {

    setInterval(() => {

      setActiveIndex((current) => {
        // Вычисляем индекс следующего слайда, который должен вывестись
        return (current === img.length - 1 ? 0 : current + 1);

      });
    }, 10000);

    return () => clearInterval();
  }, []);

  // Вычисляем индекс предыдущего слайда
  const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1;
  // Вычисляем индекс следующего слайда
  const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1;


  return (
    <div className='container'>
      <i className='leftbtn fas fa-chevron-left' onClick={ () => setActiveIndex(activeIndex ? activeIndex - 1 : img.length - 1) }></i>

      <div className="slider">
        <div className="slider-img slider-img-prev"
          key={ prevImgIndex } >
          { img[ prevImgIndex ] }
        </div>

        <div className="slider-img"
          key={ activeIndex } >
          { img[ activeIndex ] }
        </div>

        <div className="slider-img slider-img-next"
          key={ nextImgIndex } >
          { img[ nextImgIndex ] }
        </div>

      </div>

      <i className='rightbtn fas fa-chevron-right' onClick={ () => setActiveIndex(activeIndex === img.length - 1 ? 0 : activeIndex + 1) }></i>
    </div >
  );
}

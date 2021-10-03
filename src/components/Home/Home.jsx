import React, { useContext } from 'react';
import { FilmContext } from '../Context';
import Slider, { CarouselItem } from '../Slider/Slider';
import MultiSlider from '../MultiSlider/MultiSlider';
import { PATHTO } from '../../constants/constants';
import { Link } from "react-router-dom";
import './Home.css';

const img = [];

export default function Home (props) {
  const { films } = useContext(FilmContext);

  if(img.length === 0) {

    <nav>
      { films.map((film) => {
        return (
          img.push(
            <Link to={ `/filmscard/${ film._id }` } >
              <img key={ film._id } src={ `${ PATHTO.HOST_NAME }/${ film._id }/img/${ film.images[ 0 ] }` } alt='' />
            </Link>
          )
        );
      }) }
    </nav>;
  }

  return (
    <div className='Home'>
      <div className='home-body'>
        <Slider>
          { img.map((image, i) => {
            return <CarouselItem key={ i }>{ image }</CarouselItem>;
          }) }
        </Slider>
      </div>
      <main style={ { height: '100vh' } }>
        <MultiSlider />
      </main>
    </div >


  );
}
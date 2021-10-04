import React, { useContext } from 'react';
import { FilmContext } from '../Context';
import Slider, { CarouselItem } from '../Slider/Slider';
import MultiSlider from '../MultiSlider/MultiSlider';
import { PATHTO } from '../../constants/constants';
import { Link } from "react-router-dom";
import './Home.css';

const img = [];
const postersArr = [];

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
  if(postersArr.length === 0) {
    <nav>
      { films.map((film) => {
        return (
          postersArr.push(
            <Link to={ `/filmscard/${ film._id }` } >
              <img key={ film._id } src={ `${ PATHTO.HOST_NAME }/${ film._id }/poster/${ film.poster }` } alt='' />
            </Link>
          )

        );
      }) }
    </nav>;
  }

  return (
    <div className='Home'>
      <div className='home-body'>
        <Slider imgOnScreen={ 1 } imgToSlide={ 1 }>
          { img.map((image, i) => {
            return <CarouselItem key={ i }>{ image }</CarouselItem>;
          }) }
        </Slider>
        <h1 style={ { textAlign: 'center', margin: '30px' } }>Recomended to you</h1>
        <Slider imgOnScreen={ 5 } imgToSlide={ 1 } style={ { height: "200px" } }>
          { postersArr.map((image, i) => {
            return <CarouselItem key={ i }>{ image }</CarouselItem>;
          }) }
        </Slider>
      </div>
      {/* <main style={ { height: '100vh' } }>
        <MultiSlider />
      </main> */}
    </div >


  );
}
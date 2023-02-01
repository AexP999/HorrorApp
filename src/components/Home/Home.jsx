import React, { useEffect, useState, memo } from 'react';
import Slider, { CarouselItem } from '../Slider/Slider';
import { PATHTO } from '../../constants/constants';
import { Link } from "react-router-dom";
import { useDynamicFilmsDataHook } from '../Hooks/getDynamicFilms.hook';

import './Home.css';

// const img = [];
// const postersArr = [];

export default memo(function Home () {
  const { getFilmsDataFromDb, filmsData, fetching, setFetching } = useDynamicFilmsDataHook();

  console.log('fetching', fetching);

  // const [ windowSize, setWindowSize ] = useState({ width: 0 });
  const [ image, setImage ] = useState([]);
  // const [ poster, setPoster ] = useState([]);

  useEffect(() => {
    fetching && getFilmsDataFromDb(10, 'images');

  }, [ fetching ]);

  const img = [];

  useEffect(() => {

    if(img.length === 0) {
      filmsData &&
        <nav>
          { filmsData.map((film) => (
            img.push(
              <Link to={ `/filmscard/${ film._id }` } >
                <img className='bigslider' key={ film._id } src={ `${ PATHTO.HOST_NAME }/${ film._id }/img/${ film.images[ 0 ] }` } alt='' />
              </Link>
            )
          )
          ) }
        </nav>;
      setImage(img);
    }
  }, [ filmsData ]);

  console.log('IMAGE', image);
  console.log('filmsData', filmsData);

  // if(postersArr.length === 0) {
  //   films && <nav>
  //     { films.map((film) => {
  //       return (
  //         postersArr.push(
  //           <Link to={ `/filmscard/${ film._id }` } >
  //             <img className='multi-slider' key={ film._id } src={ `${ PATHTO.HOST_NAME }/${ film._id }/poster/${ film.poster }` } alt='' />
  //           </Link>
  //         )

  //       );
  //     }) }
  //   </nav>;
  // }

  // useEffect(() => {
  //   const updateSize = () => {
  //     setWindowSize({ width: window.innerWidth });
  //   };
  //   window.addEventListener('resize', updateSize);
  //   updateSize();
  //   return () => window.removeEventListener('resize', updateSize);
  // }, []);

  // const numberOfImageOnScreen = Math.floor(windowSize.width * 0.9 / 185);

  return (
    <div className='Home'>
      <div className='home-body'>
        <Slider
          slideOn={ false }
          imgOnScreen={ 1 }
          imgToSlide={ 1 }
          setFetching={ setFetching }
        >
          { image.map((image, i) => (
            <CarouselItem key={ i }>
              { image }
            </CarouselItem>
          )) }
        </Slider>

        <h1 style={ { textAlign: 'center', margin: '30px' } }>Recomended to you</h1>

        {/* <Slider
          slideOn={ false }
          imgOnScreen={ numberOfImageOnScreen }
          imgToSlide={ numberOfImageOnScreen - 1 }
        >
          { postersArr.map((image, i) => (
            <CarouselItem key={ i }>{ image }</CarouselItem>
          )) }
        </Slider> */}
      </div>
    </div >
  );
});
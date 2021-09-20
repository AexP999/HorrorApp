import React, { useState, useContext } from 'react';
import { FilmContext } from '../Context.js';
import { PATHTODATANODE } from '../../constants/constants';
import { Link } from "react-router-dom";

import './MultiSlider.css';

const postersArr = [];

export default function MultiSlider () {
  const [ activeIndex, setActiveIndex ] = useState(0);

  const { films } = useContext(FilmContext);

  if(postersArr.length === 0) {
    <nav>
      { films.map((film) => {
        return (
          postersArr.push(
            <Link to={ `/filmscard/${ film._id }` } >
              <img key={ film._id } src={ `${ PATHTODATANODE }/${ film._id }/poster/${ film.poster }` } alt='' />
            </Link>
          )

        );
      }) }
    </nav>;
  }

  // const [ sliderCurrentWidth, setSliderCurrentWidth ] = useState(0);
  // const wrapperRef = useRef(Array(postersArr.length).fill(createRef()));
  const wrapperRef = [];

  // useEffect(() => {

  //   const sliderWidth = document.getElementById('width1').offsetWidth;
  //   // console.log(sliderCurrentWidth);
  //   setSliderCurrentWidth(sliderWidth);

  //   const element = document.querySelector('.sliderEl');
  //   const sliderElWidth = element.offsetWidth;
  //   // console.log('sliderElWidth', sliderElWidth);

  //   const marginWidth = 2 * parseInt(getComputedStyle(element, true).marginLeft);
  //   // console.log('marginWidth', marginWidth);

  //   const elementsPerPage = Math.floor(sliderCurrentWidth / (sliderElWidth + marginWidth));
  //   console.log(elementsPerPage);

  // }, [ sliderCurrentWidth ]);

  const moveRight = () => {
    postersArr.push(postersArr.shift());

    setActiveIndex(activeIndex + 1);
  };

  const moveLeft = () => {
    postersArr.unshift(postersArr.pop());

    for(let key = 0; key < wrapperRef.length; key++) {
      wrapperRef[ key ].style.transform = 'rotateY(30deg)';

    }
    setActiveIndex(activeIndex - 1);
  };

  return (
    <div style={ { textAlign: 'center', margin: '20px' } }>
      <h1>Recomended to you</h1>
      <div className='container'>
        <i className='leftbtn fas fa-chevron-left' onClick={ () => moveLeft() }></i>

        <div className="slider-m" id='width1'>

          { postersArr.map((poster, i) => <div
            ref={ ref => wrapperRef[ i ] = ref }
            className="sliderEl" key={ i } >{ poster }</div>) }

        </div>

        <i className='rightbtn fas fa-chevron-right' onClick={ () => moveRight() }></i>
      </div >
    </div>
  );


}

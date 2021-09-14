import React, { useState, useContext } from 'react';
import { FilmContext } from '../Context.js';
import { PATHTODATANODE } from '../../constants/constants';
import { Link } from "react-router-dom";

// import poster1 from "../../img/poster1.jpg";
// import poster2 from "../../img/poster2.jpg";
// import poster3 from "../../img/poster3.jpg";
// import poster4 from "../../img/poster4.jpg";
// import poster5 from "../../img/poster5.jpg";
// import poster6 from "../../img/poster6.jpg";
// import poster7 from "../../img/poster7.jpg";
// import poster8 from "../../img/poster8.jpg";
// import poster9 from "../../img/poster9.jpg";
// import poster10 from "../../img/poster10.jpg";

import './MultiSlider.css';

const postersArr = [
  // <img src={ poster3 } alt='slide3' />,
  // <img src={ poster1 } alt='slide1' />,
  // <img src={ poster4 } alt='slide4' />,
  // <img src={ poster5 } alt='slide5' />,
  // <img src={ poster2 } alt='slide2' />,
  // <img src={ poster6 } alt='slide6' />,
  // <img src={ poster7 } alt='slide7' />,
  // <img src={ poster8 } alt='slide8' />,
  // <img src={ poster9 } alt='slide9' />,
  // <img src={ poster10 } alt='slide10' />,
];

export default function MultiSlider () {
  const [ activeIndex, setActiveIndex ] = useState(0);

  const { films } = useContext(FilmContext);

  if(postersArr.length === 0) {
    <nav>
      { films.map((film) => {
        return (
          postersArr.push(
            <Link to="/filmscard" >
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

import React, { useState, useEffect } from 'react';
import poster1 from "../../img/poster1.jpg";
import poster2 from "../../img/poster2.jpg";
import poster3 from "../../img/poster3.jpg";
import poster4 from "../../img/poster4.jpg";
import poster5 from "../../img/poster5.jpg";
import poster6 from "../../img/poster6.jpg";
import poster7 from "../../img/poster7.jpg";
import poster8 from "../../img/poster8.jpg";
import poster9 from "../../img/poster9.jpg";
import poster10 from "../../img/poster10.jpg";

import './MultiSlider.css';

const images = [
  <img key={ poster2 } src={ poster2 } alt='slide2' />,
  <img key={ poster3 } src={ poster3 } alt='slide3' />,
  <img key={ poster1 } src={ poster1 } alt='slide1' />,
  <img key={ poster4 } src={ poster4 } alt='slide4' />,
  <img key={ poster5 } src={ poster5 } alt='slide5' />,
  <img key={ poster6 } src={ poster6 } alt='slide6' />,
  <img key={ poster7 } src={ poster7 } alt='slide7' />,
  <img key={ poster8 } src={ poster8 } alt='slide8' />,
  <img key={ poster9 } src={ poster9 } alt='slide9' />,
  <img key={ poster10 } src={ poster10 } alt='slide10' />,
];

export default function MultiSlider () {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ sliderCurrentWidth, setSliderCurrentWidth ] = useState(1200);
  // const wrapperRef = useRef(Array(images.length).fill(createRef()));
  const wrapperRef = [];

  useEffect(() => {

    const sliderWidth = document.getElementById('width1').offsetWidth;
    console.log(sliderCurrentWidth);
    setSliderCurrentWidth(sliderWidth);

    const element = document.querySelector('.sliderEl');
    const sliderElWidth = element.offsetWidth;
    console.log('sliderElWidth', sliderElWidth);

    const marginWidth = 2 * parseInt(getComputedStyle(element, true).marginLeft);
    console.log('marginWidth', marginWidth);

    const elementsPerPage = Math.floor(sliderCurrentWidth / (sliderElWidth + marginWidth));
    console.log(elementsPerPage);

  }, [ sliderCurrentWidth ]);

  const moveRight = () => {
    images.push(images.shift());

    setActiveIndex(activeIndex + 1);
  };

  const moveLeft = () => {
    images.unshift(images.pop());

    for(let key = 0; key < wrapperRef.length; key++) {
      wrapperRef[ key ].style.transform = 'rotateY(30deg)';

    }

    // const wrapper = wrapperRef
    // console.log('wrapper', wrapper);
    // wrapper.classList.toggle('effectOn');
    // setInterval(() => {

    // }, 1000);
    setActiveIndex(activeIndex - 1);
  };

  const prevImgIndex = activeIndex ? activeIndex - 1 : images.length - 1;

  const nextImgIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;

  console.log('prevImgIndex', prevImgIndex, 'activeIndex', activeIndex, 'nextImgIndex', nextImgIndex,);

  return (
    <div className='container'>
      <i className='leftbtn fas fa-chevron-left' onClick={ () => moveLeft() }></i>

      <div className="slider-m" id='width1'>
        {/* <div className="slider-img-m slider-img-prev"
          key={ prevImgIndex } >
          { img[ prevImgIndex ] }
        </div>

        <div className="slider-img-m"
          key={ activeIndex } >
          { img[ activeIndex ] }
        </div>

        <div className="slider-img-m slider-img-next"
          key={ nextImgIndex } >
          { img[ nextImgIndex ] }
        </div> */}
        { images.map((image, i) => <div ref={ ref => wrapperRef[ i ] = ref } className="sliderEl" key={ i } >{ image }</div>) }

      </div>

      <i className='rightbtn fas fa-chevron-right' onClick={ () => moveRight() }></i>
    </div >
  );


}

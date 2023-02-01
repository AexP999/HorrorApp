import React, { useState, useEffect, Children, cloneElement } from 'react';
import './Slider.css';

export const CarouselItem = ({ children, width }) => (
  <div className='carousel-item' style={ { width: width } }>
    { children }
  </div>
);

const Slider = ({ children, imgOnScreen, imgToSlide, slideOn, setFetching }) => {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ doAutoSlidePaused, setDoAutoSlidePaused ] = useState(false);

  console.log('activeIndex', activeIndex);

  console.log('Children.count(children)', Children.count(children));

  const updateIndex = (newIndex) => {
    if(newIndex < 0) {
      newIndex = Math.ceil(Children.count(children) / imgToSlide) - 1;
    } else if(newIndex >= Math.ceil(Children.count(children) / imgToSlide)) {
      newIndex = 0;
    }
    if(newIndex >= Children.count(children) - 2) {
      setFetching(true);
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if(!doAutoSlidePaused && slideOn) {
        updateIndex(activeIndex + 1);
      }
    }, 7000);
    return () => {
      if(interval) { clearInterval(interval); }
    };
  });

  return (
    <div className="slider-cont"  >
      <i className='leftbtn fas fa-chevron-left' onClick={ () => updateIndex(activeIndex - 1) }></i>
      <div className='carousel' id="width1"
        onMouseEnter={ () => setDoAutoSlidePaused(true) }
        onMouseLeave={ () => setDoAutoSlidePaused(false) }
      >
        <div className="inner" style={ { transform: `translateX(-${ activeIndex * 100 / imgOnScreen * imgToSlide }%)` } }
        >
          { Children.map(children, (child, i) => {
            return cloneElement(child, { width: `${ 100 / imgOnScreen }%` });
          }
          ) }
        </div >
      </div>
      <i className='rightbtn fas fa-chevron-right' onClick={ () => updateIndex(activeIndex + 1) }></i>
    </div>
  );
};
export default Slider;

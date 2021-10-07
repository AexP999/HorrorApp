import React, { useState, useEffect } from 'react';
import './Slider.css';


export const CarouselItem = ({ children, width }) => {
  return (
    <div className='carousel-item' style={ { width: width } }>
      { children }
    </div>
  );
};

const Slider = ({
  children,
  imgOnScreen,
  imgToSlide,
  slideOn
}) => {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ doAutoSlidePaused, setDoAutoSlidePaused ] = useState(false);

  const updateIndex = (newIndex) => {
    if(newIndex < 0) {
      newIndex = Math.ceil(React.Children.count(children) / imgToSlide) - 1;
    } else if(newIndex >= Math.ceil(React.Children.count(children) / imgToSlide)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if(!doAutoSlidePaused && slideOn) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);
    return () => {
      if(interval) {
        clearInterval(interval);
      }
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
          { React.Children.map(children, (child, i) => {
            return React.cloneElement(child, { width: `${ 100 / imgOnScreen }%` });
          }
          ) }

        </div >
      </div>
      <i className='rightbtn fas fa-chevron-right' onClick={ () => updateIndex(activeIndex + 1) }></i>
    </div>
    // {/* <div className="buttons-slider">
    //     <button onClick={ () => updateIndex(activeIndex - 1) }>Prev</button>
    //     <button onClick={ () => updateIndex(activeIndex + 1) }>Next</button>

    //   </div> */}


  );
};
export default Slider;

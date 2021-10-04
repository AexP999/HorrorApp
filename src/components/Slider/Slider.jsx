import React, { useState, useEffect } from 'react';
import './Slider.css';


export const CarouselItem = ({ children, width }) => {
  return (
    <div className='carousel-item' style={ { width: width } }>
      { children }
    </div>
  );
};

const Slider = ({ children }) => {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ doAutoSlidePaused, setDoAutoSlidePaused ] = useState(false);

  const updateIndex = (newIndex) => {
    if(newIndex < 0) {
      newIndex = React.Children.count(children) - 1;

    } else if(newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if(!doAutoSlidePaused) {
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
    <div>
      <div className='carousel'
        onMouseEnter={ () => setDoAutoSlidePaused(true) }
        onMouseLeave={ () => setDoAutoSlidePaused(false) }
      >
        <i className='leftbtn fas fa-chevron-left' onClick={ () => updateIndex(activeIndex - 1) }></i>

        <div className="inner" style={ { transform: `translateX(-${ activeIndex * 50 }%)` } }
        >
          { React.Children.map(children, (child, i) => {
            return React.cloneElement(child, { width: "25%" });
          }
          ) }

        </div >
        <i className='rightbtn fas fa-chevron-right' onClick={ () => updateIndex(activeIndex + 1) }></i>
      </div>
    </div>
    // {/* <div className="buttons-slider">
    //     <button onClick={ () => updateIndex(activeIndex - 1) }>Prev</button>
    //     <button onClick={ () => updateIndex(activeIndex + 1) }>Next</button>

    //   </div> */}


  );
};
export default Slider;


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
      {/* <div className='carousel'
        onMouseEnter={ () => setDoAutoSlidePaused(true) }
        onMouseLeave={ () => setDoAutoSlidePaused(false) }
      >
        <div className="inner" style={ { transform: `translateX(-${ activeIndex * 50 }%)` } }>
          { React.Children.map(children, (child, i) => {
            return React.cloneElement(child, { width: "50%" });
          }
          ) }
        </div>
        <div className="buttons-slider">
          <button onClick={ () => updateIndex(activeIndex - 1) }>Prev</button>
          <button onClick={ () => updateIndex(activeIndex + 1) }>Next</button>

        </div>
      </div> */}
      <div className='carousel1'
        onMouseEnter={ () => setDoAutoSlidePaused(true) }
        onMouseLeave={ () => setDoAutoSlidePaused(false) }
      >
        <div className="inner1" style={ { transform: `translateX(-${ activeIndex * 15 }%)` } }>
          { React.Children.map(children, (child, i) => {
            return React.cloneElement(child, { width: "15%" });
          }
          ) }
        </div>
        <div className="buttons-slider1">
          <button onClick={ () => updateIndex(activeIndex - 1) }>Prev</button>
          <button onClick={ () => updateIndex(activeIndex + 1) }>Next</button>

        </div>
      </div>
    </div>
  );
};
export default Slider;


//   const [ activeIndex, setActiveIndex ] = useState(0);

//   // Хук Effect
//   useEffect(() => {
//     // Запускаем интервал
//     setInterval(() => {
//       // Меняем состояние
//       setActiveIndex((current) => {
//         // Вычисляем индекс следующего слайда, который должен вывестись
//         const res = current === img.length - 1 ? 0 : current + 1;
//         // Возвращаем индекс
//         return res;
//       });
//     }, 6000);
//     // Выключаем интервал
//     return () => clearInterval();
//   }, []);

//   // Вычисляем индекс предыдущего слайда
//   const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1;
//   // Вычисляем индекс следующего слайда
//   const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1;

//   return (
//     <div className="slider">
//       <div className="slider-img slider-img-prev"
//         key={ prevImgIndex }
//       >
//         { img[ prevImgIndex ] }
//       </div>
//       <div className="slider-img"
//         key={ activeIndex }
//       >
//         { img[ activeIndex ] }
//       </div>
//       <div className="slider-img slider-img-next"
//         key={ nextImgIndex }>
//         { img[ nextImgIndex ] }
//       </div>
//     </div>
//   );
// }

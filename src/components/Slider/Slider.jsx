
import React, { useState, useEffect } from 'react';
import './Slider.css';
import slide1 from "../img/slide1.jpg";
import slide2 from "../img/slide2.jpg";
import slide3 from "../img/slide3.jpg";
import slide4 from "../img/slide4.jpg";
import slide5 from "../img/slide5.jpg";


const img = [
  <img key={ 1 } src={ slide1 } alt='' />,
  <img key={ 2 } src={ slide2 } alt='' />,
  <img key={ 3 } src={ slide3 } alt='' />,
  <img key={ 4 } src={ slide4 } alt='' />,
  <img key={ 5 } src={ slide5 } alt='' />,
];

export function Slider () {
  const [ activeIndex, setActiveIndex ] = useState(0);

  // Хук Effect
  useEffect(() => {
    // Запускаем интервал
    setInterval(() => {
      // Меняем состояние
      setActiveIndex((current) => {
        // Вычисляем индекс следующего слайда, который должен вывестись
        const res = current === img.length - 1 ? 0 : current + 1;
        // Возвращаем индекс
        return res;
      });
    }, 3000);
    // Выключаем интервал
    return () => clearInterval();
  }, []);

  // Вычисляем индекс предыдущего слайда
  const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1;
  // Вычисляем индекс следующего слайда
  const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1;

  return (
    <div className="slider">
      <div className="slider-img slider-img-prev"
        key={ prevImgIndex }>
        { img[ prevImgIndex ] }
      </div>
      <div className="slider-img"
        key={ activeIndex }>
        { img[ activeIndex ] }
      </div>
      <div className="slider-img slider-img-next"
        key={ nextImgIndex }>
        { img[ nextImgIndex ] }
      </div>
    </div>
  );
}

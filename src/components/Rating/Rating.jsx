
import React from 'react';
import './Rating.css';

export default function StarRating ({ setRate, rate }) {

  return (
    <div className="stars-cont">
      <h3>Оцените фильм</h3>
      { [ ...Array(10) ].map((star, ind) => (
        <label key={ ind } >
          { (ind >= rate)
            ? <i onClick={ () => setRate(ind + 1) } className="far fa-star"></i>
            : <i onClick={ () => setRate(ind + 1) } className="fas fa-star"></i>
          }
        </label>
      ))
      }
    </div >
  );
}

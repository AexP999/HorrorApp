
import React from 'react';
import './Rating.css';

export default function StarRating ({ setRate, rate }) {

  return (
    <div className="stars-cont">
      <div style={ { margin: "auto" } }>
        <div className="rate-it">
          { [ ...Array(10) ].map((star, ind) => (
            <label key={ ind } >
              { (ind >= rate)
                ? <div onClick={ () => setRate(ind + 1) } className="star1">★</div>
                : <div onClick={ () => setRate(ind + 1) } className="star2">★</div>
              }
            </label>
          ))
          }

        </div >

        <div style={ { fontSize: "70%", color: "crimson" } }>
          { rate ? rate : 0 } of 10
        </div>
      </div>


    </div>
  );
}

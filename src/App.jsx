import React from 'react';
import './App.css';
import Slider from './components/Slider/Slider';
import { CarouselItem } from './components/Slider/Slider';

import slide1 from "./components/img/slide1.jpg";
import slide2 from "./components/img/slide2.jpg";
import slide3 from "./components/img/slide3.jpg";
import slide4 from "./components/img/slide4.jpg";
import slide5 from "./components/img/slide5.jpg";


const img = [
  <img src={ slide1 } alt='' />,
  <img src={ slide2 } alt='' />,
  <img src={ slide3 } alt='' />,
  <img src={ slide4 } alt='' />,
  <img src={ slide5 } alt='' />,
  <img src={ slide1 } alt='' />,
  <img src={ slide2 } alt='' />,
  <img src={ slide3 } alt='' />,
  <img src={ slide4 } alt='' />,
  <img src={ slide5 } alt='' />,
];

function App () {
  return (
    <div>
      <div className="App">
        {/* <Slider>
          { img.map((image, i) => {

            return <CarouselItem>{ image }</CarouselItem>;

          }) }

        </Slider> */}
      </div>
      <div className="App1">
        <Slider>
          { img.map((image, i) => {

            return <CarouselItem>{ image }</CarouselItem>;

          }) }

        </Slider>
      </div>

    </div>
  );
}

export default App;
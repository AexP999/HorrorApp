import React from 'react';
import './Home.css';

import Slider from '../Slider/Slider';
import MultiSlider from '../MultiSlider/MultiSlider';
// import Test from '../Test';


export default function Home (props) {




  return (
    <div className='Home'>

      <div className='Home-Body'>
        <Slider />
      </div>
      <main style={ { height: '100vh' } }>
        <MultiSlider />
        {/* <Test /> */ }
      </main>
    </div >


  );
}
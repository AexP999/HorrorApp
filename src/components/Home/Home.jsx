import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import Slider from '../Slider/Slider';
import MultiSlider from '../MultiSlider/MultiSlider';
import Test from '../Test';

export default function Home (props) {

  return (
    <div className='Home'>

      <Header
        userName='SomeUser'
        className='Home-Header'
      />
      <div className='Home-Body'>
        <Slider />
      </div>
      <main style={ { height: '100vh' } }>
        <MultiSlider />
        <Test />
      </main>
    </div >


  );
}
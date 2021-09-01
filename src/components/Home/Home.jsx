import React from 'react';


import './Home.css';
import Header from '../Header/Header';

export default function Home (props) {
  return (
    <div className='Home'>

      <Header
        userName='SomeUser'
        className='Home-Header'
      />
      <div className='Home-Body'>

      </div>


    </div>


  );
}
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, } from 'react';
import { PATHTO } from '../../constants/constants';
import FilmEditList from './FilmEditList';
// import { Link } from "react-router-dom";
import FilmPoster from './FilmPoster';
import './Films.css';

export default function Films ({ show }) {
  const [ films, setFilms ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ fetching, setFetching ] = useState(true);
  const [ maxNumberPages, setmaxNumberPages ] = useState(0);

  const url = `${ PATHTO.HOST_NAME }/films?page=${ currentPage + 1 }&limit=${ PATHTO.LIMIT }`;

  useEffect(() => {
    async function fetchData () {
      console.log('fetching');
      const response = await fetch(`${ url }`);
      const { result, totalPages } = await response.json();
      console.log('result', result, 'totalPages', totalPages);
      setFilms([ ...films, ...result ]);
      setCurrentPage(prev => prev + 1);
      setmaxNumberPages(totalPages);
      setFetching(false);

    }
    if(fetching) { fetchData(); };
  }, [ fetching ]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [ fetching ]);

  const scrollHandler = (e) => {

    if((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) && (currentPage < maxNumberPages)) {
      setFetching(true);
    };
  };

  console.log('films render', films);

  return (

    show === "poster"
      ? <FilmPoster films={ films } />
      : <FilmEditList films={ films } />

  );
}



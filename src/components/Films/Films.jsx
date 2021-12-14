/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, } from 'react';
import { PATHTO } from '../../constants/constants';
import FilmEditList from './FilmEditList';
import FilmPoster from './FilmPoster';
import { useHttpHook } from '../Hooks/api.hook';
import './Films.css';

export default function Films ({ show }) {
  const [ films, setFilms ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ fetching, setFetching ] = useState(true);
  const [ maxNumberPages, setmaxNumberPages ] = useState(0);
  const { api } = useHttpHook();

  const url = `${ PATHTO.HOST_NAME }/films?page=${ currentPage + 1 }&limit=${ PATHTO.LIMIT }`;

  useEffect(() => {
    async function fetchData () {

      const response = await api.get(`${ url }`);
      const { result, totalPages } = response.data;
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

  return (

    show === "poster"
      ? <FilmPoster films={ films } />
      : <FilmEditList films={ films } />

  );
}



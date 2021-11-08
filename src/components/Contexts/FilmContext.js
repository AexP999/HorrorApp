import { createContext, useEffect,useState,useCallback } from "react";
import { useFetchHook } from '../Hooks/fetch.hook'
import { PATHTO } from '../../constants/constants';

const FilmContext = createContext()
const FilmContextProvider = ({ children }) => {
  const [ films, setFilms ] = useState([]);

  const { request, loading } = useFetchHook();
  const [ userInfo, setUserInfo ] = useState({ userId: '', email: '', role: '', loggedIn: false, accessToken: '' });
  const url = `${ PATHTO.HOST_NAME }/films`;

  const fetchData = useCallback(async () => {
    try {
      const result = await request(url);
      setFilms(result);
    } catch(e) {
      console.log('Ошибка загрузки заданий', e);
    }
  }, [ request ,url]);

  useEffect(() => {
    fetchData();
  }, [ fetchData ]);
  console.log('CONTEXT PROVIDER');
  return <FilmContext.Provider value={
    { films, loading, userInfo, setUserInfo }
  }>
    { children }
  </FilmContext.Provider>;

};
export {FilmContextProvider,FilmContext }
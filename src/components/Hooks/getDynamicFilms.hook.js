import { useState } from "react";
import { useHttpHook } from "./api.hook";
import { PATHTO } from '../../constants/constants';
// import FilmsCard from "../FilmsCard/FilmsCard";

export const useDynamicFilmsDataHook = () => {
  const { api } = useHttpHook();
  const [ filmsData, setFilmsData ] = useState([]);
  const [ fetching, setFetching ] = useState(true);
  const [ maxNumberPages, setmaxNumberPages ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(0);

  
  // useEffect(() => {
    
  //   fetching && getFilmsDataFromDb() 
  // }, [ fetching ]);
  
  const getFilmsDataFromDb= async (elemReqQty,queryField)=> {
     const url = `${ PATHTO.HOST_NAME }/films?field=${queryField}&page=${ currentPage + 1 }&limit=${ elemReqQty }`;
      const response = await api.get(`${ url }`);
    const { result, totalPages } = response.data;
    
      // console.log('result', result[0].images[0], 'totalPages', totalPages);
      
     if(filmsData.length > elemReqQty * 2) {
        filmsData.splice(0, elemReqQty);
      }
     console.log('FILMS AFTER SPLICE', result);
     
      setFilmsData([ ...filmsData, ...result ]);
      setCurrentPage(prev => prev + 1);
      setmaxNumberPages(totalPages);
      setFetching(false);
      
    }

  console.log('maxNumberPages', maxNumberPages)
  console.log('currentPage',currentPage)
  console.log('filmsDataHOOK',filmsData)
  
  // const getFilmsDataFromDb = async () => {
  
  //   try {
  //     const res = await api.get(``)

  //     console.log('res.data',res.data)
  //     return
  //   } catch(err) {
  //      console.log(err);
  //   }
//  useEffect(() => {
//     document.addEventListener('scroll', scrollHandler);
//     return () => {
//       document.removeEventListener('scroll', scrollHandler);
//     };
//   }, [ fetching ]);

  // const scrollHandler = (e) => {

  //   if((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) && (currentPage < maxNumberPages)) {
  //     setFetching(true);
  //   };
  // };

  return {getFilmsDataFromDb,filmsData,fetching,setFetching}
}

import React, { useEffect, useState } from 'react';
import Admin from '../Admin/Admin';
import { useParams } from 'react-router-dom';
import { PATHTO } from '../../constants/constants';

function FilmEdit (props) {
    const { filmID } = useParams();
    console.log('filmID', filmID);
    const url = `${ PATHTO.HOST_NAME }/films/${ filmID }`;
    const [ filmById, setFilmById ] = useState(undefined);

    const fieldStringToObject=(obj, parentField, childField)=>{
     //transforms each field 'photo' to object like
    //   imageName:'', gets from base 
    //   sourceBase:'', creates path to image/photo
    //   sourceLocal:''}  for future work

        // if array means fields 'director'/'actors' or 'images' 
        if(Array.isArray(obj[parentField])){
          obj[parentField].forEach((element, index)=>{
            if ((typeof element === 'object') && childField in element){
              element[childField]={
                imageName:element[childField], 
                sourceBase:`${PATHTO.HOST_NAME}/${obj._id}/${PATHTO.ACTORS_PHOTO}/${element[childField]}`, 
                sourceLocal:''
              }
            } else {
              // 'images'
              obj[parentField][index]={
                imageName:obj[parentField][index], 
                sourceBase:`${PATHTO.HOST_NAME}/${obj._id}/${PATHTO.FRAMES}/${obj[parentField][index]}`, 
                sourceLocal:''
              }
            }
          })
        } else 
          // poster field
          obj[parentField]={
            imageName:obj[parentField], 
            sourceBase:`${PATHTO.HOST_NAME}/${obj._id}/${PATHTO.POSTER}/${obj[parentField]}`, 
            sourceLocal:''
          }
        return obj;
    }
    const filmFetch = async () => {
        const response = await fetch(url);
        const film = await response.json();
        if(film) {
          let tmpObj= fieldStringToObject(film,'poster', 'photo');
          tmpObj= fieldStringToObject(tmpObj,'actors', 'photo');
          tmpObj= fieldStringToObject(tmpObj,'director', 'photo');
          tmpObj= fieldStringToObject(tmpObj,'images', 'photo');
          setFilmById(tmpObj);
        }
    };

    useEffect(() => {
        filmFetch();
    }, []);
        
    return (
        <div>
            <Admin filmToEdit={ filmById } />
        </div>
    );
}

export default FilmEdit;
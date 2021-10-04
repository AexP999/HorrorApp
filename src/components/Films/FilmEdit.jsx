import React, {useEffect, useState} from 'react';
import Admin from '../Admin/Admin';
import {useParams} from 'react-router-dom';
import { PATHTO } from '../../constants/constants';

function FilmEdit(props) {
    const {filmID} = useParams();
    const url = `${ PATHTO.HOST_NAME }/films/${filmID}`;
    const [ filmById, setFilm ] = useState(undefined);

    const filmFetch= async ()=>{
        const response = await fetch(url);
        const film = await response.json();
        setFilm(film);
        
    }
    useEffect(()=>{
        filmFetch();
       
        
    },[]);

    if (filmById) {
        filmById.posterSrc=`${ PATHTO.HOST_NAME }/${filmID}/${PATHTO.POSTER}/${filmById.poster}`;
        filmById.actors.forEach(actor=>actor.photoSrc=`${ PATHTO.HOST_NAME }/${filmID}/${PATHTO.ACTORS_PHOTO}/${actor.photo}`);
        filmById.director.forEach(director=>director.photoSrc=`${ PATHTO.HOST_NAME }/${filmID}/${PATHTO.ACTORS_PHOTO}/${director.photo}`);
        filmById.imagesSrc=[];
        filmById.images.forEach(img=>filmById.imagesSrc.push(`${ PATHTO.HOST_NAME }/${filmID}/${PATHTO.FRAMES}/${img}`));
    }
    console.log(filmById);
    return (
        <div>   
            <Admin filmToEdit={filmById}/>
        </div>
    );
}

export default FilmEdit;
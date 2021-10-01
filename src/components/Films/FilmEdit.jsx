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
    },[])
    
    return (
        <div>   
            {<h3>{filmID}</h3>}
            {console.log('FilmEdit', filmById)}
            <Admin filmToEdit={filmById}/>
        </div>
    );
}

export default FilmEdit;
import React, { useState} from 'react';
// import FullPreview from '../Films/film-input-components/FullPreview';
import Preview from '../Films/film-input-components/Preview';
import FullPreview from '../Films/film-input-components/FullPreview';
import './FilmsCard.css';

function FilmsCardImageShow({imageSource}) {
    const [isModalActive, setIsModalActive] = useState(false);

    return (
        <div className='img-cont circle'>
            <img  onClick={()=>setIsModalActive(true)}  src={ imageSource } alt="" />
            <FullPreview 
                active={isModalActive} 
                setActive={setIsModalActive}
            >
                <img src={imageSource} alt={''}/>
            </FullPreview>
            {/* {isModalActive && <Preview preview={ imageSource}></Preview>} */}
        </div >
    );
}

export default FilmsCardImageShow;
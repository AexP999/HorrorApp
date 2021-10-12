import React from 'react';
import '../Admin.css';

function inputToUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function InputFileField({fieldName, images, onChangeFunction, multiple}) {
    let imagesArray=[];
    if (Array.isArray(images)) imagesArray = images;
    else imagesArray[0]=images;

    return (
        <>
        <div className='input-name'><span className='titles-width'>{inputToUpperCase(fieldName)}:</span></div>
        <div style={ { display: 'flex', alignItems: 'center' } }>
            <input
              onChange={(e)=>onChangeFunction(e)}
              type='file'
              name={fieldName}
              multiple={multiple}
            />
        {/* { imagesArray.map((image, index) => 
            <img id={`${fieldName}${index}`} className='image-preview' alt={ '' } />
        ) } */}
        {/* { !!(Array.isArray(imagesArray)=== false) && <img id={`${fieldName}0`} className='image-preview' alt={ '' } /> } */}
        </div>
        </>
    );
}

export default InputFileField;

// {/* <div className='input-name'><span className='titles-width'>Poster:</span>
//           </div>
//           <div style={ { display: 'flex', alignItems: 'center' } }>
//             <input
//               onChange={ addFiles }
//               type="file"
//               name='poster'
//               placeholder='film`s poster'
//             />
//             <img id={`poster0`} className='image-preview' alt={ 'poster' } /> 
//             {/* { filmsData.posterSrc && <img className='image-preview' src={ filmsData.posterSrc } alt={ filmsData.poster } /> }
//             <div>{ !!filesToSend.has('poster') && filesToSend.getAll('poster').map(el => <span key={ uuidv4() }>{ '| ' + el.name + ' |' }</span>) }</div> */}
//           </div> */}

// { !!filmsData.images && filmsData.images.map((image, index) => <img id={`images${index}`} className='image-preview' alt={ 'plug' } />) }
//               {/* { !!filmsData.imagesSrc && filmsData.imagesSrc.map((imageSrc, index) => <img key={uuidv4()} className='image-preview' src={ imageSrc } alt={ index } />) }
//             <div>{ !!filesToSend.has('images') && filesToSend.getAll('images').map(el => <span key={ uuidv4() }>{ '| ' + el.name + ' |' }</span>) }</div> */}
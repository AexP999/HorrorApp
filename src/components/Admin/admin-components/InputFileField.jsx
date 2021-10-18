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
        </div>
        </>
    );
}

export default InputFileField;
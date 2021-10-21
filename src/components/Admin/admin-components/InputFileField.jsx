import React, { useRef } from 'react';
import '../Admin.css';

function inputToUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function InputFileField({fieldName, images, onChangeFunction, multiple}) {
    const ref=useRef();

    let imagesArray=[];
    if (Array.isArray(images)) imagesArray = images;
    else imagesArray[0]=images;
    
    return (
        <>
        <div className='input-name'><span className='titles-width'>{inputToUpperCase(fieldName)}:</span></div>
        <div style={ { display: 'flex', alignItems: 'center' } }>
            <div>
                <input
                  ref={ref}
                  onChange={(e)=>onChangeFunction(fieldName, ref.current.files)}
                //   onChange={console.log('InputFileField', fieldName, ref  )}
                  type='file'
                  name={fieldName}
                  multiple={multiple}
                />
                <button onClick={(e)=>{ ref.current.value = null; onChangeFunction(fieldName, ref.current.files)}}>Reset</button>
            </div>
        </div>
        </>
    );
}

export default InputFileField;
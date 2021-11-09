import React, { useRef } from 'react';
import '../Admin.css';

function inputToUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function InputFileField({fieldName, index, images, onChangeFunction, multiple, showTitle}) {
    let ref= useRef();
    let imagesArray=[];
    if (Array.isArray(images)) imagesArray = images;
    else imagesArray[0]=images;
    // imagesArray = [{imageName:'', sourceBase:'', sourceLocal:''}]
    
    return (
        <>
        {showTitle && <div className='input-name'><span className='titles-width'>{inputToUpperCase(fieldName)}:</span></div>}
        <div style={ { display: 'flex', alignItems: 'center' } }>
            <div>
                <input
                  ref={ref}
                  onChange={(e)=>onChangeFunction(fieldName, e, index)}
                  type='file'
                  name={fieldName}
                  multiple={multiple}
                />
                <button onClick={(e)=>{
                    ref.current.value = null;
                    onChangeFunction(fieldName, e, index)}}
                >Reset</button>
            </div>
        </div>
        </>
    );
}

export default InputFileField;
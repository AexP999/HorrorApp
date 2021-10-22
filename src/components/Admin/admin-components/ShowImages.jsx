import React, { useState, useEffect } from 'react';
import '../Admin.css';
import Preview from './Preview';
import { v4 as uuidv4 } from 'uuid';


function ShowImages({fieldName, imageFiles}) {
    
    const [previewFile, setPreviewFile] = useState([]);
  
    useEffect(()=>{
        
        let filesArray=[];
        if(imageFiles){
            for(let [name, value] of imageFiles) {
              if(name === fieldName) filesArray.push(value);
            }
            setPreviewFile(filesArray);
        }
    },[imageFiles]);
  
    return (
            <div style={ { display: 'flex', alignItems: 'center'} }  >
                {previewFile && previewFile.map(file=> <Preview preview={file} key={uuidv4()}/>)}
            </div>
        );

}
export default React.memo(ShowImages);
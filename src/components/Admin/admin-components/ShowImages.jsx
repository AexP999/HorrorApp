import React, { useState, useEffect } from 'react';
import '../Admin.css';
import Preview from './Preview';
import { v4 as uuidv4 } from 'uuid';


function ShowImages({imageFiles}) {
    
    const [previewFile, setPreviewFile] = useState([]);
  
    useEffect(()=>{
        
        let filesArray=[];
        if(Array.isArray(imageFiles)) 
            imageFiles.forEach(item=>filesArray.push(item.sourceLocal))
        else 
            filesArray[0]=imageFiles.sourceLocal;
    
        setPreviewFile(filesArray);
    
    },[imageFiles]);
  
    return (
            <div style={ { display: 'flex', alignItems: 'center'} }  >
                {previewFile && previewFile.map(file=> <Preview preview={file}/>)}
            </div>
        );

}
export default React.memo(ShowImages);
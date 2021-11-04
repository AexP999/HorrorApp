import React, { useState, useEffect } from 'react';
import '../Admin.css';
import Preview from './Preview';

function ShowImages({imageFiles}) {
    
    const [previewData, setPreviewData] = useState([]);
  
    useEffect(()=>{
        
        let filesArray=[]
        let tmparr=[];
        
        if(!Array.isArray(imageFiles)) tmparr[0] = imageFiles;
        else tmparr = imageFiles;

        tmparr.forEach(item=>{
            if(item.sourceLocal)
                filesArray.push({image:item.sourceLocal, source:'local'})
            else
                filesArray.push({image:item.sourceBase, source:'server'})
        })
    
        setPreviewData(filesArray);
    },[imageFiles]);

    return (
            <div style={ { display: 'flex', alignItems: 'center'} }  >
                {previewData && previewData.map(item => (
                    <div>
                        <Preview preview={item.image}/>
                        <p>{!(item.image ==='') && (item.source)}</p>
                    </div>
                ))
                }
            </div>
        );

}
export default React.memo(ShowImages);
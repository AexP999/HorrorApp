/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FullPreview from './FullPreview';

function Preview({preview, extraClassName}) {
    
    const [source, setSource] = useState([]);
    const [isActive, setIsActive] = useState(false);
    useEffect(()=>{

        if(preview && source !== preview){
            if(typeof preview === 'string'){
                setSource(preview);
            } else{
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSource(reader.result);
                };
                reader.readAsDataURL(preview);
            }
        }
        return (()=>setSource([]))            
    },[preview]);
    
    return (
        <div>
            {source && 
                <img 
                    onClick={()=>setIsActive(true)} 
                    className= {!extraClassName ? 'image-preview' : extraClassName}
                    src={source} alt={''}
                    />
            }
            <FullPreview 
                active={isActive} 
                setActive={setIsActive}
            >
                <img src={source} alt={''}/>
            </FullPreview>
        </div>
    );
}

export default React.memo(Preview);
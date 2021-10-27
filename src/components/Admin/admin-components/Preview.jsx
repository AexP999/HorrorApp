import React, { useEffect, useState } from 'react';

function Preview({preview}) {
    
    const [source, setSource] = useState([]);
    useEffect(()=>{
        if(preview && source !== preview){
            const reader = new FileReader();
            reader.onloadend = () => {
                setSource(reader.result);
            };
            reader.readAsDataURL(preview);
        }
        return (()=>setSource([]))            
    },[preview]);
    
    return (
        <>
            {source && <img className='image-preview' src={source} alt={''}/>}
        </>
    );
}

export default Preview;
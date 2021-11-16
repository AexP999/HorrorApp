import React, { useEffect, useState } from 'react';

function Preview({preview}) {
    
    const [source, setSource] = useState([]);
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
        <>
            {source && <img className='image-preview' src={source} alt={''}/>}
        </>
    );
}

export default React.memo(Preview);
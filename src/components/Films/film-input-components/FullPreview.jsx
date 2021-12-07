import React from 'react';
import './FullPreview.css'
import '../../Modal.css'

function FullPreview({active, setActive, children}) {
    return (
        <div className={active ? "full-preview active": "full-preview"}>
            <div className={active ? "full-preview-content active": "full-preview-content"} onClick={()=>setActive(false)}>
                    {children && children}
            </div>
        </div>
    );
}

export default FullPreview;
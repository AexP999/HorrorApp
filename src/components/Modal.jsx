import React from 'react';
import Portal from './Portal';

import './Modal.css';


const Modal = ({ title, isOpen, onClose, children }) => {
  return (
    <>
      { isOpen &&
        <Portal>
          <div className="modal-overlay">
            <div className="modal-window">
              <div className="modal-header">
                <div onClick={ () => onClose() } className="cl-btn-2">
                  <div>
                    <div className="leftright"></div>
                    <div className="rightleft"></div>
                  </div>
                </div>

                <div className="modal-title">
                  { title }
                </div>
              </div>
              <div className="modal-body">
                { children }
              </div>
            </div>
          </div>
        </Portal> }
    </>
  );
};
export default Modal;
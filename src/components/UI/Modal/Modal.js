import React from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  return (
    <>
      <div
        className='modal'
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-150vh)',
          display: props.show ? 1 : 0,
        }}>
        {props.children}
      </div>
      <Backdrop clicked={props.closeModal} show={props.show} />
    </>
  );
};

export default Modal;

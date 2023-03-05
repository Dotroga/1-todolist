import React from 'react';
import cross from './../../Icons/delete.svg'

const DeleteButton = (props:{callBack: ()=>void}) => {
  return <>
      <img
        className='delete'
        onClick={()=>props.callBack()}
        src={cross} alt="x"/>
    </>
};

export default DeleteButton;
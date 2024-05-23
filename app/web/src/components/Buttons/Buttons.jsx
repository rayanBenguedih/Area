import React from 'react'

import './GenericButton.css';

export default function Buttons(props) {
  const style = props.style ? props.style : {};

  return (
    <button id={props.id} className='button generic-button-style' style={style} onClick={props.callback}>
        {props.text}
        {props.children}
    </button>
  )
}

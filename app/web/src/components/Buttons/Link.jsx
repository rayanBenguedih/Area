import React from 'react'

import './GenericButton.css';

export default function Link(props) {
    const target = props.target ? props.target : '_self';
    const style = props.style ? props.style : {};

    return (
        <a className='generic-button-style' href={props.href} target={target} style={style}>
            {props.children}
        </a>
    )
}

import React from 'react';
import AREALogo from '../../assets/logo.png';
import LogButtons from './LogButtons/LogButtons';
import ProfileButtons from './ProfileButtons/ProfileButtons';

import "./NavBar.css";

export default function NavBar(props) {
  const DynamicDisplay = () => {
    if (window.location.pathname !== "/" )
      return <ProfileButtons username={props.username}/>;
    else if (window.location.pathname === "/")
      return <LogButtons changeAuthFormState={props.changeAuthFormState}/>;
    else
      return <></>;
  };

  return (
    <div className='navbar'>
      <a href='/'>
        <img src={AREALogo} alt='AREA Logo'/>
      </a>
      <DynamicDisplay/>
    </div>
  )
}

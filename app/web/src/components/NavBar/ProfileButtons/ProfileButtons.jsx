import React from 'react'
import Buttons from '../../Buttons/Buttons'
import axios from 'axios';
import toast from 'react-hot-toast';

import './ProfileButtons.css'
import { useNavigate } from 'react-router-dom';

export default function ProfileButtons(props) {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  const logout = () => {
    axios.post("http://localhost:8080/api/auth/logout", {}, {withCredentials: true}).then(() => {
      toast.success("Succefully logout!");
      navigate("/");
    }).catch((err) => {
      console.log(err)
    })
  };

  const DynamicDisplay = () => {
    if (window.location.pathname === "/dashboard")
      return <Buttons text={"PROFILE"} callback={navigateToProfile} style={{marginRight: "1.5rem"}} />;
    else if (window.location.pathname === "/profile")
      return <Buttons text={"DASHBOARD"} callback={navigateToDashboard} style={{marginRight: "1.5rem"}} />;
    return <></>;
  };

  return (
    <div className='user-informations'>
        <div className='user-welcome'>
            <h2>Welcome</h2>
            <u>{props.username}</u>
        </div>
        <DynamicDisplay/>
        <Buttons text={"LOG OUT"} callback={logout} style={{marginRight: "1rem"}}/>
    </div>
  )
}

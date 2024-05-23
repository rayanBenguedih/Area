import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import Buttons from '../../../Buttons/Buttons'
import Link from '../../../Buttons/Link'
import GoogleLogo from "../../../../assets/services-logo/google/logo-google.png";

import "./SignupForm.css";

export default function SignupForm(props) {
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const signUpButton = () => {
    if (emailValue === "" || usernameValue === "" || passwordValue === "") {
      toast.error("One ore more fields are empty !");
      return;
    }

    axios.post("http://localhost:8080/api/auth/signup", {username: usernameValue, password: passwordValue, email: emailValue}, {withCredentials: true}).then(() => {
      toast.success("Successfully registered !");
      props.changeAuthFormState(null);
    }).catch(() => {
      toast.error("An error has occured");
    });
  };

  return (
    <>
      <div className='sign-up'>
        <h1><span>Signup</span> to your account</h1>

        <div className='form'>
          <input type="email" placeholder='Address Email' required onChange={(e) => {setEmailValue(e.target.value)}}></input>
          <input type="text" placeholder='Username' required onChange={(e) => {setUsernameValue(e.target.value)}}></input>
          <input type="password" placeholder='Password' required onChange={(e) => {setPasswordValue(e.target.value)}}></input>

          <div className='oauth-signup'>
            <Link href='http://localhost:8080/api/auth/google'>
              <img src={GoogleLogo} width="30px" alt='logo google' style={{verticalAlign: "bottom", marginRight: '1rem'}} />
              SIGN WITH GOOGLE
            </Link>
          </div>

          <div className='local-signup'>
            <Buttons text={"CONFIRM"} callback={signUpButton}/>
            <Buttons text={"CANCEL"} callback={props.changeAuthFormState}/>
          </div>
        </div>
      </div>
    </>
  )
}

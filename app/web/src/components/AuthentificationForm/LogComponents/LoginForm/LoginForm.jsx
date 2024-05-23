import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import Buttons from '../../../Buttons/Buttons';
import Link from '../../../Buttons/Link';

import GoogleLogo from "../../../../assets/services-logo/google/logo-google.png";
import './LoginForm.css';

export default function LoginForm(props) {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const createAccount = () => {
    if (usernameValue === "" || passwordValue === "") {
      toast.error("One ore more fields are empty !");
      return;
    }

    axios.post("http://localhost:8080/api/auth/login", {username: usernameValue, password: passwordValue}, {withCredentials: true}).then(() => {
      toast.success("Succefully logged in !");
      navigate("/dashboard");
    }, (res) => {
      if (res.response.status === 401)
        toast.error("Wrong username or password");
      else
        toast.error("An error has occured");
    }).catch(() => {
      toast.error("An error has occured");
    });
  };

  return (
    <>
      <div className='log-in'>
          <h1><span>Login</span> to your account</h1>

          <div className='form'>
            <input type="text" name='username' placeholder='Username' required onChange={(e) => {setUsernameValue(e.target.value)}}></input>
            <input type="password" name="password" placeholder='Password' required onChange={(e) => {setPasswordValue(e.target.value)}}></input>

            <div className='oauth-signin'>
              <Link href='http://localhost:8080/api/auth/google'>
                <img src={GoogleLogo} width="30px" alt="logo google" style={{verticalAlign: "bottom", marginRight: '1rem'}} />
                SIGN WITH GOOGLE
              </Link>
            </div>

            <div className='local-signin'>
              <Buttons text={"LOGIN"} callback={createAccount}/>
              <Buttons text={"CANCEL"} callback={props.changeAuthFormState}/>
            </div>
          </div>
      </div>
    </>
  )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import Link from '../../components/Buttons/Link';
import DiscordLogo from '../../assets/services-logo/discord/logo-discord.png';
import TwitchLogo from '../../assets/services-logo/twitch/logo-twitch.png';

import "./UserProfile.css"

export default function UserProfile() {
  const navigate = useNavigate();
  const [userInfos, setUserInfos] = useState({});
  const [userAreasNumber, setUserAreasNumber] = useState(0);

  useEffect(() => {
    axios.post("http://localhost:8080/api/auth/islogin", {}, {withCredentials: true}).then((res) => {
      if (res.status === 200 || res.status === 302)
        setUserInfos(res.data.user);
    }).catch((err) => {
      if (err.response.status === 401) {
        toast.error("You're not logged in !");
        navigate("/");
      }
    });

    axios.get("http://localhost:8080/api/areas/", {withCredentials: true}).then((res) => {
      if (res.data)
        setUserAreasNumber(res.data.length);
    }).catch((err) => {
      toast.error(err);
    });
  }, [navigate]);

  return (
    <div className='userprofile'>
      <NavBar username={userInfos.username}/>

      <div className="container">
        <div className="content">
          <div className="profile-part">
            <div className="user-info">
              <p><b>Username : </b>{userInfos.username}</p>
            </div>
            <div className="user-info">
              <p><b>Email : </b>{userInfos.email}</p>
            </div>
            <div className="user-info">
              <p><b>Number of AREA : </b>{userAreasNumber}</p>
            </div>
          </div>
          <hr/>
          <div className="oauth-part">
            <Link href={"https://discord.com/api/oauth2/authorize?client_id=1028960882899828746&permissions=139586500672&scope=bot"} target={'_blank'}>
              <img src={DiscordLogo} width="40px" alt="logo discord" style={{verticalAlign: "middle", marginRight: '1rem'}} />
              INVITE DISCORD BOT
            </Link>

            <Link href={"http://localhost:8080/api/auth/discord"}>
              <img src={DiscordLogo} width="40px" alt="logo discord" style={{verticalAlign: "middle", marginRight: '1rem'}} />
              SIGN WITH DISCORD
            </Link>

            <Link href={"http://localhost:8080/api/auth/twitch"}>
              <img src={TwitchLogo} width="20px" alt="logo twitch" style={{verticalAlign: "bottom", marginRight: '1rem'}} />
              SIGN WITH TWITCH
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

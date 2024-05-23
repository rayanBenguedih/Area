import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import AuthentificationForm from '../../components/AuthentificationForm/AuthentificationForm';

import "./Home.css";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);
  const [authFormId, setAuthFormId] = useState("");

  const hideAuthForm = () => {
    setIsAuthFormOpen(false);
  };

  useEffect(() => {
    axios.post("http://localhost:8080/api/auth/islogin", {}, {withCredentials: true}).then((res) => {
      if (res.status === 200) {
        navigate("/dashboard");
      }
    }).catch((err) => {
      if (err.response.status !== 401) {
        toast.error("An error occured");
      }
    });
  }, [navigate]);


  const changeAuthFormState = (e) => {

    setIsAuthFormOpen(!isAuthFormOpen);
    if (e !== null)
      setAuthFormId(e.target.id);
  };

  const downloadTxtFile = () => {
    fetch('main.apk').then(response => {
        response.blob().then(blob => {
            const fileURL = window.URL.createObjectURL(blob);
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'main.apk';
            alink.click();
        })
    })
}
  return (
    <div className='home'>
      <NavBar changeAuthFormState={changeAuthFormState}/>

      <AuthentificationForm isAuthFormOpen={isAuthFormOpen} authFormId={authFormId} changeAuthFormState={changeAuthFormState} hideAuthForm={hideAuthForm} />

      <div className='content'>
        <h1>« Create your own world »</h1>
        <h2>Interconnect services and build your personnal Action-Reaction environment</h2>

        <ol className='flex-grid'>
          <li>Login or signup to AREA website</li>
          <li>Link one or more service(s) (Twitch, Disord, etc) to your AREA account</li>
          <li>Create an AREA component by pressing "Create an AREA" button</li>
          <li>Choose a service and an event in "Action" section. This will trigger the Reaction when the condition is met</li>
          <li>Choose a service and an reaction in "Reaction" section that will be triggered by selected Action</li>
          <li>Wait until your selected Action is triggered and admire the result</li>
        </ol>
        <div className="btnDiv">
     <button id="downloadBtn" onClick={downloadTxtFile} value="download">Download</button>
</div>
      </div>

      <Footer/>
    </div>
  )
}

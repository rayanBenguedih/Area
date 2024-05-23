import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import AREAForm from '../../components/AREAComponents/AREAForm/AREAForm';

import Buttons from '../../components/Buttons/Buttons';
import AREAItem from '../../components/AREAComponents/AREAItem/AREAItem';
import NavBar from '../../components/NavBar/NavBar';

import "./Dashboard.css"

export default function Dashboard() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [areaList, setAreaList] = useState([]);
  const [updateAreaList, setUpdateAreaList] = useState(false);
  const [displayAreaCreator, setDisplayAreaCreator] = useState(false);

  useEffect(() => {
    axios.post("http://localhost:8080/api/auth/islogin", {}, {withCredentials: true}).then((res) => {
      if (res.status === 200 || res.status === 302)
        setUsername(res.data.user.username);
    }).catch((err) => {
      if (err.response.status === 401) {
        toast.error("You're not logged in!");
        navigate("/");
      }
    });
  }, [navigate]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/areas/", {withCredentials: true}).then((res) => {
      if (res.data)
        setAreaList(res.data);
    }).catch((err) => {
      toast.error(err);
    });
  }, [updateAreaList]);


  const showAreaCreator = () => {
    setDisplayAreaCreator(true);
  }

  const hideAreaCreator = () => {
    setDisplayAreaCreator(false);
  }

  const deleteArea = (e) => {
    const area = e.target.closest('.area-item');
    const id = area.dataset.areaid;

    axios.delete(`http://localhost:8080/api/areas/${id}`, {withCredentials: true}).then(() => {
      toast.success('Area deleted !')
      setUpdateAreaList(!updateAreaList);
    }).catch(() => {
      toast.error("An error has occured");
    });
  };

  const areasItems = areaList.map(el => <AREAItem key={el.id} data={el} deleteFunction={deleteArea} />);

  const DynamicDisplay = () => {
    if (areasItems.length !== 0)
      return (
        <div className='container'>
          <div className="areas-list">
            {areasItems}
          </div>
          <Buttons id="btn-create-area" callback={showAreaCreator}>
            CREATE AN AREA
          </Buttons>
        </div>
      );
    else
      return (
        <div className='container' style={{height:"100%"}}>
          <div className='empty-areas-list'>
            <p>You don't have any AREA.</p>
            <Buttons callback={showAreaCreator}>
              CREATE AN AREA
            </Buttons>
          </div>
        </div>
      );
  };

  return (
    <div className='dashboard'>
      <NavBar username={username}/>

      <DynamicDisplay/>

      <AREAForm setUpdateAreaList={setUpdateAreaList} updateAreaList={updateAreaList} displayAreaCreator={displayAreaCreator} hideAreaCreator={hideAreaCreator} />

      <Buttons callback={() => {}} text={"DOWNLOAD APK"} style={{width: "170px", position: "fixed", bottom: "2rem", right: "2rem"}}>

      </Buttons>
    </div>
  )
}

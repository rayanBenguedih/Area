import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Select  from 'react-select';

import Buttons from '../../Buttons/Buttons';

import './AREAForm.css';

export default function AREAForm(props) {
    const [areaName, setAreaName] = useState("");

    const [actionServiceName, setActionServiceName] = useState("");
    const [actionName, setActionName] = useState("");
    const [reactionServiceName, setReactionServiceName] = useState("");
    const [reactionName, setReactionName] = useState("");

    const [servicesList, setServicesList] = useState([]);
    const [servicesOptions, setServicesOptions] = useState([]);
    const [actionsOptions, setActionsOptions] = useState([]);
    const [reactionsOptions, setReactionsOptions] = useState([]);
    const [actionSelectIsDisabled, setActionSelectIsDisabled] = useState(true);
    const [reactionSelectIsDisabled, setReactionSelectIsDisabled] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/services/`, {withCredentials: true}).then((res) => {
            if (!res.data) {
                toast.error("An error has occured");
                return;
            }
            setServicesList(res.data);
            setServicesOptions(processServicesOptions(res.data));
        }).catch(() => {
            toast.error("An error has occured");
        });
    }, []);

    const processServicesOptions = (list) => {
        let options = [];
        for (let el of list)
            options.push({ value: el.name, label: el.name.charAt(0).toUpperCase() + el.name.slice(1) });
        return options;
    };

    const processOptions = (value, type) => {
        let options = [];
        let serviceEl;
        for (let el of servicesList) {
            if (el.name === value)
                serviceEl = el;
        }
        for (let el of (type === "action") ? serviceEl.actions : serviceEl.reactions)
            options.push({ value: el, label: el});
        if (type === "action") {
            setActionServiceName(value);
            setActionsOptions(options);
            setActionSelectIsDisabled(false);
        } else {
            setReactionServiceName(value);
            setReactionsOptions(options);
            setReactionSelectIsDisabled(false);
        }
    };

    const clickOnBackground = (e) => {
        if (e.target.className === 'form-bg')
            props.hideAreaCreator();
    };

    const createArea = () => {
        if (areaName === "")
            return toast.error("AREA name is empty !");
        if (actionServiceName === "" || actionName === "" || reactionServiceName === "" || reactionName === "")
            return toast.error("One or more field(s) are empty !");
        axios.post("http://localhost:8080/api/areas/", {
            areaName: areaName,
            actionService: actionServiceName,
            actionLabel: actionName,
            reactionService: reactionServiceName,
            reactionLabel: reactionName,
        }).then(() => {
            toast.success("AREA created");
            props.setUpdateAreaList(!props.updateAreaList);
            props.hideAreaCreator();
        }).catch(() => {
            toast.error("An error has occured");
        });
    };

    const dynamicStyle = (props.displayAreaCreator) ? {opacity: 1, visibility: 'visible'} : {opacity: 0, visibility: 'hidden'};

    return (
        <div className='form-bg' style={dynamicStyle} onClick={clickOnBackground}>
            <div className='AREA-form'>
                <h1><span>CREATE</span> YOUR AREA</h1>
                <div className='area-name'>
                    <h2>Name your AREA :</h2>
                    <input value={areaName} onChange={(e) => {setAreaName(e.target.value)}} type={"text"} ></input>
                </div>
                <div className='all-form-select'>
                    <div className='select-part' style={{display: "flex", flexDirection: "column"}}>
                        <h2>SERVICE</h2>
                        <Select options={servicesOptions} onChange={(choice) => {processOptions(choice.value, "action")}} placeholder={"Choose a service"} isSearchable={false}/>
                    </div>
                    <div className='select-part' style={{display: "flex", flexDirection: "column"}}>
                        <h2>ACTION</h2>
                        <Select options={actionsOptions} onChange={(choice) => {setActionName(choice.value)}} placeholder={"Choose an action"} isSearchable={false} isDisabled={actionSelectIsDisabled}/>
                    </div>
                    <div className='select-part' style={{display: "flex", flexDirection: "column"}}>
                        <h2>SERVICE</h2>
                        <Select options={servicesOptions} onChange={(choice) => {processOptions(choice.value, "reaction")}} placeholder={"Choose a service"} isSearchable={false}/>
                    </div>
                    <div className='select-part' style={{display: "flex", flexDirection: "column"}}>
                        <h2>REACTION</h2>
                        <Select options={reactionsOptions} onChange={(choice) => {setReactionName(choice.value)}} placeholder={"Choose a reaction"} isSearchable={false} isDisabled={reactionSelectIsDisabled}/>
                    </div>
                </div>
            <div className='area-form-buttons'>
                <Buttons text="CREATE" style={{width: "100px", height: "50px", margin: "20px"}} callback={createArea} />
                <Buttons callback={props.hideAreaCreator} text="CANCEL" style={{width: "100px", height: "50px", margin: "20px"}} />
            </div>
            </div>
        </div>
  )
}

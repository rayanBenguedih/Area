import React from 'react';

import DiscordLogo from "../../../assets/services-logo/discord/logo-discord.png";
import TwitchLogo from "../../../assets/services-logo/twitch/logo-twitch.png";
import ArrowImg from "../../../assets/arrow.png";

import './AREAItem.css';

export default function AREAItem({data, deleteFunction}) {
    const toggleAreaDropDown = (e) => {
        const content = e.target.closest('.area-item').querySelector('.dropdown-container');
        if (content.style.maxHeight)
            content.style.maxHeight = null;
        else
            content.style.maxHeight = content.scrollHeight + "px";
    };

    const DynamicLogo = (props) => {
        if (data[props.type] === 'discord')
            return <img src={DiscordLogo} width={40} alt="Discord Logo"/>
        else
            return <img src={TwitchLogo} width={20} style={{marginRight: '0.5rem'}}  alt="Twitch Logo"/>
    };

    return (
        <div className='area-item' data-areaid={data.id}>
            <div className='label'>
                <b>{data.areaName}</b>
                <div className="interaction">
                    <button className='btn-delete' onClick={deleteFunction}>X</button>
                    <button className='btn-dropdown' onClick={toggleAreaDropDown}>V</button>
                </div>
            </div>
            <div className="dropdown-container">
                <div className="dropdown-content">
                    <div className="area-info">
                        <div className="area-service">
                            <DynamicLogo type={'actionService'}/>
                            {/* <img src={DiscordLogo} width={40} alt="Discord Logo"/> */}
                            <p>{data.actionService.charAt(0).toUpperCase() + data.actionService.slice(1)}</p>
                        </div>
                        <div className="area-label">
                            {data.actionLabel}
                        </div>
                    </div>
                    <img className='area-sep-arrow' src={ArrowImg} width={60} alt="arrow img" />
                    <div className="area-info">
                        <div className="area-service">
                            <DynamicLogo type={'reactionService'}/>
                            <p>{data.reactionService.charAt(0).toUpperCase() + data.reactionService.slice(1)}</p>
                        </div>
                        <div className="area-label">
                            {data.reactionLabel}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

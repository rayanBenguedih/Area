import React from 'react';

import LoginForm from './LogComponents/LoginForm/LoginForm';
import SignupForm from './LogComponents/SignupForm/SignupForm';
import "./AuthentificationForm.css";

export default function AuthentificationForm(props) {
    const DynamicForm = (authFormId) => {
        if (authFormId.id === "authform-login-btn")
            return <LoginForm changeAuthFormState={props.changeAuthFormState}/>;
        else if (authFormId.id === "authform-signup-btn")
            return <SignupForm changeAuthFormState={props.changeAuthFormState}/>;
        else
            return <></>;
    };

    const clickOnBackground = (e) => {
        if (e.target.className === 'form-bg')
            props.hideAuthForm();
    };

    const dynamicStyle = (props.isAuthFormOpen) ? {opacity: 1, visibility: 'visible'} : {opacity: 0, visibility: 'hidden'};

    return (
    <>
        <div className='form-bg' style={dynamicStyle} onClick={clickOnBackground}>
            <DynamicForm id={props.authFormId}/>
        </div>
    </>
    )
}

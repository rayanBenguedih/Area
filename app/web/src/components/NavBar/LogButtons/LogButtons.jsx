import React from 'react'
import Buttons from '../../Buttons/Buttons'

export default function LogButtons(props) {
  return (
    <div className='user-connection'>
        <Buttons id={"authform-login-btn"} text={"LOG IN"} callback={props.changeAuthFormState.bind(this)}/>
        <Buttons id={"authform-signup-btn"} text={"SIGN UP"} callback={props.changeAuthFormState.bind(this)}/>
    </div>
  )
}

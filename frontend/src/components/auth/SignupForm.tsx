import { ChangeEvent, useState } from 'react'
import './signupForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './authSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router'

const SigninForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
  const onPasswordChanged = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
  const loginResponse = useSelector((state:any) => state.auth.loginUser)

  async function sendDetails(){
    const response = await dispatch(loginUser({username,password}))
    console.log(response,"dfgfggfg")
    if(response.meta.requestStatus == 'fulfilled'){
      navigate("/welcome")
      window.localStorage.setItem('isLoggedIn',"true")
    }
  }
  return (
    <div onKeyDown={sendDetails} className='login-form__container'>
        <div className="login-form__left">
            <div className="login-form">
                <h1>Welcome to your Professional Community</h1>
                <input type="text"  placeholder='Email or Phone number' onChange={onEmailChanged}/>
                <input type="password"  placeholder='Password' onChange={onPasswordChanged}/>
                <p>Forgot password?</p>
                <button style={{cursor: "pointer"}} onClick={sendDetails}>Sign in</button>
            </div>
        </div>
        <div className="login-form__right">
        
        </div>
    </div>
  )
}

export default SigninForm
import { useState,  FormEvent, ChangeEvent, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useDispatch } from 'react-redux'

import './userRegisterForm.css'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { createNewUser } from './authSlice'


const UserRegisterForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
  
  const userNameRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [userFocus, setUserFocus] = useState<boolean>(true)
  
  const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onPasswordChanged = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const canSave = [email, password].every(Boolean)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(()=> {
    const result = emailRegex.test(email)
    setValidEmail(result)
    if(password.length >= 6) setValidPassword(true)
  },[email,userFocus,password])

  async function  handleUser (e: FormEvent){
    e.preventDefault()
  
    if(canSave){
      try{
        
        const response = await dispatch(createNewUser({email, password}))
        console.log(response,"reponse new user created")
        if(response.payload.duplicate){
          alert("duplicate user")
        }else if(response.meta.requestStatus == 'fulfilled'){
          navigate('/welcome')
          localStorage.setItem('userID',response.payload.message.user_id)
          window.localStorage.setItem('isLoggedIn',"true")
        }

      } catch(err){
        console.log('failed to add user', err)
      }
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='register-form__container'>
      <h1>Make the most of the professional life</h1>
      <div className="register-form">
          <label htmlFor="username">Email or phone number</label>
          <input 
            ref = {userNameRef}
            type="text" 
            name='username'
            value={email}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            onChange={onEmailChanged}  
          />
          <p className={ (!userFocus && !validEmail) ? "username_show" : "username_hide"}>Please enter a valid email address or mobile number.</p>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name='password'
            value={password}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            onChange={onPasswordChanged}  
          />
          <p className={ (!userFocus && !validPassword) ? "username_show" : "username_hide"}>Password must be 6 characters or more.</p>
          <p>By clicking Agree & Join, you agree to the LinkedIn User Agreement, 
            Privacy Policy, and Cookie Policy.</p>
          <button onClick={handleUser}>Agree & join</button>
      </div>
    </div>
  )
}

export default UserRegisterForm
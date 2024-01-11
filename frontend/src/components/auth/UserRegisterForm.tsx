import { useState,  FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router'

import { useDispatch } from 'react-redux'

import './userRegisterForm.css'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { createNewUser } from './authSlice'


const UserRegisterForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<any,any,any>>()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onPasswordChanged = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const canSave = [email, password].every(Boolean)

  async function  handleUser (e: FormEvent){
    e.preventDefault()
  
    if(canSave){
      try{
        
        const response = await dispatch(createNewUser({email, password}))
        if(response.payload.duplicate){
          alert("duplicate user")
        }else if(response.meta.requestStatus == 'fulfilled'){
          navigate('/welcome')
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
            type="text" 
            name='username'
            value={email}
            onChange={onEmailChanged}  
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name='password'
            value={password}
            onChange={onPasswordChanged}  
          />
          <p>By clicking Agree & Join, you agree to the LinkedIn User Agreement, 
            Privacy Policy, and Cookie Policy.</p>
          <button onClick={handleUser}>Agree & join</button>
      </div>
    </div>
  )
}

export default UserRegisterForm
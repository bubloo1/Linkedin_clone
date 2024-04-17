import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './signinForm.css'
import { useState } from 'react'
import { loginUser } from './authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

const SigninForm = () => {
    const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
    const [username,setUsername] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const logindata = useSelector((state:any) => state.auth.loginUser)
    const logindataStatus = useSelector((state:any) => state.auth.statusLogin)
    const navigate = useNavigate()

   async function userLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const canSave = [username,password].every(Boolean)
     
     
        if(canSave){
            await dispatch(loginUser({username,password}))
            console.log(logindata,"logindata")
            setTimeout(() => {
                if(logindataStatus == "fulfilled" || logindata.message == 'Login successful'){
                    navigate('/welcome')
                }
                else{
                    alert("invalid credentials")
                }
            }, 600);
        }else{
            alert("Enter username and password")
        }
        
    }
  return (
    <div className="signin_container">
        <div className="logo_container">
            <div className="signin_logo">
                <p className='signin_linkedin_icon'>Linked</p>
                <FontAwesomeIcon className='signin_linkedin__icon' icon={faLinkedin}/>
            </div>
        </div>
        <div className="signin_form">
            <form onSubmit={userLogin}>
                <h2>Sign in</h2>
                <p className='tagline'>Stay updated on your professional world</p>
                <input value={username} 
                    onChange={(e)=> setUsername(e.target.value)} 
                    type="text" placeholder='Email or phone' />
                <input value={password} 
                    onChange={(e)=> setPassword(e.target.value)} 
                    type="password" placeholder='password' />
                <p className='forgot_password'>Forgot password</p>
                <button className='signin_btn'>Signin</button>
            </form>
        </div>
    </div>
  )
}

export default SigninForm
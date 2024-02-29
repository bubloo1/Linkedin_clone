
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Profile from '../assets/user-solid.svg'
import './homePageNavbar.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


const HomePageNavbar = () => {
  const navigate = useNavigate()
  const [showProfileBox, setShowProfileBox] = useState<boolean>(false)
  // useEffect(()=>{
  //   document.addEventListener('mousedown', openProfileBox);
  // })
  function openProfileBox (){
    setShowProfileBox(prev => !prev)
    console.log(showProfileBox,"showProfileBox")
  }
  function userLogout (){
    navigate('/')
    window.localStorage.removeItem('isLoggedIn')
    console.log("in logout")
  }
  return (
    <>
    <div className='homepage-navbar'>
      <div className="homepage-navbar__container">
        <div className="homepage-left">
          <FontAwesomeIcon className='home-linkedin__icon' icon={faLinkedin}/>
          <input type='text'/>
        </div>
        <div className="homepage-right">
          <div className="homepage-icon">
            <Link to='/welcome'><FontAwesomeIcon className='home-icon' icon={faHouse}/></Link>
            <p>Home</p>
          </div>
          <div className="homepage-icon">
            <FontAwesomeIcon className='home-icon' icon={faUserGroup}/>
            <p>My Network</p>
          </div>
          <div className="homepage-icon">
            <FontAwesomeIcon className='home-icon' icon={faSuitcase}/>
            <p>jobs</p>
          </div>
          <div className="homepage-icon">
            <Link to="/chat"><FontAwesomeIcon className='home-icon' style={{color:"black"}} icon={faMessage}/></Link>
            <p>Messaging</p>
          </div>
          <div className="homepage-icon">
            <FontAwesomeIcon className='home-icon' icon={faBell}/>
            <p>Notification</p>
          </div>
          <div className="homepage-icon" onClick={openProfileBox}>
             <img src={Profile} alt="" />
             {/* <Link to="/profile"><img src={Profile} alt="" /></Link> */}
            <p>ME</p>
          </div>
          <div className='profile_box' style={showProfileBox ? {display:"block"} : {display:"none"}}>
              <p onClick={()=> navigate('/profile')}>Profile</p><br />
              <p onClick={userLogout}>Logout</p>
          </div>
        </div>
      </div>
    </div>
      <Outlet/>
    </>
  )
}  

export default HomePageNavbar
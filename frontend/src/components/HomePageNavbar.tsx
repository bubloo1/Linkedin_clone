
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
import { useState } from 'react'


const HomePageNavbar = ({count}:any) => {
 
  const navigate = useNavigate()
  const [showProfileBox, setShowProfileBox] = useState<boolean>(false)
  const [showNotification, setShowNotification] = useState<boolean>(false)

  function handleNotification (){
    setShowNotification((prev)=> !prev)
    navigate('/notification')
  }

  function openProfileBox (){
    setShowProfileBox(prev => !prev)
    console.log(showProfileBox,"showProfileBox")
  }
  function userLogout (){
    navigate('/')
    window.localStorage.removeItem('isLoggedIn')
    window.localStorage.removeItem('userID')
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
            <Link to='/welcome'><FontAwesomeIcon className='home-icon' style={{color:"black"}} icon={faHouse}/></Link>
            <p>Home</p>
          </div>
          <div className="homepage-icon" style={{ position: 'relative' }} onClick={()=> navigate('/network')}>
            <FontAwesomeIcon className='home-icon' icon={faUserGroup}/>
            {count > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '2px',
                  backgroundColor: 'red',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
              {count}
            </div>
      )}
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
          <div onClick={handleNotification} className="homepage-icon" >
            <FontAwesomeIcon className='home-icon' icon={faBell}/>
           
            <p>Notification</p>
           
          </div>
          {/* <div className={showNotification ? "show_notification" : "dont_show_notification"}> */}

{/* </div> */}
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
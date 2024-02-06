
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons' // to get brand icons i have installed this package
import { faCompass } from '@fortawesome/free-regular-svg-icons'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { Link} from 'react-router-dom'
import './loginNavbar.css'

const LoginNavbar = () => {
  return (
    <nav>
        <div className="login-nav__container">
            <div className="login-nav__left">
                <p>Linked</p>
                <FontAwesomeIcon className='linkedin-icon' icon={faLinkedin} fontSize={36}/>
            </div>
            <div className="login-nav__right">
               <div className="login-nav__icons">
                    <div className="nav-icon">
                        <FontAwesomeIcon icon={faCompass}/>
                        <p>Discover</p>
                    </div>
                    <div className="nav-icon">
                        <FontAwesomeIcon icon={faUserGroup}/>
                        <p>People</p>
                    </div>
                    <div className="nav-icon">
                        <FontAwesomeIcon icon={faCirclePlay}/>
                        <p>Learning</p>
                    </div>
                    <div className="nav-icon">
                        <FontAwesomeIcon icon={faSuitcase}/>
                        <p>Jobs</p>
                    </div>
               </div>
                <div className="login-nav__buttons">
                <Link to="/register"><button className='join'>Join now</button></Link>
                <Link to="/signin"><button className='signin'>Sign in</button></Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default LoginNavbar



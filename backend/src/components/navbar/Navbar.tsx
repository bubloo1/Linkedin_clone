import { DiCssdeck } from 'react-icons/di';
import { FiMenu } from 'react-icons/fi'; 
import { FiMoon } from 'react-icons/fi';
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';
import './Navbar.css'

function Navbar() {
   
    const [menu, setMenu] = useState(false);
    
    function changeMenu():void {
      setMenu(!menu)
      console.log(menu,"hasClicked")
    }
 
  return (
    <nav className='navbar'>
        <div className='navbar_name'>
            <DiCssdeck className="DiCssdeck" />
            <h2><span style={{color:"red",marginRight:"5px"}}>Shaik</span><span>Allabaksh</span></h2>
        </div>
        <div className='navbar_menu'>
          <div className= {`${menu ? "show" : 'menu'}`}>
            <li>
                <a href="">Home</a>
                <a href="">About</a>
                <a href="">Experience</a>
                <a href="">skills</a>
               
            </li>
          </div>
            <FiMenu className="menu_icon" style={{
                    height:"50px",
                    width:"50px",
                    padding: "10px",
                    cursor:"pointer"}} onClick={() => changeMenu()}/>

            <AiOutlineClose className= {`${menu ? "show_close_icon" : "close_icon"}`} size={32} onClick={() => changeMenu()}/>
          
            <FiMoon size={32} className="moon_icon"/>
           
        </div>
    </nav>
  )
}

export default Navbar
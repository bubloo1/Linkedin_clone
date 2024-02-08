import { faPencil } from '@fortawesome/free-solid-svg-icons'
import './profileCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import ProfileForm from './ProfileForm'
import Profile from '../../assets/user-solid.svg'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { uploadProfileImage } from './profileSlice'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'

const ProfileCard = () => {
    const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
    const [showForm,setShowForm] = useState<boolean>(false)
    const [profileImage, setProfileImage] = useState<any>(null)
    const fileInpurRef = useRef<any>(null)
    function handleForm (){
        showForm ? setShowForm(false) :  setShowForm(true)
    }
    function handleImageUploadClick(){
        fileInpurRef.current.click()
        console.log("in click")
    }
    function handleImageUpload(e: any){
        e.preventDefault()
        const profileImage = e.target.files[0]
        setProfileImage(URL.createObjectURL(profileImage))
        const formData = new FormData()
        formData.append("profile_image",profileImage)
        dispatch(uploadProfileImage(formData))
        
    }
  return (
    <div className="profile_container">
        <div className="top">
            <img src="" alt="" />
        </div>
        <div className="bottom">

            <div className="profile_img_popup">
                <div className="profile_img_popup_top">
                    <p style={{color: "white"}}>Profile photo</p>
                    <FontAwesomeIcon icon={faXmark} className='popup_cancel' style={{color: "white"}}/>
                </div>
                <div className="profile_img_popup_middle">
                    <img src={profileImage ? profileImage : Profile} alt="" className='popup_image'/>
                </div>
                <div className="profile_img_popup_bottom">
                    <div className="add_photo" onClick={handleImageUploadClick}>
                        <FontAwesomeIcon icon={faCamera} className='camera_icon' style={{color: "white"}}/>
                        <p  style={{color: "white"}}>add photo</p>
                        <input ref={fileInpurRef} onChange={handleImageUpload} type="file" accept='image/*' style={{display:'none'}}/>
                    </div>
                </div>
            </div>

            <div className="profile_img">
                <img className="profile_img_div" src={Profile} alt=""/>
            </div>
            <div className="profile_details">
                <div className="details_left">
                    <div className="profile_name">Shaik Allabaksh</div>
                    <div className="profile_bio">Backend Developer</div>
                    <div className="address">Hyderabad,Telangana</div>
                    <div className="profile_connections">297 Connections</div>
                    <div className="profile_work">
                        <button className="open">Open to</button>
                        <button className="add_profile">Add profile section</button>
                        <button className="more">More</button>
                    </div>
                </div>
                <div className="details_right">
                    <button onClick={handleForm} className='pencil'><FontAwesomeIcon icon={faPencil} /></button>
                    <div className="college">college</div>
                </div>
            </div>
        </div>
        {showForm && <ProfileForm/>}
    </div>
  )
}

export default ProfileCard
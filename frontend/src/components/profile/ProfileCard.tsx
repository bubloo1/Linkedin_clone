import { faPencil } from '@fortawesome/free-solid-svg-icons'
import './profileCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import ProfileForm from './ProfileForm'
import Profile from '../../assets/user-solid.svg'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { uploadProfileImage, getProfileDetails } from './profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import api from '../../api/getBaseURL'

const ProfileCard = () => {
    const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
    const [showForm,setShowForm] = useState<boolean>(false)
    const [profileImage, setProfileImage] = useState<any>(null)

    const fileInpurRef = useRef<any>(null)
    const [closeImgPopup,setCloseImgPopup] = useState<boolean>(true)
    const profileDetailsStatus = useSelector((state:any) => state.profile.status2)
    const profileDetails = useSelector((state:any) => state.profile.profileDetails)

    useEffect(()=> {
        dispatch(getProfileDetails())
    },[])

    function handleForm (){
        showForm ? setShowForm(false) :  setShowForm(true)
    }

    function handleImageUploadClick(){
        fileInpurRef.current.click()
    }

    function handleImageUpload(e: any){
        e.preventDefault()
        const profileImage = e.target.files[0]
        setProfileImage(URL.createObjectURL(profileImage))
        const formData = new FormData()
        formData.append("profile_image",profileImage)
        dispatch(uploadProfileImage(formData))
    }
    console.log("http://localhost:3500/" + profileDetails.profile_url)
    // console.log(profileDetails.message[0].profile_url)
   
  return (
    <div className="profile_container">
        <div className="top">
            <img src="" alt="" />
        </div>
        <div className="bottom">

            <div className="profile_img_popup" style={closeImgPopup ? {display:"none"} : {display:"block"}}>
                <div className="profile_img_popup_top">
                    <p style={{color: "white"}}>Profile photo</p>
                    <FontAwesomeIcon icon={faXmark} onClick={() => setCloseImgPopup(prev => !prev)} className='popup_cancel' style={{color: "white"}}/>
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
          
            <div className="profile_img" onClick={() => setCloseImgPopup(prev => !prev)}>
                <img className="profile_img_div" src={profileDetailsStatus === "succeeded" ? "http://localhost:3500/" + profileDetails.profile_url : Profile } alt=""/>
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
        {showForm && <ProfileForm showForm = {() => setShowForm(prev => !prev)} />}
    </div>
  )
}

export default ProfileCard
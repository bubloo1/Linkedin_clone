import { faPencil } from '@fortawesome/free-solid-svg-icons'
import './profileCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import ProfileForm from './ProfileForm'
import Profile from '../../assets/user-solid.svg'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { uploadProfileImage, getProfileDetails, getConnectionCount } from './profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import api from '../../api/getBaseURL'

const ProfileCard = () => {
    const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
    const [showForm,setShowForm] = useState<boolean>(false)
    const [profileImage, setProfileImage] = useState<any>(null)
    const [saveProfileImage, setSaveProfileImage] = useState<string>('');
    let [connectionsCount, setConnectionsCount] = useState<any>(0)

    const fileInpurRef = useRef<any>(null)
    const [closeImgPopup,setCloseImgPopup] = useState<boolean>(true)
    const profileDetailsStatus = useSelector((state:any) => state.profile.status2)
    const profileDetails = useSelector((state:any) => state.profile.profileDetails)
    
    useEffect(() => {
        dispatch(getProfileDetails())
        const fetchConnectionCount = async () => {
            connectionsCount = await dispatch(getConnectionCount(localStorage.getItem('userID')))
            setConnectionsCount(connectionsCount.payload)
        }
        fetchConnectionCount()
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
        setSaveProfileImage(profileImage)
    }

    function sendImage (){
        const formData = new FormData()
        formData.append("profile_image",saveProfileImage)
        dispatch(uploadProfileImage(formData))
        setCloseImgPopup(prev => !prev)
    }
    console.log("http://localhost:3500/" + profileDetails.profile_url)
    // console.log(profileDetails.message[0].profile_url)
   
  return (
    <>
    {profileDetailsStatus === 'succeeded' && console.log(profileDetails,"profile details -----")}
    <div className="profile_container">
        <div className="top">
            <img src="" alt="" />
        </div>
        <div className="bottom">

            <div className="profile_img_popup" style={closeImgPopup ? {display:"none"} : {display:"block"}}>
                <div className="profile_img_popup_top">
                    <p style={{color: "black"}}>Profile photo</p>
                    <FontAwesomeIcon icon={faXmark} onClick={() => setCloseImgPopup(prev => !prev)} className='popup_cancel' style={{color: "black"}}/>
                </div>
                <div className="profile_img_popup_middle">
                    <img src={profileImage ? profileImage : Profile} alt="" className='popup_image' onClick={handleImageUploadClick}/>
                </div>
                <div className="profile_img_popup_bottom">
                    <div className="add_photo" >
                        <div className='profile_save'>
                            <div>
                                <FontAwesomeIcon icon={faCamera} className='camera_icon' style={{color: "black"}}/>
                                <p  style={{color: "black"}}>add photo</p>
                            </div>
                            <button className='save_profile' onClick={sendImage}>Save</button>
                        </div>
                        <input ref={fileInpurRef} onChange={handleImageUpload} type="file" accept='image/*' style={{display:'none'}}/>
                    </div>
                </div>
            </div>
          
            <div className="profile_img" onClick={() => setCloseImgPopup(prev => !prev)}>
                <img className="profile_img_div" src={profileDetailsStatus === "succeeded" ? "http://localhost:3500/" + profileDetails.profile_url : Profile } alt=""/>
            </div>
            <div className="profile_details">
                <div className="details_left">
                    <div className="profile_name">{ 
                        (profileDetails.first_name && profileDetails.last_name) ? (profileDetails.first_name + profileDetails.last_name) : 
                        profileDetails.user_username }</div>
                    <div className="profile_bio">{(profileDetails.user_bio ?? 'No Bio')}</div>
                    <div className="address">{(profileDetails.city ?? 'No Location')}</div>
                    <div className="profile_connections">{connectionsCount} connections</div>
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
    </>
  )
}

export default ProfileCard
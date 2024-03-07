
import { useEffect, useState } from 'react'
import Profile from '../../assets/user-solid.svg'
import './networkProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { getNetworkProfile } from './networkSlice'

// type profileDetails = {
//     gender?:string | undefined
//     first_name?: string | undefined
//     last_name?: string | undefined
//     additionalName?: string | undefined
//     headline?: string | undefined
//     country?: string | undefined
//     city?: string | undefined
// }

const NetworkProfile = () => {
    const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
    const [profileDetails, setProfileDetails] = useState<object>({})
    const networkProfileStatus = useSelector((state:any) => state.network.status)
    const networkProfileDetails = useSelector((state:any) => state.network.networkProfile)
    
    useEffect(()=> {
        dispatch(getNetworkProfile())
    },[])

    return (
        <div style={{display:"flex", flexWrap: "wrap"}}>
            {networkProfileStatus === "succeeded" && networkProfileDetails.map((user: any, index: number) => (
                <div className='network_container' key={index}>
                    <div className="network_profile_card">
                        <div className="card_top">sdfgfg</div>
                        <div className="card_bottom">
                            <div className="network_profile_img">
                                <img src={"http://localhost:3500/" + user.profile_url} alt="Profile" />
                            </div>
                            <div className="profile_name">
                                <h4>{user.first_name + user.last_name}</h4>
                            </div>
                            <div className="profile_bio">
                                <p>{user.user_bio}</p>
                            </div>
                            <div className="network_number">
                                <p>33 mutual connections</p>
                            </div>
                            <button>+ Connect</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}    
export default NetworkProfile
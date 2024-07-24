
import { useEffect, useState } from 'react'
import Profile from '../../assets/user-solid.svg'
import './networkProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { getNetworkProfile, sendConnectionDetails, handleConnections } from './networkSlice'
import Notification from '../notification/Notification'

const NetworkProfile = () => {
    const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
    const networkProfileStatus = useSelector((state:any) => state.network.status)
    let networkProfileDetails = useSelector((state:any) => state.network.networkProfile)
    
    useEffect(()=> {
        dispatch(getNetworkProfile())
    },[])

    function handleConnection (connectionTo:number){
        const connectionFrom = localStorage.getItem('userID')
        dispatch(sendConnectionDetails({connectionTo,connectionFrom}))
        networkProfileDetails = networkProfileDetails.map((user: any) => user.user_id == connectionTo ? {...user, connection: "Pending"} : user)
        console.log(networkProfileDetails,"network details")
        dispatch(handleConnections(networkProfileDetails))
    }

    return (
        <>
        <Notification/>
        <h3>People you may know</h3>
        <div style={{display:"flex", flexWrap: "wrap"}}>
            {networkProfileStatus === "succeeded" && networkProfileDetails.map((user: any) => (
                <div className='network_container' key={user.user_id}>
                    <div className="network_profile_card">
                        <div className="card_top">sdfgfg</div>
                        <div className="card_bottom">
                            <div className="network_profile_img">
                                <img src={"http://localhost:3500/" + user.profile_url} alt="Profile" />
                            </div>
                            <div className="profile_name">
                                <h4>{user.first_name + " " + user.last_name}</h4>
                            </div>
                            <div className="profile_bio">
                                <p>{user.user_bio}</p>
                            </div>
                            <div className="network_number">
                                <p>33 mutual connections</p>
                            </div>
                            <button onClick={() => handleConnection(user.user_id)}>{user.connection ? user.connection : "+ connect"}</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}    
export default NetworkProfile
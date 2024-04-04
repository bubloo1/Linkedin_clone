import './notification.css'
import Profile from '../../assets/user-solid.svg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getconnectionProfile } from './notificationSlice'
import { ThunkDispatch } from '@reduxjs/toolkit/react'
import { handleConnectionsRequests } from './notificationSlice'


const Notification = () => {
  const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
  let connectiondata = useSelector((state:any) => state.connection.notificationDetails)
  const connectionStatus = useSelector((state:any) => state.connection.status)
  
  useEffect(() => {
    dispatch(getconnectionProfile())
  },[])

  function handleConnection (i:number){
    connectiondata = connectiondata.filter((element:Array<object>,index:number) => {
      return i != index
    })
    
    
    console.log(connectiondata,"sdfgdfggd")
    dispatch(handleConnectionsRequests(connectiondata))
  }
  
  return (
    <>
    <h2 style={{display: "flex", justifyContent: "center"}}>Invitations</h2>
   
    {connectionStatus == "idle" &&<h2>loading</h2>}
    {connectionStatus == 'succeeded' && connectiondata.slice(0,3).map((connection:any,index:any) => (

    <div key={index} className="notification_container">
      <div className="notification_name">
        <div className='notification_img'>
          <img src={connection.profile_url ? "http://localhost:3500/" + connection.profile_url : Profile} alt="" />
        </div>
        <p>{connection.first_name + " " + connection.last_name}</p>
        <p>sent connection request to you</p>
      </div>
      <div className='network_button'>
        <button>Ignore</button>
        <button onClick={() => handleConnection(index)}>Accept</button>
      </div>
    </div>
    ))}
    </>
  )
}

export default Notification
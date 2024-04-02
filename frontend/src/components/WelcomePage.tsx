
import { useEffect, useState } from 'react'
import '../App.css'
import HomePageNavbar from './HomePageNavbar'
import PostCard from './post/PostCard'
import ShowPost from './post/ShowPost'
import api from '../api/getBaseURL'


const WelcomePage = () => {
  const [notificationCount, setNotificationCount] = useState<number>(0)
  async function fetchNotificationCount (){
    try{
      const response = await api.get('profile/getnotificationdetails', {
        headers:{
        // "Accept": "application/json",
        "Content-Type":"application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
      }});
      
      if(response.headers['authorization']){
        localStorage.setItem('jwtToken',response.headers['authorization'])
      }
      setNotificationCount(response.data.message[0].notificationCount)
      return response.data.message[0].notificationCount
  }catch(error){
      console.log(error,"Error")
      throw error
  }
  }

  fetchNotificationCount()

  return (
    <div className='app'>
      
      <HomePageNavbar count = {notificationCount}/>
      <PostCard/>
      <ShowPost/>

    </div>
  )
}

export default WelcomePage
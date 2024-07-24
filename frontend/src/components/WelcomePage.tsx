
import { useEffect, useState } from 'react'
import '../App.css'
import HomePageNavbar from './HomePageNavbar'
import PostCard from './post/PostCard'
import ShowPost from './post/ShowPost'
import api from '../api/getBaseURL'


const WelcomePage = ({notificationCount}:any) => {

  return (
    <div className='app'>
      
      <HomePageNavbar notificationCount = {notificationCount}/>
      <PostCard/>
      <ShowPost/>

    </div>
  )
}

export default WelcomePage
import { Route, Routes } from 'react-router-dom'
import LoginPage from "./components/LoginPage";
import UserRegisterForm from "./components/auth/UserRegisterForm";
import WelcomePage from "./components/WelcomePage";
import './App.css'
import ProfileCard from './components/profile/ProfileCard';
import HomePageNavbar from './components/HomePageNavbar';
import ChatBox from './components/chat/ChatBox';
import Signin from './components/auth/SigninForm'
import NetworkProfile from './components/network/NetworkProfile';
import Notification from './components/notification/Notification';
import { useEffect, useState } from 'react';
import api from './api/getBaseURL'

function App() {
  const loginStatus = window.localStorage.getItem('isLoggedIn')
  // if (!loginStaus) localStorage.removeItem('jwtToken')
  // if multiple routes are related to each other we can nest them
  // index is for default nest route
  // if there is a component you want to show in all register routes you can put that component in element={<component/>} in main route with out index and layout to that component at bottom
  // in oulet we can pass objects

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
      console.log(response.data.message.notificationsCount,"reponse notifi count")
      setNotificationCount(response.data.message.notificationsCount)
      return response.data.message.notificationsCount
  }catch(error){
      console.log(error,"Error")
      throw error
  }
  }

  useEffect(() => {
    if (loginStatus) {
      fetchNotificationCount();
    }
  }, [loginStatus]);


  return (
    <div className="app">
      <Routes>
        <Route path="/" >
          
            <Route path="/signin">
              <Route index element={<Signin/>}/>
            </Route>
            <Route path="/register">
              <Route index element={<UserRegisterForm/>}/>
            </Route>
            <Route path="/welcome" >
              <Route index element={<WelcomePage notificationCount={notificationCount}/>}/>
            </Route>
            <Route path='/profile' element={<HomePageNavbar notificationCount={notificationCount}/>}>
              <Route index element={<ProfileCard/>}/>
            </Route>
            <Route path='/chat' element={<HomePageNavbar notificationCount={notificationCount}/>}>
              <Route index element={<ChatBox/>}/>
            </Route>
            <Route path='/network' element={<HomePageNavbar notificationCount={notificationCount}/>}>
              <Route index element={<NetworkProfile/>}/>
            </Route>
            <Route path='/notification' element={<HomePageNavbar notificationCount={notificationCount} />}>
              <Route index element={<Notification/>}/>
            </Route>
            <Route index element={ loginStatus ? <WelcomePage notificationCount={notificationCount}/> : <LoginPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
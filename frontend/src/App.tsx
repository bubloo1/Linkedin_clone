import { Route, Routes } from 'react-router-dom'
import LoginPage from "./components/LoginPage";
import UserRegisterForm from "./components/auth/UserRegisterForm";
import WelcomePage from "./components/WelcomePage";
import './App.css'
import ProfileCard from './components/profile/ProfileCard';
import HomePageNavbar from './components/HomePageNavbar';
import ChatBox from './components/chat/ChatBox';
import Signin from './components/auth/SigninForm'
function App() {
  const loginStaus = window.localStorage.getItem('isLoggedIn')
  // if multiple routes are related to each other we can nest them
  // index is for default nest route
  // if there is a component you want to show in all register routes you can put that component in element={<component/>} in main route with out index and layout to that component at bottom
  // in oulet we can pass objects
  return (
    <div className="app">
      <Routes>
        <Route path="/">
          <Route index element={ loginStaus ? <WelcomePage/> : <LoginPage/>}/>
            <Route path="/signin">
              <Route index element={<Signin/>}/>
            </Route>
            <Route path="/register">
              <Route index element={<UserRegisterForm/>}/>
            </Route>
            <Route path="/welcome" >
              <Route index element={<WelcomePage/>}/>
            </Route>
            <Route path='/profile' element={<HomePageNavbar/>}>
              <Route index element={<ProfileCard/>}/>
            </Route>
            <Route path='/chat' element={<HomePageNavbar/>}>
              <Route index element={<ChatBox/>}/>
            </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App


import '../App.css'
import HomePageNavbar from './HomePageNavbar'
import PostCard from './post/PostCard'
import ShowPost from './post/ShowPost'



const WelcomePage = () => {
  return (
    <div className='app'>
      
      <HomePageNavbar/>
      <PostCard/>
      <ShowPost/>

    </div>
  )
}

export default WelcomePage
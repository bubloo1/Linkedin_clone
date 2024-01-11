import profileImg from '../../assets/profile.jpg'
import './hero.css'

function Hero() {
  return (
    <div className="hero">
      <div className="hero_container">
        <div className="hero_left">
          <div className="hero_left_content">
              <h3>Hello, my name is</h3>
              <h1>Shaik Allabaksh</h1>
              <h2>I'm a <span className='hero_name'>Full Stack Developer.</span></h2>
              <button className='resume_btn'>Resume</button>
          </div>
        </div>
        <div className="hero_right">
          <div className='hero_right_img'>
            <img src={profileImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
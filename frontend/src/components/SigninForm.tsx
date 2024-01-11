import './signinForm.css'

const SigninForm = () => {
  return (
    <div className='login-form__container'>
        <div className="login-form__left">
            <div className="login-form">
                <h1>Welcome to your Professional Community</h1>
                <input type="text"  placeholder='Email or Phone number'/>
                <input type="text"  placeholder='Password'/>
                <p>Forgot password?</p>
                <button>Sign in</button>
            </div>
        </div>
        <div className="login-form__right">
        
        </div>
    </div>
  )
}

export default SigninForm
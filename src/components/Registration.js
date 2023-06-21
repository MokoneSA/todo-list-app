import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Registration = () => {

  // Routing to login page
  const navigate = useNavigate();
  const routeToRegister = () => {
    navigate('/login')
  };


  const [userInfo,setUserInfo] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    let newUser = {
      name,
      email,
      password
    };

    setUserInfo([...userInfo, newUser]);
    setName('');
    setEmail('');
    setPassword('');

    console.log(userInfo)
  };

  // Saving to local storage
  useEffect(() => {
      localStorage.setItem('usersDB', JSON.stringify(userInfo));
  }, [userInfo])

    
  return (
    <div className="register">
      <div className="col-1">
          <h2> Sign Up </h2>
            <span> Register your details below: </span>
            <form id="form" className='flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor="InputName"> Name </label>
              <input name="name" value={name} type="text" placeholder="name" onChange={(e) => setName(e.target.value)}/>
              <label htmlFor="InputEmail"> Email </label>
              <input name="email" value={email} type="email" placeholder="email@mail.com" onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="InputEmail"> Password </label>
              <input name="password" type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
              {/*<input type="text" placeholder="confirm password" />*/}    

              <button className='btn'> Sign Up </button>
                </form>
                <span>Already registered ? <span className='btn-sign-in' value="Go to Register" onClick={() => routeToRegister()}> Sign In </span></span>
            </div>
        </div>
    )
}

export default Registration;

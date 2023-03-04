import React, { useState } from 'react'
import Axios  from 'axios';
import {  useNavigate } from 'react-router-dom';

export default function Login(props) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let Navigate =useNavigate();
  const [user, setUser] = useState({
    email :'',
    password:''
  });

  function getUser(e) {
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
    
  }
  

  async function submitData(e) {
    e.preventDefault();
    setLoading(true)
   
     let {data} = await Axios.post('https://route-movies-api.vercel.app/signin',user);
     if (data.message === 'success') {
      setLoading(false);
      localStorage.setItem('userToken',data.token);
      props.saveUserData()
      Navigate('/home')
     }
     else{
      setError(data.message);
      setLoading(false)
      
     }
    
  }
  return (
    <>
    <div className='w-75 mx-auto'>
      <h1>Login Now</h1>
      {error?<div className='alert alert-danger '>{error}</div>:''}
      <form onSubmit={submitData}>
        <label htmlFor="email" className="form-label">Email :</label>
        <input onChange={getUser} type="email" className="form-control mb-3" id="email" name='email'/>
        <label htmlFor="password" className="form-label">Password :</label>
        <input onChange={getUser} type="password" className="form-control mb-3" id="password" name='password'/>
        <button type="submit" className="btn btn-primary">
          {loading?<i className='fas fa-spinner fa-fa-spin'></i>:'Submit'}
        </button>
      </form>
    </div>
    </>
  )
}

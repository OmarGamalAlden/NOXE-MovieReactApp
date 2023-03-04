import React, { useState } from 'react'
import Axios  from 'axios';
import Joi from 'joi';
import {  useNavigate } from 'react-router-dom';

export default function Register() {

  const [errorsList, seterrorsList] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let Navigate =useNavigate();
  const [user, setUser] = useState({
    first_name :'',
    last_name :'',
    age :0,
    email :'',
    password:''
  });

  function getUser(e) {
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
    
  }
  
  function validateData() {
    let schema =Joi.object({
      first_name:Joi.string().alphanum().min(3).max(12).required(),
      last_name:Joi.string().alphanum().min(3).max(12).required(),
      age : Joi.number().min(18).max(45).required(),
      email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
      password:Joi.string().required(),
    })
    return schema.validate(user,{abortEarly:false})
  }

  async function submitData(e) {
    e.preventDefault();
    setLoading(true)
    let validate = validateData();
    if (validate.error) {
      seterrorsList(validate.error.details)
      setLoading(false)
    }
    else{
     let {data} = await Axios.post('https://route-movies-api.vercel.app/signup',user);
     if (data.message === 'success') {
      setLoading(false);
      Navigate('/login')
     }
     else{
      setError(data.message);
      setLoading(false)
      
     }
    }
  }
  return (
    <>
    <div className='w-75 mx-auto'>
      <h1>Register Now</h1>
      {errorsList.map((error , i)=><div key={i} className='alert alert-danger p-2'>{error.message}</div>)}
      {/* {errorsList.map((error)=><p className='alert alert-danger p-2'>{error.message}</p>)} */}
      {error?<div className='alert alert-danger '>{error}</div>:''}
      <form onSubmit={submitData}>
        <label htmlFor="first_name" className="form-label ">First Name :</label>
        <input onChange={getUser} type="text" className="form-control mb-3" id="first_name" name='first_name'/>
        <label htmlFor="last_name" className="form-label">Last Name :</label>
        <input onChange={getUser} type="text" className="form-control mb-3" id="last_name" name='last_name'/>
        <label htmlFor="age" className="form-label">Age :</label>
        <input onChange={getUser} type="Number" className="form-control mb-3" id="age" name='age'/>
        <label htmlFor="email" className="form-label">Email :</label>
        <input onChange={getUser} type="email" className="form-control mb-3" id="email" name='email'/>
        <label htmlFor="password" className="form-label">Password :</label>
        <input onChange={getUser} type="password" className="form-control mb-3" id="password" name='password'/>
        <button type="submit" className="btn btn-info">
          {loading?<i className='fas fa-spinner fa-fa-spin'></i>:'Submit'}
        </button>
      </form>
    </div>
    </>
  )
}

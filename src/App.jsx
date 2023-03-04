import './App.css';
import React, { useEffect, useState } from 'react'
import { Routes,Route,Navigate,useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Movies from './Movies';
import Notfound from './Notfound';
import Login from './Login';
import People from './People';
import Tvshow from './Tvshow';
import Register from './Register';
import Contact from './Contact';
import About from './About';
import jwtDecode from 'jwt-decode';
import MovieDetails from './MovieDetails';
import TvDetails from './TvDetails';


function App() {
  const [userData, setUserData] = useState(null)

  function saveUserData() {
    let encoded = localStorage.getItem('userToken')
    let decoded = jwtDecode(encoded)
    setUserData(decoded)
  }

  useEffect(()=>{
    if (localStorage.getItem('userToken')) {
      saveUserData()
    }
  },[])

  function ProtectedRoute(props) {
    if (localStorage.getItem('userToken') === null) {
      
    return <Navigate to='/login'/>

    } else {
      return props.children

    }
    
  }

  let navigate=  useNavigate()

  function logOut() {
    setUserData(null)
    localStorage.removeItem('userToken')
    navigate('/login')
  }

  return (
    <>
    <Navbar logOut={logOut} userData={userData}/>
      <div className="container">
        <Routes>
        <Route path='' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='home' element={ <ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
        <Route path='tvshow' element={<ProtectedRoute><Tvshow/></ProtectedRoute>}/>
        <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}/>
        <Route path='moviedetails' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
        <Route path=':id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
        </Route>
        <Route path='tvdetails' element={<ProtectedRoute><TvDetails/></ProtectedRoute>}>
        <Route path=':id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
        </Route>
        <Route path='login' element={<Login saveUserData={saveUserData}/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='contact' element={<ProtectedRoute><Contact/></ProtectedRoute>}/>
        <Route path='about' element={<ProtectedRoute><About/></ProtectedRoute>}/>
        <Route path='*' element={<ProtectedRoute><Notfound/></ProtectedRoute>}/>
        </Routes>
      </div>
    <Footer/>
    </>
);
}

export default App;

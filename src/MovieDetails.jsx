import React , {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";



export default function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState(null)
    let params = useParams();
    async function getDetails(id) {
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US`)
        setMovieDetails(data)
    }
    
    useEffect(()=>{
        getDetails(params.id)
    })
  return (
    <div>
        {movieDetails?<div className='row'>
        <div className='col-md-3'>
            <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movieDetails.poster_path} alt="" />
        </div>
        <div className='col-md-9'>
            <h2 className='text-decoration-underline'>{movieDetails.title}</h2>
            <ul className='my-3 list-group list-group-flush'>
                <li className='list-group-item mt-2 fw-bolder'>Is movie for adult : {movieDetails.adult}</li>
                <li className='list-group-item mt-3 fw-bolder'>Movie date : {movieDetails.release_date}</li>
                <li className='list-group-item mt-3 fw-bolder'>Movie budget : {movieDetails.budget}</li>
                <li className='list-group-item mt-3 fw-bolder'>Movie status : {movieDetails.status}</li>
                <li className='list-group-item mt-3 fw-bolder'>Movie duration : {movieDetails.runtime}</li>
            </ul>
            <div>
                <h3>Story of " {movieDetails.title} "</h3>
                <p className='alert alert-light'>{movieDetails.overview}</p>
            </div>
        </div>
    </div>:<div className='vh-100 text-center d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-10x'></i>
        </div>}
    
    </div>
  )
}

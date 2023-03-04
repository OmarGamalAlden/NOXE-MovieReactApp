import React , {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function TvDetails() {
    const [tvDetails, setTvDetails] = useState(null)
    let params = useParams();
    async function getDetails(id) {
        let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US`)
        setTvDetails(data)
    }
    
    useEffect(()=>{
        getDetails(params.id)
    })
  return (
    <div>
        {tvDetails?<div className='row'>
        <div className='col-md-3'>
            <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+tvDetails.poster_path} alt="" />
        </div>
        <div className='col-md-9'>
            <h2 className='text-decoration-underline'>{tvDetails.name}</h2>
            <ul className='my-3 list-group list-group-flush'>
                <li className='list-group-item mt-2 fw-bolder'>Tv tagline : {tvDetails.tagline}</li>
                <li className='list-group-item mt-3 fw-bolder'>Episodes of the series : {tvDetails.number_of_episodes}</li>
                <li className='list-group-item mt-3 fw-bolder'>Tv season : {tvDetails.number_of_seasons}</li>
                <li className='list-group-item mt-3 fw-bolder'>Tv status : {tvDetails.status}</li>
                <li className='list-group-item mt-3 fw-bolder'>Tv duration : {tvDetails.episode_run_time}</li>
            </ul>
            <div>
                <h3>Story of " {tvDetails.name} "</h3>
                <p className='alert alert-light'>{tvDetails.overview}</p>
            </div>
        </div>
    </div>:<div className='vh-100 text-center d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-10x'></i>
        </div>}
    
    </div>
  )
}

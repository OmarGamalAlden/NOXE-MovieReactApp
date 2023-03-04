import React , {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Home() {
  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [personData, setPersonData] = useState([]);

  async function getTrending(mediaType,callback) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f597813c136fdbe4ff8e3e2976da14ad`)
    callback(data.results.slice(0,10));
    setPersonData(data.results.slice(0,14))
  }
  useEffect(()=>{
    getTrending('movie',setMovieData)
    getTrending('tv',setTvData)
    getTrending('person',setPersonData)
  },[])
  return (
    <>
    <div className='row'>
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-4 "></div>
        <h2>Trending <br/>Movies <br />Right Now</h2>
        <p className="text-muted">Top Trending Movies by Week</p>
        <div className="brdr mt-4"></div>
        </div>
      </div>

      {movieData.map((movie,i)=><div key={i} className='col-md-2 '>
        <div className='movie card bg-transparent '>
        <Link className='text-white card-body text-decoration-none' to={`/moviedetails/${movie.id}`}>
        
        <img className='w-100 card-img-top' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt=""  />
        <h3 className='h5 card-text text-center pt-2'>{movie.title}</h3>
        
        </Link>
        </div>
      </div>)}
    </div>
    <div className='row my-5'>
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-4 "></div>
        <h2>Trending <br/>Tv Show <br />Right Now</h2>
        <p className="text-muted">Top Trending Tv Show by Week</p>
        <div className="brdr mt-4"></div>
        </div>
      </div>

      {tvData.map((tv,i)=><div key={i} className='col-md-2 '>
        <div className='tv card bg-transparent'>
        <Link className='text-white card-body text-decoration-none' to={`/tvdetails/${tv.id}`}>
        
        <img className='w-100 card-img-top' src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt=""  />
        <h3 className='h5 card-text text-center pt-2'>{tv.name}</h3>
        
        </Link>
        </div>
      </div>)}
    </div>
    
    <div className='row'>
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-4 "></div>
        <h2>Trending <br/>People <br />Right Now</h2>
        <p className="text-muted">Top Trending People by Week</p>
        <div className="brdr mt-4"></div>
        </div>
      </div>

      {personData.map((person,i)=> person.profile_path?<div key={i} className='col-md-2 '>
        <div className='person '>
          <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+person.profile_path} alt=""  />
          <h3 className='h5 text-center pt-2'>{person.name}</h3>
        </div>
      </div>:'')}
    </div>
    </>
  )
}

import React , {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Movies() {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1)

  let nums = new Array(13).fill(1).map((elem , i)=> i+1);
  
  async function getTrending(page) {
    console.log(page);
    setPage(page);
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
    setMovieData(data.results);

  }
  useEffect(()=>{
    getTrending(page)
  },[])
  return (
    <>
    <div className='row'>
      {movieData? movieData.map((movie,i)=><div key={i} className='col-md-3 card bg-transparent' >
        <div className="card-body ">
        <img src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} className="card-img-top h-auto w-100" alt="..."/>

          <h5 className="card-title">{movie.title}</h5>
          <Link className="btn btn-primary" to={`/moviedetails/${movie.id}`}>See more</Link>
        </div>
      </div>):<div className='vh-100 text-center d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-10x'></i>
        </div>}
    </div>
    
    <nav aria-label="...">
    <ul className="pagination pagination-sm d-flex justify-content-center mt-4">
      {
      nums.map((pageNumber)=><li key={pageNumber} onClick={()=>getTrending(pageNumber)} className="page-item "><span className="page-link bg-transparent text-white" >{pageNumber}</span></li>)
      }
    </ul>
  </nav>
  </>
  )
}

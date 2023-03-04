import React , {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Tvshow() {
  const [tvData, setTvData] = useState([]);

  let nums = new Array(13).fill(1).map((elem , i)=> i+1);
  
  async function getTrending(pageNumber) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
    setTvData(data.results);
  }
  useEffect(()=>{
    getTrending(1)
  },[])
  return (
    <>
    <div className='row'>
      {tvData? tvData.map((tv,i)=><div key={i} className='col-md-3 card bg-transparent' >
        <div className="card-body ">
        <img src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} className="card-img-top h-auto w-100" alt="..."/>

          <h5 className="card-title">{tv.name}</h5>
          <Link className="btn btn-primary" to={`/tvdetails/${tv.id}`}>See more</Link>
        </div>
      </div>):<div className='vh-100 text-center d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-10x'></i>
        </div>}
    </div>
    
    <nav aria-label="...">
    <ul className="pagination pagination-sm d-flex justify-content-center mt-4">
      {
      nums.map((pageNumber)=><li key={pageNumber} onClick={()=>getTrending(pageNumber)} className="page-item "><Link className="page-link bg-transparent text-white" to="#">{pageNumber}</Link></li>)
      }
    </ul>
  </nav>
  </>
  )
}

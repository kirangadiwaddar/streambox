import React from 'react'
import { Clapperboard, Monitor } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom';

const MovieSingle = ({item, showMedia}) => {
  const location = useLocation();
  const contentType = location.pathname.includes('tv') ? 'tv' : 'movie';
  return (
    <div className="movie-item relative group mb-10">
      <NavLink to={`/${item.media_type ? item.media_type : contentType}/${item.id}`}>
        {showMedia == true ? <span className="media absolute top-4 left-4 bg-primary py-1 px-3 rounded-full text-white">{item.media_type == "tv" ? 
        "Series" : "Movie"}</span> : null }
        {item.votes == true ? <p className='fixed right-2 top-2 text-white bg-primary backdrop-blur-sm p-2 rounded-full'>{item.vote_average?.toFixed(1)}</p> : null }
        <img className='h-[250px] md:h-[340px] w-full object-cover rounded-2xl' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.poster_path} />
        <h1 className='text-1xl mt-2'>{item.title ? item.title : item.original_name}</h1>
        <h1 className="text-1xl font-bold text-primary">Ratings : {item.vote_average?.toFixed(1)}</h1>
        </NavLink>
        <NavLink to={`/${item.media_type ? item.media_type : contentType}/${item.id}`} className="btn btn-black btn-icon block mt-3">View More {item.media_type == "tv" ? 
                <Monitor color="#fff" /> : <Clapperboard color="#fff" />}</NavLink>
    </div>
  )
}

export default MovieSingle
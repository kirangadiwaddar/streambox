import React, { useEffect, useState} from 'react';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

import axios from 'axios';

import { Popcorn } from 'lucide-react';


const HeroSlider = () => {

const API_KEY = "api_key=c0ecafd31b7a4a57712822d92325d43c";
const API_URL = `https://api.themoviedb.org/3/trending/all/day?${API_KEY}&with_origin_country=IN`;

const [videos, setVideos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError ] = useState(null);

useEffect(()=> {
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      // console.log("response", response);
      const movieSlider = response.data.results;
      setVideos(movieSlider);
      setLoading(false);
    } catch(err) {
      setError(err.message);
      setLoading(false);
    }
  }

  fetchData();

  // Ensure loading screen is shown for at least 2 seconds
  const loadingTimeout = setTimeout(() => {
    setLoading(false);
  }, 2000);

  // Cleanup timeout if component unmounts
  return () => clearTimeout(loadingTimeout);

}, [])

  return (
    <>
    {loading ? 
    <div className="bg-gray h-[90dvh]"></div>
    : 
    <div className=" overflow-hidden bg-purple-50 h-[90dvh]">
      <Swiper
      slidesPerView={1}
      loop={true}
      pagination={{
        clickable: true
      }}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 5000,
      }}
      
      className='w-100vw h-full'
    >
    {videos.slice(0,10).map(item=>(
      <SwiperSlide key={item.id} className="relative bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`}}>
      <div className="flex items-end justify-between">
        <div className="slide-content flex flex-col md:flex-row md:justify-between md:items-end absolute bottom-0 left-0 right-0 w-full rounded-t-3xl ml-auto pt-[200px] px-4 md:px-10 pb-14 z-10 bg-gradient-to-b from-transparent to-zinc-900">
          <div className="m-title md:w-1/2">
            
            <h1 className='text-2xl md:text-8xl font-bold mb-5 text-white'>{item.title ? item.title : item.original_name}</h1>
            <p className='text-white text-[14px] md:text-1xl'>{item.overview.length > 250 ? `${item.overview.slice(0, 250)}...` : item.overview}</p>
          </div>          
          <div className="flex items-center gap-4 mt-3 md:mt-0">    
          {/* <button className='btn btn-primary'>{item.media_type}</button>       */}
          {/* <p className="text-2xl font-semibold">Votes : {item.vote_average.toFixed(1)}/10</p> */}
          <button className="btn btn-white btn-icon">{item.vote_average?.toFixed(1)}/10 <Popcorn size={20} strokeWidth={1} /></button>
          </div>          
        </div>
      </div>      
    </SwiperSlide>
    ))}      
    </Swiper> 
    </div>  }
    </>
  )
}

export default HeroSlider
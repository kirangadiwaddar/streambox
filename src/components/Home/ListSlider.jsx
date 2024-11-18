import React, { useState, useEffect } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, NavLink } from 'react-router-dom';
import { Clapperboard, Monitor } from 'lucide-react';
import axios from 'axios';

const ListSlider = (props) => {

  const API_KEY = "api_key=c0ecafd31b7a4a57712822d92325d43c";
  const API_URL = `https://api.themoviedb.org/3/${props.apiName}?${API_KEY}`;

  const [movieItem, setMovieItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        // console.log("response", response);
        const movieList = response.data.results;
        setMovieItem(movieList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();

  }, [])

  return (
    <div className="block-slider pt-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="title-flex flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">{props.name}</h2>
          {props.url ? <NavLink className='text-primary flex items-center justify-end gap-2' to={props.url}>View More
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </NavLink> : null}
        </div>
      </div>
      <div className="container mx-auto mt-3 md:mt-5 px-4">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 500,
            pauseOnMouseEnter: true,
          }}
          speed={2000}
          breakpoints={{
            780: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 40,
            }
          }}
          className='w-100vw h-full'
        >
          {movieItem.slice(0, 10).map(item => (
            <SwiperSlide key={item.id} className="relative">
              <NavLink to={`/${item.media_type ? item.media_type : "movie"}/${item.id}`}>
                <div className="movie-item rounded-xl overflow-hidden relative group" key={item.index}>
                  {props.showMedia == true ? <span className="media absolute top-4 left-4 bg-primary p-2 rounded-lg">{item.media_type == "tv" ?
                    <Monitor color="#fff" /> : <Clapperboard color="#fff" />}</span> : null}
                  {props.votes == true ? <p className='fixed right-2 top-2 text-white bg-primary backdrop-blur-sm p-2 rounded-full'>{item.vote_average?.toFixed(1)}</p> : null}
                  <img className='h-[250px] md:h-[350px] w-full object-cover' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.poster_path} />
                  <h1 className='absolute bottom-0 left-0 right-0 z-10 bg-black/40 text-white text-center backdrop-blur-sm p-3 rounded-lg group-hover:bg-primary transition group-hover:cursor-pointer'>{item.title ? item.title : item.original_name}</h1>
                </div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ListSlider
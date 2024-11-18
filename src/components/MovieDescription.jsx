import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import userAvatar from "../assets/user-avatar.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const MovieDescription = () => {

    const { id } = useParams();
  
    const API_KEY = "api_key=c0ecafd31b7a4a57712822d92325d43c";
    const API_URL = `https://api.themoviedb.org/3/movie/${id}?${API_KEY}`;
    const API_URL_VIDEO = `https://api.themoviedb.org/3/movie/${id}/videos?${API_KEY}`;
    const API_REVIEWS = `https://api.themoviedb.org/3/movie/${id}/reviews?${API_KEY}`;
    
    const [movie, setMovie] = useState([]);
    const [video, setVideo] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError ] = useState(null);

    useEffect(()=> {
        const movieDetails = async () => {
            try {
                const movieRes = await axios.get(API_URL);
                // const movieData = movieRes.data;
                setMovie(movieRes.data);
                setLoading(false)
            }  catch(err) {
                setError(err.message);
                setLoading(false);
              }
        }         
        movieDetails();
    }, [id]);

    useEffect(()=>{
        const movieVideo = async () => {
            try {
                const videoRes = await axios.get(API_URL_VIDEO);
                // console.log(videoRes);
                const videoTrailer = videoRes.data.results[0];
                setVideo(videoTrailer);
                setLoading(false)
            }  catch(err) {
                setError(err.message);
                setLoading(false);
              }
        }
        movieVideo();
    }, [id]);

    useEffect(()=>{
        const reviews = async () => {
            try {
                const reviewRes = await axios.get(API_REVIEWS);
                console.log("Reviews", reviewRes);
                const reviewItems = reviewRes.data.results;
                setReviews(reviewItems);
                setLoading(false)
            }  catch(err) {
                setError(err.message);
                setLoading(false);
              }
        }
        reviews();
    }, [id]);

    // console.log(movie);
    // console.log(video);

  return (
    <div className='movie-details'>
        <div className="banner-video mb-10 md:mb-20 h-[40dvh] md:h-[70dvh] overflow-hidden hidden sm:block">
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} className='zoom-animation w-full h-full object-cover'/>
        </div>
        <div className="container mx-auto px-4">
            <div className="md:grid md:grid-cols-3 gap-10 items-start">
                <div className="movie-poster -mx-4 -mr-4  sm:rounded-3xl sm:ring-4 ring-red-500 sm:p-3 overflow-hidden mb-4 sm:mb-0">
                    <img className='rounded-t-0 rounded-r-0 rounded-b-3xl sm:rounded-3xl w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="movie-desc-reviews  col-span-2">
                    <div className="movie-desc">
                        <h1 className='text-2xl sm:text-6xl font-extrabold mb-5'>{movie.title ? movie.title : movie.original_title}</h1>
                        <p className='text-1xl font-extralight mt-4 pb-5'>{movie.overview ? movie.overview : ""}</p>
                        {/* <hr /> */}
                        <p className='text-2xl'>Release Date : <span className='text-primary font-bold'>{movie.release_date}</span></p>
                        <p className='text-2xl mt-2'>Rating: <span className='text-primary font-bold'>{movie.vote_average?.toFixed(1)}</span></p>
                        {video ? <a className='btn btn-primary btn-large btn-icon mt-10' href={`https://www.youtube.com/watch?v=${video.key}`} target="blank">Watch Trailer <PlayCircle /></a> : null}
                    </div>
                   
                    {reviews.length>0 ? 
                    <>
                     <hr className='my-5' />
                    <h3 className='text-2xl text-black font-bold mb-5'>Reviews</h3>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        loop={true}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 3000,
                        }}
                    >
                        {reviews.map(item=> (
                            <SwiperSlide key={item.id}>
                                <div className="review-block">
                                    {item.author_details.avatar_path ? <img className='rounded-full w-24 h-24 object-cover mb-2' src={`https://image.tmdb.org/t/p/original${item.author_details.avatar_path}`} alt={item.author} /> : <img className='rounded-full w-24 h-24 object-cover mb-2' src={userAvatar} alt={item.author} /> }
                                    <div className="rw-text col-span-2">
                                    <h1 className='font-bold text-1xl mb-2'>{item.author_details.name}</h1>
                                    <p>{item.content.slice(0, 250)}...</p>
                                    </div>                                      
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper></> : null}
                </div>                
            </div>            
        </div>       
    </div>
  );
}

export default MovieDescription
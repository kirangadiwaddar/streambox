import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { PlayCircle, Star } from 'lucide-react';

const MovieHighlight = () => {
    

    const API_KEY = "api_key=c0ecafd31b7a4a57712822d92325d43c";
    const API_URL = `https://api.themoviedb.org/3/discover/movie?${API_KEY}`;     

    const [singleMovie, setSingleMovie] = useState([]);
    const [video, setVideo] = useState([]);    

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  

    useEffect(()=> {
        const fetchSingleMovie = async () => {
            try {
                const response = await axios.get(API_URL);
                const movie = response.data.results;
                const movieItem = Math.floor(Math.random() * movie.length);
                setSingleMovie(movie[movieItem]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        } 
        fetchSingleMovie();
    }, []);  
    
    const MOVIE_ID = singleMovie.id; 

    useEffect(() => {  
        const VIDEO_URL = `https://api.themoviedb.org/3/movie/${MOVIE_ID}/videos?${API_KEY}`;

        const fetchVideo = async () => {
            try {
                const videoRes = await axios.get(VIDEO_URL);
                const videoData = videoRes.data.results;
                // console.log(videoData);
                const videoItem = Math.floor(Math.random() * videoData.length - 2);            
                setVideo(videoData[videoItem]);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }                         
        fetchVideo();
    }, [MOVIE_ID]);   
    

    return (
        <>
        <div className="my-10 single-movie container mx-auto rounded-3xl overflow-hidden relative bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path})` }}>
            <div className="backgrund-blur absolute top-0 bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg" ></div>
            <div className="md:flex md:items-end md:justify-start gap-14 p-10 z-10 relative">
                <div className="single-poster md:w-1/4 ring-2 ring-cyan-50 p-3 rounded-2xl">
                    <img className='rounded-2xl' src={`https://image.tmdb.org/t/p/original/${singleMovie.poster_path}`} alt="" />
                </div>
                <div className="single-description md:w-1/2 mt-8 md:mt-0 text-white">
                    <h1 className='text-4xl font-bold'>{singleMovie.title}</h1>
                    <p className='text-1xl mt-5 mb-5'>{singleMovie.overview}</p>
                    <p className='text-1xl'>Released on : <strong>{singleMovie.release_date}</strong></p>
                    <p className='flex items-center text-1xl mt-4'>Ratings : <span className='ml-1 flex item-center gap-1'>
                        {singleMovie.vote_average?.toFixed(1)} <Star /></span></p>
                    {video ? <a href={`https://www.youtube.com/watch?v=${video.key}`} target='_blank' className="btn btn-primary btn-large btn-icon mt-10">Watch Video <PlayCircle color="#fff" /></a> : null}
                    {/* <a href="#" target='_blank' className="btn btn-primary btn-large btn-icon mt-10 pointer-events-none opacity-50">Watch Trailer <PlayCircle color="#fff" /></a> */}
                </div>
            </div>
        </div>
    </>
    )
}

export default MovieHighlight
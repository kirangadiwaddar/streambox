import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MovieSingle from './MovieSingle';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Trending = () => {   
    
    const [trending, setTrendingVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError ] = useState(null);

    const API_KEY = "api_key=c0ecafd31b7a4a57712822d92325d43c";
    const API_URL = `https://api.themoviedb.org/3/trending/all/week?${API_KEY}&page=${currentPage}&with_origin_country=IN`;
    
    useEffect(()=> {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_URL);
          // console.log("response", response);
          const trending = response.data.results;
          setTrendingVideos(trending);
          setCurrentPage(response.data.page);
          setTotalPages(response.data.total_pages);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setLoading(false);
        } catch(err) {
          setError(err.message);
          setLoading(false);
        }
      }
    
      fetchData(currentPage);

      // Ensure loading screen is shown for at least 2 seconds
      const loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 2000);

      // Cleanup timeout if component unmounts
      return () => clearTimeout(loadingTimeout);
    
    }, [currentPage])

    const handleNextPage = () => {
      if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
      }
  };

  const handlePrevPage = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
  };

    // console.log(trending);

  return (
    <div className="container mx-auto px-4">
        <h1 className="text-[8vw] md:text-[5vw]  text-center uppercase font-extrabold mt-32 mb-10 ">Trending Busters</h1>    
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-10">
        {trending.map((item, index)=>(
          <MovieSingle item={item} key={index} showMedia={true} />
         ))}         
        </div>
        <div className="pagination-controls flex items-center gap-4 justify-center mt-5">
            <button className='flex item-center gap-2' onClick={handlePrevPage} disabled={currentPage === 1}>
               <ArrowLeft/> Previous
            </button>
            <div className='bg-primary text-white p-2 px-4 rounded-full mx-4'>{currentPage} of {totalPages}</div>
            <button className='flex item-center gap-2' onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next <ArrowRight/> 
            </button>
        </div>
    </div>
  )
}

export default Trending
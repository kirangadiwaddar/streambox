import ScrollToTop from '../ScrollToTop';
import Header from './components/Header';
import Home from './components/Home';

import Trending from './components/Trending';

import { Routes, Route, useLocation } from "react-router-dom";
import Footer from './components/Footer';
import MovieDescription from './components/MovieDescription';
import TvDescription from './components/TvDescription';
import Movies from './components/MoviesPage';
import Tv from "./components/TvPage";

function App() {

  return (
    <>
      <ScrollToTop />
      <Header />      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/movie/:id" element={<MovieDescription />} />
        <Route path="/tv/:id" element={<TvDescription />} />
      </Routes>
      <Footer />
  </>
  )
}

export default App;

import React from 'react'
import HeroSlider from './HeroSlider'
import ListSlider from './ListSlider'
import MovieHighlight from './MovieHighlight'

const Main = () => {
  return (
    <>
      <HeroSlider />
      <ListSlider name="Trending" apiName="trending/all/day" showMedia={true} url="/trending" />
      <ListSlider name="New & Popular" apiName="movie/popular" votes={true} url="/movies" />
      <MovieHighlight />
      <ListSlider name="Top Rated" apiName="movie/top_rated" votes={true} />
    </>
  )
}

export default Main
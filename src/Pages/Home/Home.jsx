import React from 'react'
import MyCarousel from './MyCarousel'
import TopSellers from '../../components/TopSellers/TopSellers'

function Home() {
  return (
    <div className='container-fluid'>
      <MyCarousel className='carousel'/>
      <TopSellers/>
    </div>
  )
}

export default Home
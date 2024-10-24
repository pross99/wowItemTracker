import React from 'react'
import Hero from '../hero/Hero'
import spinnerLoader from '../SpinnerLoader/SpinnerLoader'
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader'
const Home = ({items, onDelete}) => {
  return ( 

    <><SpinnerLoader/><div>
      <Hero items={items} onDelete={onDelete} />
    </div></>

  )
}

export default Home
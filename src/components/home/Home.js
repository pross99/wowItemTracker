import React from 'react'
import Hero from '../hero/Hero'

const Home = ({items, onDelete}) => {
  return (
    <Hero items= {items} onDelete={onDelete} />
    
  )
}

export default Home
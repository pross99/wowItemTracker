import React from 'react'
import Hero from '../hero/Hero'
import spinnerLoader from '../SpinnerLoader/SpinnerLoader'
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader'

const Home = ({items, handleDeleteItem, handleEditComplete}) => {
  return ( 
    <>
     
        <Hero items={items} onDelete={handleDeleteItem} onEdit={handleEditComplete}/>
      
      
   
      
    </>

  )
}

export default Home
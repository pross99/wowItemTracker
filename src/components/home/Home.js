import React from 'react'
import Hero from '../hero/Hero'
import spinnerLoader from '../SpinnerLoader/SpinnerLoader'
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader'
const Home = ({items, handleDeleteItem, handleEditComplete}) => {
  return ( 
    <><div>
      {items && items.length > 0 ? (
        <Hero items={items} onDelete={handleDeleteItem} onEdit={handleEditComplete}/>
      ):
      <SpinnerLoader/>
         }
   
      
    </div></>

  )
}

export default Home
import React, { useEffect, useState } from 'react'
import './Hero.css'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material';
import wowheadpng from '../../images/wowhead.png'
import { padding } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import axiosInstance from '../../api/axiosConfig';


// const url = 'https://f30b-87-63-77-53.ngrok-free.app//api/v1/items/${wowheaditemId}'










const Hero = ({ items, onDelete, onEdit, onComplete }) => {
    const handleDelete = async (wowheadId) => {
        try {
          await axiosInstance.delete(`/api/v1/items/${wowheadId}`);
          console.log(wowheadId)
          onDelete(wowheadId);
        } catch (error) {
          console.error(error);
        }
      };

      const handleOnDelete = (wowheadId) => {
        console.log('onDelete called with wowheadId:', wowheadId );
        onDelete(wowheadId)
      }

 /*      const handleEdit = async (wowheadId) => {
        try {
            await axiosInstance.put(`/api/v1/items/${wowheadId}`);
        }
      } */





const [imageUrls, setImageUrls] = useState ({})

useEffect(() => {
    const fetchImageUrls = async () => {
    const urls = {};

    for (const item of items) {
        try {
            const response = await axiosInstance.get(`/api/v1/items/${item.wowheadId}`)
            urls[item.wowheadId] = response.data.backdrops; // { imageUrl is "backdrops": '...' }
        } catch (eeror) {
            console.error(`Could not fetch image for${item.wowheadId}:`, error) 
        }
        }
        setImageUrls(urls);
    };

    if(items.length > 0) {
        fetchImageUrls();
    }
},[items])

    return (
        <div className='item-carousel-container'>

            <Carousel>
                {items && items.length > 0 ? (
                    items.map((item) => {
                        return (
                            <Paper key={item.wowheadId}> {/* Use unique wowheahId */}
                                <div className='item-card-container' >
                                    <div className='item-card' style={{ "--img": `url(${wowheadpng})` }} >
                                        <div className='item-detail'>
                                            <div className='item-poster'>
                                            <img src={item.backdrops}  alt="" />
                                        </div>
                                        <div className='item-title'>
                                            <div className='item-column'>
                                                <h3 className='column-title'>Item:</h3>
                                                <h4 className='column-answer'>{item.itemName}</h4>
                                            </div>
                                            <div className='item-column'>
                                                <h3 className='column-title'> Link:</h3>
                                                <a href={`${item.wowHeadLink}`}>
                                                    <h4 className='column-answer'>
                                                        WoWHead
                                                    </h4>
                                                </a>
                                            </div>
                                            <div className='item-column'>
                                                <h3 className='column-title'>Expansion:</h3>
                                                <h4 className='column-answer'>{item.expansion}</h4>
                                            </div>
                                            <div className='item-column'>
                                                <h3 className='column-title'>Obtainable from:</h3>
                                                <h4  className='column-answer'>  {item.location}</h4>
                                            </div>

                                            <div className='item-column'>
                                                <h3 className='column-title'> Slot</h3>
                                                <h4 className='column-answer'> {item.slot}</h4>
                                            </div>
                                            <div className="item-buttons-contianer">
                                                <div className="delete-button-icon-container">
                                                    <FontAwesomeIcon onClick={() => handleDelete(item.wowheadId)} className="delete-button-icon"
                                                     icon ={faDeleteLeft}
                                                    />
                                                   
                                                </div>
                                            </div>
                                            <div className= "item-buttons-container">
                                                <div className="edit-button-icon-container">
                                                    <FontAwesomeIcon className= "edit-button-icon"
                                                    icon ={faPenToSquare}
                                                    />
                                                </div>
                                            </div>

                                            <div className = "item-buttons-container">
                                                <div className= "complete-button-icon-container">
                                                    <FontAwesomeIcon className= "complete-button-icon"
                                                    icon ={faCheck}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                     
                                          

                                      


                                        </div>
                                        


                                    </div>



                                </div>

                            </Paper>
                        )
                    })
                ) : (
                    <div> No items to display? Remember to start server and update ngrok in axiosConfig.js & AddItem.js</div>
                )
                }
            </Carousel>
        </div>
    )
}

export default Hero
import React, { useEffect, useState, useContext, useCallback} from 'react'
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
import UserContext from '../UserContext'
import { useAuth } from '../login/AuthProvider'
import EditItem from '../editItem/EditItem';

// const url = 'https://f30b-87-63-77-53.ngrok-free.app//api/v1/items/${wowheaditemId}'

const Hero = ({ items, onDelete, onEdit, onComplete}) => {
 
    
    const { userId } = useContext(UserContext);
    const [imageUrls, setImageUrls] = useState ({})
   // const {user} = useContext(UserContext);
    const { user, isLoggedIn } = useAuth();
    const [showDelete, setShowDelete] = useState(false);
    const [showComplete, setShowComplete] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null); // the specific item that needs editing


    
 /*    const toggleDelete = () => {
        setShowDelete(!showDelete);
        if(showEdit || showComplete) setShowEdit(false) && setShowComplete(false)
    };

    const toggleComplete = () => {
        setShowComplete(!setShowComplete);
        if(showDelete || showEdit) setShowDelete(fasle) && setShowComplete(false)
    }; */
    
    const handleEditItem = (item) => {
        setItemToEdit(item);
    };

    const handleEditComplete = async (updatedItem) => {
        setItemToEdit(null);
        // Update the local items list
        setLocalItems(prevItems => 
            prevItems.map(item => 
                item.wowheadId === updatedItem.wowheadId ? updatedItem : item
            )
        );
        // If parent provided onEdit callback, call it
        if (onEdit) {
            onEdit(updatedItem);
        }
    };

    const handleCloseEdit = () => {
        setItemToEdit(null);
    };

    useEffect(() => {
    
     if (items.length === 0) {
        console.log("No items available yet, skipping fetch");
        return; // Don't fetch if items haven't loaded yet
    }

    const fetchImageUrls = async () => {
       console.log("Fetching image URLs for items");
        const urls = {};

    for (const item of items) {
            try {
                console.log(item.wowheadId + "HERO Are there any ids?")
                const response = await axiosInstance.get(`/api/v1/items/${item.wowheadId}`);
                console.log(response.data)
                urls[item.wowheadId] = response.data.backdrops; // Store image URL
                console.log(`Fetched image URL for item ${item.wowheadId}:`, response.data.backdrops);
            } catch (error) {
               console.error(`Could not fetch image for ${item.wowheadId}:`, error);
            }
        }

        setImageUrls(urls); // Update state with the fetched URLs
    
    };

    fetchImageUrls(); // Call the function when both items and userId are available
    }, [items]);  // now depends on both items and userId
       
console.log(itemToEdit)
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
                                            <img src={imageUrls[item.wowheadId] || item.backdrops}  alt="" />
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
                                            <div className="item-buttons-container">
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
                                                    onClick={() => handleEditItem(item)}
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
                    <div> No items to display? Start creating your wishlist on the "Add item" page or login to view your saved item list. If you are testing, you can login with U: "testuser" PW: "testpass" </div>
                )   
            }
            </Carousel>
             {/* Render EditItem outside the map loop, conditionally showing it based on showEdit and itemToEdit */}
            {itemToEdit && <EditItem 
            item={itemToEdit} 
            onEdit={handleEditComplete} 
            toggle={handleCloseEdit} />} 
        </div>
    )
}

export default Hero
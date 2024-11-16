import { useState, useContext } from "react";
import axiosInstance from '../../../api/axiosConfig';
import { useAuth } from "../../login/AuthProvider";
import './EditItem.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css'
import ReactTooltip from "react-tooltip";
import  {Tooltip}  from 'react-tooltip'


export default function EditItem(props) {
   const {item, toggle} = props
    const [editedItem, setEditedItem] = useState(props.item || {});

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null); // FOR ERRORS
    const { user } = useAuth();
    const [isTooltipHovered, setIsTooltipHovered] = useState(false);



    const notify = () =>  toast.success('Item Updated', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });





    const handleInputChange = (e) => {
          setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
        };

    const handleEdit = async (e) => {
        e.preventDefault(); 
        setIsLoading(true);
        setError(null);

        try {
          const itemToUpdate = {
            itemName: editedItem.itemName,
            wowHeadLink: editedItem.wowHeadLink,
            expansion: editedItem.expansion,
            location: editedItem.location,
            slot: editedItem.slot,
            wowheadId: editedItem.wowheadId,
            backdrops: editedItem.backdrops,
            userId: user.userId
        };

          await axiosInstance.put(`/api/v1/items/${editedItem.wowheadId}`, itemToUpdate); 
          notify();
          props.toggle(); 
        } catch (error) {
          setError("UPDATE FAILED")
          console.error(error);
        } finally  {
          setIsLoading(false);
        }
       
      }
        return (
          <div className="popup">
              <div className="popup-inner">
                  <h2>Update Item</h2>
                  <form onSubmit={handleEdit}>
                      <label>
                          ItemName:
                          <input 
                          type="text"
                          name = "itemName"
                          value={editedItem.itemName}
                          onChange={handleInputChange}
                          required 
                          />
                      </label>

                      <label
                      style={{
                        fontWeight: isTooltipHovered ? "bold" : "normal", // conditional styling for hovering
                        color: isTooltipHovered ? "#570987" : "inherit", 
                      }}
                      >
                      wowHeadLink:
                          <input
                          type="text"
                          name="wowHeadLink"
                          value={editedItem.wowHeadLink}
                           onChange={handleInputChange} 
                          required 
                          style={{
                            fontWeight: isTooltipHovered ? "bold" : "normal", // conditional styling for hovering
                            color: isTooltipHovered ? "#570987" : "inherit", 
                          }}
                          />
                      </label>

                      <label 
               
                      >
                      Expansion:
                         
                        <select 
                        name= "expansion"
                        value = {editedItem.expansion}
                          onChange={handleInputChange}
                          style={{marginLeft: '10px' }}
                          >
                          <option value="Classic">Classic</option>
                          <option style={{backgroundColor:'rgba(203, 217, 107, 0.5)'}} value="BC">BC</option>
                          <option style={{backgroundColor:'rgba(158, 198, 230, 0.5)'}} value="wotlk">wotlk</option>
                          <option style={{backgroundColor:'rgba(211,75,28, 0.5)'}} value="Cata">Cata</option>
                          <option style={{backgroundColor:'rgba(194,178,127, 0.5)'}} value="MOP">MOP</option>
                          <option style={{backgroundColor:'rgba(58,18,0, 0.5)'}} value="WOD">WOD</option>
                          <option style={{backgroundColor:'rgba(151,190,65, 0.5)'}} value="Legion">Legion</option>
                          <option style={{backgroundColor:'rgba(66,58,49, 0.5)'}} value="BFA">BFA</option>
                          <option style={{backgroundColor:'rgba(250, 248, 246, 0.5)'}} value="Shadowlands">Shadowlands</option>
                          <option style={{backgroundColor:'rgba(128, 128, 128, 0.5)'}} value="Dragonflgiht">Dragonflight</option>
                          <option style={{backgroundColor:'rgba(201, 24, 1, 0.5)'}} value="War within">War Within</option>
                        </select>
                      </label>

                      <label>
                           Obtainable from:
                          <input
                           type="text" 
                           name = "location"
                           value={editedItem.location} 
                           onChange={handleInputChange} 
                           required 
                          />
                      </label>   
                      <label>
                          Slot:
                        <select 
                        name= "slot"
                        value = {editedItem.slot}
                        onChange={handleInputChange}
                        style={{marginLeft: '10px' }}
                        >
                        <option value="Helmet">Helmet</option>
                        <option value="Shoulders">Shoulders</option>
                        <option value="Chest">Chest</option>
                        <option value="Gloves">Gloves</option>
                        <option value="Belt">Belt</option>
                        <option value="Legs">Legs</option>
                        <option value="Feet">Feet</option>
                        <option value="Weapon">Weapon</option>
                        </select>
                      </label>
                      <div>
                      <label>
                      Image link:
                          <input
                          type="text"
                          name="backdrops"
                          value={editedItem.backdrops}
                           onChange={handleInputChange} 
                          required
                          data-tooltip-id = "image-tooltip"
                          data-tooltip-content= {`Inspect the page on ${editedItem.wowHeadLink} and grab the imageurl for the item`}
                          onMouseEnter={() => setIsTooltipHovered(true)} //highlight link above
                          onMouseLeave={() => setIsTooltipHovered(false)} // highlight ends when hover is moved
                          />
                           <Tooltip id="image-tooltip" place="top" type="dark" effect="solid" />
                      </label>
                      </div>
                      <button type="submit" disabled={isLoading}>
                      {isLoading ? 'Updating...' : 'Update'}
                      </button>
                      <ToastContainer
                      position="bottom-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
            theme="dark"/>
                  </form>
                  {error && <p style={{color: 'red'}}>{error}</p>}
                  <button onClick={props.toggle}>Close</button>
              </div>
          </div>
        )

    


















}


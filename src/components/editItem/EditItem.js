import { useState, useContext } from "react";
import axiosInstance from '../../api/axiosConfig';
import { useAuth } from "../login/AuthProvider";


export default function EditItem(props) {
   const {item, toggle} = props
    const [editedItem, setEditedItem] = useState(props.item || {});

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null); // FOR ERRORS
    const { user } = useAuth();

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

                      <label>
                      wowHeadLink:
                          <input
                          type="text"
                          name="wowHeadLink"
                          value={editedItem.wowHeadLink}
                           onChange={handleInputChange} 
                          required 
                          />
                      </label>

                      <label>
                      Expansion:
                         
                        <select 
                        name= "expansion"
                        value = {editedItem.expansion}
                          onChange={handleInputChange}>
                          <option value="Classic">Classic</option>
                          <option value="BC">BC</option>
                          <option value="wotlk">wotlk</option>
                          <option value="Cata">Cata</option>
                          <option value="Pandaria">Pandaria</option>
                          <option value="WOD">WOD</option>
                          <option value="Legion">Legion</option>
                          <option value="Shadowlands">Shadowlands</option>
                          <option value="Dragonflight">Dragonflight</option>
                          <option value="WW">WW</option>
                        </select>
                      </label>

                      <label>
                           Obtainable from:
                          <input
                           type="text" 
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
                        onChange={handleInputChange} >
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

                      <label>
                      Image link:
                          <input
                          type="text"
                          name="backdrops"
                          value={editedItem.backdrops}
                           onChange={handleInputChange} 
                          required 
                          />
                      </label>
                      
                      <button type="submit" disabled={isLoading}>
                      {isLoading ? 'Updating...' : 'Update'}
                      </button>
                  </form>
                  {error && <p style={{color: 'red'}}>{error}</p>}
                  <button onClick={props.toggle}>Close</button>
              </div>
          </div>
        )

    


















}


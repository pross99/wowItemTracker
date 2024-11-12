import React, { useState, useContext } from 'react';
import UserContext from '../../UserContext'
import Button from "react-bootstrap/Button"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../api/axiosConfig';

function AddItem({onItemAdded}) {
  const [itemName, setItemName] = useState('Corrupted Ashbringer');
  const [wowHeadId, setWowHeadId] = useState('item=22691');
  const [slot, setSlot] = useState('Two-hand Sword');
  const [wowHeadLink, setWowHeadLink] = useState('https://www.wowhead.com/classic/item=22691/corrupted-ashbringer');
  const [expansion, setExpansion] = useState('Classic');
  const [location, setLocation] = useState('Naxxramas');
  const [backdrops, setBackdrops] = useState('https://wow.zamimg.com/uploads/screenshots/normal/1078514-corrupted-ashbringer.jpg');
  const {user} = useContext(UserContext); // Get current user

 const notify = () =>  toast.success('Item added', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
      

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    
    try {
        const response = await axiosInstance.post('/api/v1/items/post', {
          itemName: itemName,
          wowheadId: wowHeadId,
          slot: slot,
          wowHeadLink: wowHeadLink,
          expansion: expansion,
          location: location,
          backdrops: backdrops,
          userId: user.userId
        });

        console.log(response.data)
      
         
        setItemName('');
         setWowHeadId('');
         setSlot('');
        setWowHeadLink('');
         setExpansion('');
         setLocation('');
         setBackdrops('');
console.log(user.userId);
         notify()
         
if (onItemAdded) {
  onItemAdded();
}



}catch(err){
    console.log(err)
}
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="Corrupted Ashbringer" value={itemName} onChange={(event) => setItemName(event.target.value)}/>
  <label htmlFor="floatingInput">Item name</label>
</div>
        <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="item=22691" value={wowHeadId} onChange={(event) => setWowHeadId(event.target.value)}/>
  <label htmlFor="floatingInput">wowhead ID</label>
</div>
        <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="Weapon" value={slot} onChange={(event) => setSlot(event.target.value)}/>
  <label htmlFor="floatingInput">Slot </label>
</div>
        <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="https://www.wowhead.com/classic/item=22691/corrupted-ashbringer" value={wowHeadLink} onChange={(event) => setWowHeadLink(event.target.value)}/>
  <label htmlFor="floatingInput">Link til wowhead </label>
</div>
        <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="Classic" value={expansion} onChange={(event) => setExpansion(event.target.value)}/>
  <label htmlFor="floatingInput">Expansion </label>
</div>
        <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="Naxxramas" value={location}onChange={(event) => setLocation(event.target.value)}/>
  <label htmlFor="floatingInput">Location </label>
</div>
        <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="https://wow.zamimg.com/uploads/screenshots/normal/1078514-corrupted-ashbringer.jpg" value={backdrops}onChange={(event) => setBackdrops(event.target.value)}/>
  <label htmlFor="floatingInput">Image(link from wowhead) </label>
</div>



    
      <button type="submit" className="btn btn-success">Add</button>
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
  );
}

export default AddItem;


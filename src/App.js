
import './App.css';
import api from './api/axiosConfig'
import {useState, useEffect, React, useContext} from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home'
import Header from "./components/header/Header"
import Layout from './components/Layout'
import AddItem from "./components/addItem/AddItem"
import UserContext from './components/UserContext';

function App() {
// added []
  const [items, setItems] = useState([]);
  const {userId} = useContext(UserContext);



  const handleDelete = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId))
  };



 const getItems = async () => {
  if (!userId) {
    console.log("APP User ID is not available, cannot fetch items.");
    return; // Don't fetch items if userId is not set

  }


    try{
        const userIdString =  userId.userId;
      console.log("APP HELLO", userId.userId)
      console.log("APP userId ", userId.userId)
      const response = await api.get(`/api/v1/items/user/${userIdString}`); // Update the API endpoint
      const objectIds = items.map(item => item.userId);
      console.log(response.data, "Tell me what you want");
      console.log(objectIds);
      setItems(response.data); // Set the items in state
  } catch (err) {
      console.error("APP Error fetching items:", err);
  }
};

useEffect(() => {
  if (userId) {
    console.log("APP You logged in! wiht ID", userId)
    console.log ("APP With items", items)
    getItems(); // Fetch items when the component mounts or when userId changes
     
  } console.log("no user found!");
},[userId]);
 

  return (
      <div className="App">  
      <Header/>
   <Routes>
    <Route path="/" element={<Layout/>}>
      <Route path="/" element={<Home items={items} onDelete={handleDelete}/>} ></Route>
        <Route path="/Add" element={<AddItem onItemAdded={getItems}/>} ></Route>  
    </Route>
   </Routes>
    </div> 
  );
}

export default App;

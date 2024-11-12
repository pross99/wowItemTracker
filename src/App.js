
import './App.css';
import api from './api/axiosConfig'
import {useState, useEffect, React, useContext} from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home'
import Header from "./components/header/Header"
import Layout from './components/Layout'
import AddItem from "./components/item/addItem/AddItem"
import { useAuth } from './components/login/AuthProvider';

function App() {
// added []
  const [items, setItems] = useState([]);
 // const {userId} = useContext(UserContext);
 // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, isLoggedIn,setIsLoggedIn } = useAuth();

  const handleDeleteComplete = async (deletedItem) => {
    await getItems();
  };

 const handleEditComplete = async (updatedItem) => {
    // Refresh the items list after an edit
    await getItems();
};

 const getItems = async () => {
  if (!user.userId) {
    console.log("APP User ID is not available, cannot fetch items.");
    return; // Don't fetch items if userId is not set

  }
 

    try{
        const userIdString =  user.userId;
      console.log("APP HELLO", user.userId)
      console.log("APP userId ", user.userId)
      const response = await api.get(`/api/v1/items/user/${userIdString}`); // Update the API endpoint
      const objectIds = items.map(item => item.userId);
      setItems(response.data); // Set the items in state
  } catch (err) {
      console.error("APP Error fetching items:", err);
  }
};

useEffect(() => {
  if (user) {
    console.log("APP You logged in! wiht ID", user.userId)
    console.log ("APP With items", items)
    getItems(); // Fetch items when the component mounts or when userId changes
     
  } console.log("no user found!");
},[user]);


useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
  // setIsLoggedIn(true);
  setIsLoggedIn
  }
}, []);
 

  return (
      <div className="App">  
      <Header/>
   <Routes>
    <Route path="/" element={<Layout/>}>
      <Route path="/" element={<Home items={items} onDelete={handleDeleteComplete} onEdit={handleEditComplete} />} ></Route>
        <Route path="/Add" element={<AddItem onItemAdded={getItems}/>} ></Route>  
    </Route>
   </Routes>
    </div> 
  );
}

export default App;

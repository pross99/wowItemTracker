
import './App.css';
import api from './api/axiosConfig'
import {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout'
import Home from './components/home/Home'
import Header from "./components/header/Header"
import AddItem from "./components/addItem/AddItem"


function App() {
// added []
  const [items, setItems] = useState([]);


 
  const handleDelete = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId))
  };


  useEffect(() =>  {
 const getItems = async () => {

    try{
      const response = await api.get("/api/v1/items")
      console.log(response.data)

        setItems(response.data);

 

    }catch(err) {
      console.log(err);
    }
  };

    getItems();
  },[])




  return (
    <div className="App">
      <Header/>
   <Routes>
    <Route path="/" element={<Layout/>}>
      <Route path="/" element={<Home items={items} onDelete={handleDelete}/>} ></Route>
        <Route path="/Add" element={<AddItem/>} ></Route>  


    </Route>
   </Routes>
    </div>
  );
}

export default App;

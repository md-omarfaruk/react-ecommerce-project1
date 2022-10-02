import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  Routes,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Inventories from './components/Inventories/Inventories';


export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <Header></Header>   
        <Routes>
            <Route path="/" element={<Shop/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/review" element={<Review/>}/>
            <Route path="/inventories" element={
              <RequireAuth>
              <Inventories/>
              </RequireAuth>
            }/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/shipment" element={
                <RequireAuth>
                <Shipment/>
                </RequireAuth>
              }/>

            <Route path="/product/:productKey" element={<ProductDetail/>}/>


            <Route path="*" element={<NotFound/>}/>
        </Routes>  
            
    </UserContext.Provider>
  );
}
 

export default App;

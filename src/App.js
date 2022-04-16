import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';


function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>    
        <Routes>
            <Route path="/" element={<Shop/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/review" element={<Review/>}/>
            <Route path="/inventories" element={<Shop/>}/>

            <Route path="/product/:productKey" element={<ProductDetail/>}/>


            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>   
      
      
    </div>
  );
}
 

export default App;

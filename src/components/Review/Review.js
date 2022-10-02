import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart} from '../../utilities/database';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        // CART
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            
                const product = fakeData.find(pd => pd.key === key);
                    product.quantity  = savedCart[key];
                        
                    return product;
        })
                setCart(cartProducts);
                
    },[]);

    const removeProduct = (productKey) =>{

           const newCart = cart.filter(product => product.key !== productKey);
                    setCart(newCart)

                    removeFromDatabaseCart(productKey);

    }

    const [placeOrder, setPlaceOrder] = useState(false)

            let thanks;
        if(placeOrder){
            thanks = <h1 style={{color: "brown", margin: "300px 400px"}}>Thanks for Placing Order</h1>
        }

    const handleProceedOrder = () => {
        navigate("/shipment")
                // setCart([]);
                // setPlaceOrder(true);
                // processOrder();
                
    }

    
    return (
        <div className='shop-container'>
            <div className='products'>
                {
                    cart.map(pd => <ReviewItems product = {pd} removeProduct = {removeProduct} key = {pd.key} ></ReviewItems>)
                }
                {
                    thanks
                }
            </div>
            <div className='cart'>
                <Cart cart={cart}>
                    <button className='add-to-cart' onClick={handleProceedOrder}>Proceed Order</button>
                </Cart>
            </div>    
        </div>
    );
};

export default Review;
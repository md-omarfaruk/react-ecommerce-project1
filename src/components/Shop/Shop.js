import React, { useState, useEffect} from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/database';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css';
import { Link } from 'react-router-dom';


const Shop = () => {
    const sliceFakeData = fakeData.slice(0, 10);
    const [products, setProducts] = useState(sliceFakeData);

    const [cart, setCart] = useState([])

    useEffect(()=>{
                const savedKeys = getDatabaseCart();
                const productKeys = Object.keys(savedKeys);
                const previousCart = productKeys.map(productKey =>{
                    const product = fakeData.find(pd => pd.key === productKey);
                        product.quantity = savedKeys[productKey];
                        return product;
                })
                setCart(previousCart);
    },[])

            const handleAddToCart = (product) => { 
                
                const sameProduct = cart.find(pd => pd.key === product.key);
                let count = 1;
                let newCart;
                    if(sameProduct){
                            count = sameProduct.quantity + 1;
                            sameProduct.quantity = count;
                        const others = cart.filter(pd => pd.key !== product.key);
                            newCart = [...others, sameProduct];       
                    }
                    else{
                        product.quantity = 1;
                          newCart = [...cart, product];  
                    }

                // const newCart = [...cart, product];
                    setCart(newCart)

                //     const sameProduct = newCart.filter(pd => pd.key === product.key);
                //     const count = sameProduct.length;
                    addToDatabaseCart(product.key, count)
            }


    return (
        <div className='shop-container'>
            <div className='products'>
            {
                products.map(product => <Products showAddToCart={true} handleAddToCart = {handleAddToCart} products = {product} key= {product.key}></Products>)
            }
        </div>

        <div className='cart'>
            <Cart cart= {cart}>
                <Link to="/review"><button className="add-to-cart">Review Order</button></Link>
            </Cart>
        </div>
        </div>
    );
};

export default Shop;
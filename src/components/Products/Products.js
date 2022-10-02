import React from 'react';
import './products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Products = (props) => {
    const {img, name, price, stock, seller, key} = props.products;
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt="" />
            </div>

            <div className='product-details'>
                <h3 className='product-name'><Link to={"/product/"+key}>{name}</Link></h3>
                <div>
                    <p>by: {seller}</p>
                    <p className='product-price'>${price}</p>
                    <p><small>only {stock} left in stock-order soon</small></p>
                    
                    { props.showAddToCart === true &&
                        <button className='add-to-cart' onClick={()=>{props.handleAddToCart(props.products)}}><span className='cart-icon'><FontAwesomeIcon icon={faCartArrowDown} /></span>add to cart</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;
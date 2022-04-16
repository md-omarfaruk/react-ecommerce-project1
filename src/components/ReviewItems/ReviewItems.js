import React from 'react';

const ReviewItems = (props) => {
    const {img, name, price, seller, quantity, key} = props.product;
    const removeProduct = props.removeProduct;
    return (        
                <div className="product">
                    <div>
                    <img src={img} alt="" />
                    </div>
                    <div className='product-details'>
                        <h3 className='product-name'>{name}</h3>
                        <div>
                            <p>by: {seller}</p>
                            <p className='product-price'>${price}</p>
                            <p>Quantity: {quantity}</p>
                        </div>
                            <button className='add-to-cart' onClick = {() => removeProduct(key)}>Remove Item</button>
                    </div>
                </div>
    );
};

export default ReviewItems;
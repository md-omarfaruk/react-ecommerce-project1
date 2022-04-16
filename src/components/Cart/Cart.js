import React from 'react';
import "./Cart.css";

const Cart = (props) => {
    const cart = props.cart;
    //console.log(cart);
    

    // let totalPrice =  cart.reduce((total, product) => total + product.price, 0);
    //     totalPrice = Math.round(totalPrice);

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
            total = total + product.price * product.quantity;     
    }
            total = total.toFixed(2);
            total = Number(total);

    let shipping = cart.reduce((total, product) => total + product.shipping, 0);
        shipping = shipping.toFixed(2);
        shipping = Number(shipping);
    
    let tax = (total + shipping) / 10;
        tax = tax.toFixed(2);
        tax = Number(tax);

    let grandTotal = total + shipping + tax;
        grandTotal = grandTotal.toFixed(2)
        grandTotal = Number(grandTotal);

    return (
        <div>
            <h4>Items Add to Cart: {props.cart.length}</h4>
            <p>Product Price: {total}</p>
            <p>Shipping: {shipping}</p>
            <p>Tax + Vat: {tax}</p>
            <h4>Total Payable Bill: {grandTotal}</h4>
            <br></br>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;
import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Products from '../Products/Products';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h1>{productKey}product Details</h1>
            <Products showAddToCart={false} products = {product}></Products>
        </div>
    );
};

export default ProductDetail;